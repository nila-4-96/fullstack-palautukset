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

      test('blog can be removed', async ({ page }) => {
        const viewButton = page.getByRole('button', { name: 'view' })
        await viewButton.click()

        const removeButton = page.getByRole('button', { name: 'remove' })
        page.on('dialog', dialog => dialog.accept())
        await removeButton.click()
        await expect(page.getByText('blog removed')).toBeVisible()
      })

      test('only the blog creator can see the remove button', async ({ page }) => {
        const logoutButton = page.getByRole('button', { name: 'logout' })
        await logoutButton.click()

        await loginWith(page, 'bung', 'thebung')

        const viewButton = page.getByRole('button', { name: 'view' })
        await viewButton.click()

        const removeButton = page.getByRole('button', { name: 'remove' })
        await expect(removeButton).not.toBeVisible()
      })
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

      test('blogs are ordered by amount of likes', async ({ page }) => {
        const fst = await page
          .locator('div')
          .filter({ hasText: 'E2E zip bomb downloader 1 -' }).nth(3)
        const snd = await page
          .locator('div')
          .filter({ hasText: 'E2E zip bomb downloader 2 -' }).nth(3)
        const trd = await page
          .locator('div')
          .filter({ hasText: 'E2E zip bomb downloader 3 -' }).nth(3)
        
        await fst.getByRole('button', { name: 'view' }).click()
        await snd.getByRole('button', { name: 'view' }).click()
        await trd.getByRole('button', { name: 'view' }).click()

        await snd.getByRole('button', { name: 'like' }).click()
        await snd.getByText('likes 1').waitFor()
        await snd.getByRole('button', { name: 'like' }).click()
        await snd.getByText('likes 2').waitFor()
        await trd.getByRole('button', { name: 'like' }).click()

        const seenBlogs = page.locator('.blog')

        await expect(seenBlogs.nth(0)).toContainText('E2E zip bomb downloader 2')
        await expect(seenBlogs.nth(1)).toContainText('E2E zip bomb downloader 3')
        await expect(seenBlogs.nth(2)).toContainText('E2E zip bomb downloader 1')
      })
    })
  })
})
