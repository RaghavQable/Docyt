
const path = require("./path");
const common_api = require("./common");
const data = Cypress.env('phoenix');

function get_secret_code_change_email_phone() {
  return common_api.get_auth_token().then((token) => {
    let jsonForm = '{"phone": "' + data["tester4_phone"] + '"}';
    return cy.request({
        method: 'GET',
        url: Cypress.env("apiBaseUrl") + path["security_token"],
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'AuthService ' + token
        },
        body: jsonForm
    }).its('body').then(
        (body) => {
            return body['secret_code_change_email_phone'];
        })
    })
}

function get_transaction_service_documents(token, business_id, amount, is_trash) {
    let jsonForm = `{"business_id": "${business_id}", "without_scope": "true", "with_duplicate_origin_transaction": "true", "is_trash": "${is_trash}", "filter": {"amount": {"val": "${amount}"}}}`;
    return cy.request({
        method: 'GET',
        url: Cypress.env("apiBaseUrl") + path["transaction_service_documents"],
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'AuthService ' + token
        },
        body: jsonForm
    }).its('body').then(
        (body) => {
            return body['transaction_service_documents'];
        })
}

function delete_transaction_permanently(token, transaction_service_document_id) {
    cy.request({
        method: 'DELETE',
        url: Cypress.env("apiBaseUrl") + path["transaction_service_documents"] + '/' + transaction_service_document_id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'AuthService ' + token
        },
      })
}

module.exports = {
    get_secret_code_change_email_phone,
    get_transaction_service_documents,
    delete_transaction_permanently
}