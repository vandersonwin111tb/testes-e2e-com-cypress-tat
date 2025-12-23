// cypress/e2e/login.cy.js

describe('Login', () => {
  it('successfully logs in', () => {
    // cy.intercept('GET', '**/api/notes').as('getNotes')

    cy.guiLogin()
    // cy.wait('@getNotes')

    cy.contains('Create a new note', { timeout: 10000 }).should('be.visible')
  })
})
