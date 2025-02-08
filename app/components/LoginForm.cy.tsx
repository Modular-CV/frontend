import React from 'react'
import LoginForm from './LoginForm'
import { faker } from '@faker-js/faker'
import type { SubmitHandler } from 'react-hook-form'

describe('<LoginForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginForm onValid={() => {}} />)
  })

  it('calls handleOnValid on form submission', () => {
    const loginForm: LoginForm = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    const handleOnValid: SubmitHandler<LoginForm> = cy.spy().as('spy')
    cy.mount(<LoginForm onValid={handleOnValid} />)
    cy.getBySel('email').type(loginForm.email)
    cy.getBySel('password').type(loginForm.password)
    cy.getBySel('submit').click()
    cy.get('@spy').should('be.calledOnceWith', loginForm)
  })
})
