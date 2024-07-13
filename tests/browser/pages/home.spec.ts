import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Home test', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Test manual login/logout', async ({ visit, route }) => {
    const page = await visit(route('home'))

    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForNavigation()

    await page.assertVisible(page.getByText("You're connected"))
    await page.assertNotExists(page.getByRole('button', { name: 'Login' }))
    await page.assertNotVisible(page.getByText("You're not connected"))
    await page.assertExists(page.getByRole('button', { name: 'Logout' }))

    await page.getByRole('button', { name: 'Logout' }).click()
    await page.waitForNavigation()

    await page.assertVisible(page.getByText("You're not connected"))
    await page.assertExists(page.getByRole('button', { name: 'Login' }))
    await page.assertNotVisible(page.getByText("You're connected"))
    await page.assertNotExists(page.getByRole('button', { name: 'Logout' }))
  })

  test('Test login with browserContext.loginAs', async ({ browserContext, visit, route }) => {
    const user = await UserFactory.create()

    await browserContext.loginAs(user)

    const page = await visit(route('home'))

    await page.assertVisible(page.getByText("You're connected"))
  })

  test('Test logout with browserContext.setCookie', async ({ browserContext, visit, route }) => {
    const page = await visit(route('home'))

    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForNavigation()

    await page.assertVisible(page.getByText("You're connected"))

    await browserContext.setCookie('adonis-session', '')
    await page.reload()

    await page.assertVisible(page.getByText("You're not connected"))
  })
})
