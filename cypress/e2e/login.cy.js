// cypress/e2e/login.cy.js

describe('Login', () => {
  it('successfully logs in', () => {
    cy.intercept('GET', '**notes').as('getNotes')

    cy.guiLogin()
    cy.wait('@getNotes')

    cy.contains('Create a new note', { timeout: 14000 }).should('be.visible')
  })
})
