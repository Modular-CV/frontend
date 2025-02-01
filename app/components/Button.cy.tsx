import React from 'react'
import Button from './Button'

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button buttonStyle="primary">Button</Button>)
  })

  it('calls handleClick on click', () => {
    const handleClick = cy.spy().as('spy')
    cy.mount(
      <Button buttonStyle="primary" onClick={handleClick}>
        Button
      </Button>,
    )
    cy.get('button').click()
    cy.get('@spy').should('be.calledOnce')
  })
})
