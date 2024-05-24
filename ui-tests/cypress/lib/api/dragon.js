
const path = require("./path");
const common_api = require("./common");
const data = Cypress.env('dragon');

function get_first_email_verification_code() {

    return common_api.get_auth_token().then((token) => {
        let jsonForm = '{"email": "' + data["email"] + '"}';
        cy.log(jsonForm);
        return cy.request({
            method: 'GET',
            url: Cypress.env("apiBaseUrl") + path["email_verifications"],
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'AuthService ' + token
            },
            body: jsonForm
        }).its('body').then(
            (body) => {
                return body.email_verifications[0].email_confirmation_token.toString();
            })
      })

}


module.exports = {
    get_first_email_verification_code
}