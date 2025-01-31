import { faker } from '@faker-js/faker'

export const generateCreateAccountInput = () => {
  const accountInput: CreateAccountForm = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  return accountInput
}
