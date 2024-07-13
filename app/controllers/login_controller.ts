import type { HttpContext } from '@adonisjs/core/http'

import { UserFactory } from '#database/factories/user_factory'

export default class LoginController {
  async handle({ auth, response }: HttpContext) {
    const user = await UserFactory.create()

    await auth.use('web').login(user)

    response.redirect().back()
  }
}
