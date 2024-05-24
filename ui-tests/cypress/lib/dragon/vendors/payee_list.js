
const tables = require("../../common/webtables/tables")

function verify_payee_list_page_displayed() {
    cy.wait_until_disappear_div_loading_spinner();
    cy.input_by_placeholder('Filter by Payee Name').should('exist');
    cy.button_by_containing_class('add-payee-btn').should('exist');
}

function verify_payee_displayed_in_list(payee) {
    cy.p_by_text(payee).should('exist');
}

function verify_payee_not_displayed_in_list(payee) {
    cy.p_by_text(payee).should('not.exist');
}

function click_payee_from_list(payee) {
    cy.p_by_text(payee).click();
}

function click_add_payee_button(payee_name) {
    cy.button_by_containing_class('add-payee-btn').click();
}


module.exports = {
    verify_payee_list_page_displayed,
    verify_payee_displayed_in_list,
    verify_payee_not_displayed_in_list,
    click_payee_from_list,
    click_add_payee_button
};
  