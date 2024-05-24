const tables = require("../../common/webtables/tables")

function verify_uncleared_documents_page_displayed() {
	cy.wait_until_visible_span_by_text('Reconciliation Center');
	cy.wait_until_visible_h2_by_text('Uncleared Documents');
	cy.wait_until_disappear_div_loading_spinner();
}

function filter_by_transaction_description() {
	cy.input_by_placeholder('Transaction Description').clear().type('test');
	cy.wait_until_disappear_div_loading_spinner();
}

function click_match_button() {
	cy.button_by_text('Match').click({ force: true });
}

function match_transactions() {
	filter_by_transaction_description();
	cy.div_by_text("Bank Account(manual)").first().click();
	cy.div_by_text("Bank Account(manual)").last().click();
	click_match_button();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_uncleared_documents_page_displayed,
	match_transactions
}
