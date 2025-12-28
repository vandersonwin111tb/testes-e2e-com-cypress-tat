// / <reference path="../support/commands.d.ts" />

import { faker } from '@faker-js/faker/locale/en'

describe('Scenarios where authentication is a pre-condition', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()
    // ensure we visit home after session is restored so the GET /notes request occurs
    cy.visit('/')
    cy.wait('@getNotes', { timeout: 10000 })
  })

  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes')
  })

  it('successfully submits the settings form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    // Wait for payment request; do not rely on an additional `getNotes` request which may be absent
    cy.wait('@paymentRequest', { timeout: 20000 })
      .its('state')
      .should('be.equal', 'Complete')
  })

  it('logs out', { tags: '@desktop-and-tablet' }, () => {
    // ensure tablet viewport for this tagged test
    // use width smaller than the breakpoint (768) so the mobile menu is shown
    cy.viewport(767, 1024)

    // ensure logout is actionable: if not visible, open the collapsed menu first
    cy.contains('.nav a', 'Logout').then($el => {
      if ($el.is(':visible')) {
        cy.wrap($el).click()
      } else {
        cy.get('.navbar-toggle.collapsed').then($toggle => {
          if ($toggle.is(':visible')) {
            cy.wrap($toggle).click()
          }
        })
        cy.wrap($el).click()
      }
    })

    cy.get('#email').should('be.visible')
  })
})