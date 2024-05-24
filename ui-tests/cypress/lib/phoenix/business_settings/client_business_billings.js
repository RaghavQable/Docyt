function verify_business_billing_page_displayed(business_name) {
	cy.wait(2000);
	cy.wait_until_visible_h1_by_text(`Setup ${business_name}`);
	cy.wait_until_visible_h2_by_text('Billing Information');
}

function add_new_credit_card(credit_card_info) {
	cy.a_by_text('Add New Payment Method').click();
	cy.wait_until_visible_div_by_containing_class('stripe-credit-card-region');
	cy.wait(5000);
	set_credit_card_number(credit_card_info['card_number']);
	set_credit_card_expiration_date(credit_card_info['expiration_date']);
	set_credit_card_cvc(credit_card_info['cvc']);
	set_zip_code(credit_card_info['zip_code']);
	cy.span_by_text('Save').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function set_credit_card_number(card_number) {
	cy.getIframeBody('iframe[title="Secure card number input frame"]').find('[placeholder="1234 1234 1234 1234"]').clear().type(card_number);
}

function set_credit_card_expiration_date(expiration_date) {
	cy.getIframeBody('iframe[title="Secure expiration date input frame"]').find('[placeholder="MM / YY"]').clear().type(expiration_date);
}

function set_credit_card_cvc(cvc) {
	cy.getIframeBody('iframe[title="Secure CVC input frame"]').find('[placeholder="CVC"]').clear().type(cvc);
}

function set_zip_code(zip_code) {
	cy.input_by_placeholder('Enter ZIP Code').clear().type(zip_code);
}

module.exports = {
	verify_business_billing_page_displayed,
	add_new_credit_card,
}
