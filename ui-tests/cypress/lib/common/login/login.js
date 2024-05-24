const {navigate_to, navigate_to_business_path, navigate_settings_page, navigate_client_business_settings_page} = require("../navigation/navigation")
const {verify_client_dashboard_page_displayed} = require("../../phoenix/dashboard/dashboard")

function verify_login_page_displayed() {
    cy.h1_by_text("Sign in").should('be.visible');
    cy.input_by_placeholder("Enter Email").should('be.visible');
    cy.input_by_placeholder("Enter Password").should('be.visible');
    cy.a_by_text("Sign-In with phone number").should('be.visible');
    cy.a_by_text("Forgot Password?").should('be.visible');
    cy.span_by_text("Next").should('be.visible');
}

function login(email, password) {
    cy.input_by_placeholder("Enter Email").type(email);
    cy.input_by_placeholder("Enter Password").type(password);
    cy.span_by_text("Next").click();
}

function verify_error_message_displayed(message) {
    cy.p_by_text(message).should('be.visible');
}

function login_and_navigate_to(email, password, path, custom_path=null) {
    login(email, password)
    verify_client_dashboard_page_displayed()
    navigate_to(path, custom_path)
}

function login_and_navigate_to_business_path(email, password, path, business_id) {
    login(email, password)
    verify_client_dashboard_page_displayed()
    navigate_to_business_path(path, business_id)
}

function login_and_navigate_to_settings_page(email, password, business_id, step=null) {
    login(email, password)
    verify_client_dashboard_page_displayed()
    navigate_settings_page(business_id, step)
}

function login_and_navigate_to_client_business_settings_page(email, password, client_business_id, accounting_firm_business_id, step=null) {
    login(email, password)
    verify_client_dashboard_page_displayed()
    navigate_client_business_settings_page(client_business_id, accounting_firm_business_id, step)
}

module.exports = {
    verify_login_page_displayed,
    login,
    verify_error_message_displayed,
    login_and_navigate_to,
    login_and_navigate_to_business_path,
    login_and_navigate_to_settings_page,
    login_and_navigate_to_client_business_settings_page,
};
  