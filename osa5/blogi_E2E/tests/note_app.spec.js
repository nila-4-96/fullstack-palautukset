const { test, describe, expect, beforeEach } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    // console.log('reset done')
    await request.post('/api/users', {
      data: {
        name: 'Bungley',
        username: 'spungley',
        password: 'wrong'
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

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole('button', { name: 'login' })
    await expect(locator).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'spungley', 'wrong')
      await expect(page.getByText('successfully logged in, Bungley')).toBeVisible()
    })


    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'spungley', 'correct')

      // await expect(page.getByText('wrong username or password')).toBeVisible()
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(page.getByText('successfully logged in, Bungley')).not.toBeVisible()
    })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'spungley', 'wrong')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'E2E zip bomb downloader',
        author: 'Doctor Pim',
        url: 'zip.com'
      })

      await expect(page.getByText('added blog E2E zip bomb downloader by Doctor Pim')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'E2E zip bomb downloader',
          author: 'Doctor Pim',
          url: 'zip.com'
        })
      })

      test('blog can be liked', async ({ page }) => {
        const viewButton = page.getByRole('button', { name: 'view' })
        await viewButton.click()

        const likeButton = page.getByRole('button', { name: 'like' })
        await likeButton.click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

/*
      test('can show more info', async ({ page }) => {
        const viewBoxes = await page.getByRole('button', { name: 'view' }).all()
        await viewBoxes[0].click()
        await expect(page.getByText('likes')).toBeVisible()
      })
*/
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'E2E zip bomb downloader 1',
          author: 'Doctor Pim',
          url: 'zip.com'
        })
        await createBlog(page, {
          title: 'E2E zip bomb downloader 2',
          author: 'Doctor Pim',
          url: 'zip2.com'
        })
        await createBlog(page, {
          title: 'E2E zip bomb downloader 3',
          author: 'Doctor Pim',
          url: 'zip3.com'
        })
      })

/*
      test('one can be shown', async ({ page }) => {
        const otherBlogText = page.getByText('E2E zip bomb downloader 2')
        const otherBlogElement = otherBlogText.locator('..')

        await otherBlogElement
          .getByRole('button', { name: 'view' })
          .click()

        await expect(page.getByText('likes')).toBeVisible()
      })
*/
      
    })
  })
})
