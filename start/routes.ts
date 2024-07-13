/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const LoginController = () => import('#controllers/login_controller')
const LogoutController = () => import('#controllers/logout_controller')

router.on('/').renderInertia('home').as('home')

router.post('login', [LoginController]).as('login')
router.post('logout', [LogoutController]).as('logout')
