const phoenix_api = require("../../api/phoenix");

function click_update_password() {
  cy.a_by_text('Update Password').click();
}

function click_continue_button() {
	cy.span_by_text('Continue').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function set_current_password(password) {
	cy.input_by_containing_class('current-password-js').clear().type(password);
	click_continue_button();
}

function verify_invalid_password() {
	cy.any_by_containing_class('invalid-current-password-js').should('be.visible');
}

function set_security_code() {
	phoenix_api.get_secret_code_change_email_phone().then(code => {
		cy.input_by_containing_class("secret-code-input").clear().type(code);
		click_continue_button();
	})
}

function set_new_password(password) {
  cy.input_by_containing_class("new-password-input").clear().type(password);
	cy.input_by_containing_class("confirm-password-input").clear().type(password);
	cy.button_by_text('Submit').click();
	cy.wait(3000);
}

module.exports = {
  click_update_password,
  set_current_password,
	verify_invalid_password,
	set_security_code,
	set_new_password,
};
  