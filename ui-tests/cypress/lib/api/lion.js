const path = require("./path");
const data = Cypress.env('lion');

function update_index(business_id) {
  cy.request({
    method: 'POST',
    url: Cypress.env("apiBaseUrl") + path["update_index"] + business_id,
    auth: {
      username: data['docyt_bot_api']['username'],
      password: data['docyt_bot_api']['password'],
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

module.exports = {
  update_index
}