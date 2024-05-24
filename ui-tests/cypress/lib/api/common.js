
const path = require("./path");

function get_auth_token(email = Cypress.env("email"), password = Cypress.env("password")){
    var formdata = new FormData();
    formdata.append("client_id", Cypress.env("client_id"));
    formdata.append("client_secret", Cypress.env("client_secret"));
    formdata.append("grant_type", "password");
    formdata.append("password", password);
    formdata.append("email", email);
    
    return cy.request({
        method: 'POST',
        url: Cypress.env("apiBaseUrl") + path["auth_token"],
        headers: {
            'content-type': 'multipart/form-data'
            },
        body: formdata
    }).then
        ((response) => {
            const bufferAsString = String.fromCharCode.apply(null, new Uint8Array(response.body));
            const jsonObject = JSON.parse(bufferAsString);
            return jsonObject.access_token.toString();
        })
}

module.exports = {
    get_auth_token
}