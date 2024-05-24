// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const login_page = require("../lib/common/login/login");

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  before(() => {
    cy.register_commands();
  })

  beforeEach(() => {
      cy.visit(Cypress.env("baseUrl"))
      cy.title().should("eq", "Docyt")
      login_page.verify_login_page_displayed();
  })
  

// Alternatively you can use CommonJS syntax:
// require('./commands')