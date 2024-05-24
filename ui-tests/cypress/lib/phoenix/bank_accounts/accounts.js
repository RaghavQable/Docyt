const time_helper = require("../../../utils/time_helper");

function verify_blank_accounts_page_displayed() {
	cy.span_by_containing_class('blank-account-header').should('be.visible');
	cy.button_by_containing_text('Add Account').should('exist');
}

function verify_accounts_page_displayed() {
	cy.span_by_text('Accounts').should('be.visible');
	cy.wait(2000);
	cy.wait_until_disappear_div_loading_spinner();
}

function manual_account_data(account_name) {
	const data = {
		account_name: account_name + time_helper.get_epoch_time(),
		last4: '0000',
		routing_number: '021000021',
	}

	return data
}

function add_bank_account_manually(data) {
	cy.button_by_containing_text('Add Account').click();
	cy.wait_until_visible_h2_by_text("Add New Account");
	cy.button_by_containing_text("Add Bank Account Manually").click();
	cy.h3_by_text('Bank Account', { timeout: 30000 }).scrollIntoView().should('be.visible');
	fill_account_data(data);
	cy.button_by_type('submit').click({force: true});
	cy.wait_until_disappear_div_loading_spinner();
}

function add_auto_account_with_financial_institution (data, type) {
	cy.button_by_containing_text('Add Account').click();
	cy.wait_until_visible_h2_by_text("Add New Account");
	cy.wait_until_visible_button_by_containing_class("add-secure-bank-account-btn");
	if (type == 'Bank Account') {
		cy.button_by_containing_class("add-secure-bank-account-btn").click();
	} else if (type == 'Credit Card') {
		cy.button_by_containing_class("add-secure-credit-card-account-btn").click();
	}
	cy.span_by_text('Add a new banking account and map it to a financial institution account.', { timeout: 30000 }).scrollIntoView().should('be.visible');
	fill_account_data(data, false);
	select_financial_institution_account(data);
	cy.button_by_type('submit').click({force: true});
	cy.wait_until_disappear_div_loading_spinner();
}

function fill_account_data(data, need_routing_number = true) {
	cy.input_by_placeholder('Account Name - XXXX').clear().type(data['account_name']);
	cy.input_by_placeholder('XXXX').clear().type(data['last4']);
	if (need_routing_number) {
		cy.input_by_placeholder('Routing Number').clear().type(data['routing_number']); 
	}
}

function select_financial_institution_account(data) {
	cy.button_by_containing_text("Select an account").click();
	cy.h2_by_text('Select Account', { timeout: 30000 }).scrollIntoView().should('be.visible');
	cy.contains('td', data['last4']).click();
}

function verify_created_new_account(data, type = "Manual") {
	verify_accounts_page_displayed();
	cy.td_by_text(data['account_name']).should('exist');
	cy.contains('.transaction-import-type-flag', type).should('exist');
}

function disconnect_account() {
	cy.a_by_containing_class('btn-payment-account-dropdown');
	cy.wait(2000);
	cy.a_by_containing_class('disconnect-account-btn').click({force: true});
	cy.h4_by_text("Disconnect Account", { timeout: 30000 }).should('be.visible');
	cy.button_by_containing_text('Proceed').click();
}

function archive_account(data) {
	cy.a_by_containing_class('btn-payment-account-dropdown');
	cy.wait(2000);
	cy.a_by_containing_class('archive-account-btn').click({force: true});
	cy.h4_by_text("Archive Account", { timeout: 30000 }).should('be.visible');
	cy.span_by_text('Proceed').click();
	cy.wait_until_disappear_div_loading_spinner();
	cy.td_by_text(data['account_name'], { timeout: 30000 }).should('not.exist');
}

function go_to_archived_account_page() {
	cy.a_by_containing_text('ARCHIVED').click();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_blank_accounts_page_displayed,
	verify_accounts_page_displayed,
	add_bank_account_manually,
	add_auto_account_with_financial_institution,
	manual_account_data,
	verify_created_new_account,
	disconnect_account,
	archive_account,
	go_to_archived_account_page
}