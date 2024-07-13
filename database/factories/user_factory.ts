import factory from '@adonisjs/lucid/factories'
import validator from 'validator'

import User from '#models/user'

export const UserFactory = factory
  .define(User, ({ faker }) => ({
    email:
      validator.normalizeEmail(faker.internet.email().toLowerCase()) ||
      faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }))
  .build()
