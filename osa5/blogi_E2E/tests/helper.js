const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('Blog title').fill(content.title)
  await page.getByPlaceholder('Blog author').fill(content.author)
  await page.getByPlaceholder('Blog url').fill(content.url)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText('successfully added blog ' + content.title + ' by ' + content.author).waitFor()
}

export { loginWith, createBlog }