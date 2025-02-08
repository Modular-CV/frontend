import React from 'react'
import LanguagePicker from './LanguagePicker'

describe('<LanguagePicker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LanguagePicker />)
  })
})
