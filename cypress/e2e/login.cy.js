// cypress/e2e/login.cy.js

describe('Login', () => {
  it('successfully logs in', () => {
    cy.intercept('GET', '**/api/notes').as('getNotes')

    cy.guiLogin()
    // cy.wait('@getNotes')

    cy.contains('a', 'Create a new note').should('be.visible')
  })
})
