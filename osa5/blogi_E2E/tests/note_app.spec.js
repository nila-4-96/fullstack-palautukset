const { test, describe, expect, beforeEach } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Bungley',
        username: 'spungley',
        password: 'wrong'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Bungus',
        username: 'bung',
        password: 'thebung'
      }
    })

    await request.post('/api/blogs', {
      data: {
        title: 'E2E zip bomb downloader',
        author: 'Doctor Pim',
        url: 'zip.com',
        user: {
          username: 'spungley',
          id: 123
        }
      }
    })

    await page.goto('/')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByText('login').click()
      await page.getByLabel('username').fill('spungley')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('successfully logged in, Bungley')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByText('login').click()
      await page.getByLabel('username').fill('spungley')
      await page.getByLabel('password').fill('correct')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByText('login').click()
      await page.getByLabel('username').fill('spungley')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByText('new blog').click()
      await page.getByPlaceholder('Blog title').fill('E2E zip bomb downloader')
      await page.getByPlaceholder('Blog author').fill('Doctor Pim')
      await page.getByPlaceholder('Blog url').fill('zip.com')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('added blog E2E zip bomb downloader by Doctor Pim')).toBeVisible()

    })

    test('blog can be liked', async ({ page }) => {
      await page.getByText('new blog').click()
      await page.getByPlaceholder('Blog title').fill('E2E zip bomb downloader')
      await page.getByPlaceholder('Blog author').fill('Doctor Pim')
      await page.getByPlaceholder('Blog url').fill('zip.com')
      await page.getByRole('button', { name: 'save' }).click()

      await page.getByText('E2E zip bomb downloader - Doctor Pim').click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('blog can be removed', async ({ page }) => {
      await page.getByText('new blog').click()
      await page.getByPlaceholder('Blog title').fill('E2E zip bomb downloader')
      await page.getByPlaceholder('Blog author').fill('Doctor Pim')
      await page.getByPlaceholder('Blog url').fill('zip.com')
      await page.getByRole('button', { name: 'save' }).click()

      await page.getByText('E2E zip bomb downloader - Doctor Pim').click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('blog removed')).toBeVisible()
    })
  })
})