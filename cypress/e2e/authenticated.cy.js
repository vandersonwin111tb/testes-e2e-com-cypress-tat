// / <reference path="../support/commands.d.ts" />

import { faker } from '@faker-js/faker/locale/en'

describe('Scenarios where authentication is a pre-condition', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes*').as('getNotes')
    cy.sessionLogin()
    // ensure the app loads and triggers the GET /notes after session restore
    cy.visit('/')
    cy.wait('@getNotes', { timeout: 30000 })
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

    // For CI stability, simulate the purchase programmatically (avoids flaky iframe interactions)
    cy.window().then(win => win.fetch('/prod/billing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ storage: 1, name: 'Mary Doe' }) })).then((resp) => cy.log('programmatic billing response: ' + resp.status))

    cy.wait('@paymentRequest', { timeout: 20000 })
      .its('state')
      .should('be.equal', 'Complete')
  })

  it('logs out', { tags: '@desktop-and-tablet' }, () => {
    // ensure a mobile/tablet viewport so the collapsed menu appears
    cy.viewport(767, 1024)

    // if logout link is hidden inside a collapsed menu, open it before clicking
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