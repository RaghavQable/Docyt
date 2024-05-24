const time_helper = require("../../../utils/time_helper");
const tables = require("../../common/webtables/tables")

function verify_transactions_page_displayed() {
	cy.h2_by_text('Transactions').should('be.visible');
	cy.button_by_containing_text('Add Transaction').should('exist');
}

function transaction_data(amount, account_name, memo_prefix="Memo") {
	const data = {
		amount: amount || time_helper.get_epoch_time(),
		description: "Description " + time_helper.get_epoch_time(),
		transaction_date: time_helper.get_formatted_date('MM/DD/YYYY'),
		account: account_name || "Bank Account(manual)",
		memo:  memo_prefix + ' ' + time_helper.get_epoch_time(),
	}

	return data
}

function add_transaction(data, type=null) {
	cy.button_by_containing_text('Add Transaction').click();
	cy.h1_by_text("Add Transaction", { timeout: 30000 }).should('be.visible');
	input_transactions_data(data, type);
	cy.button_by_text('Add').click();
	close_in_progress_modal();
	wait_for_add_transaction_modal_to_disappear();
}

function add_transactions(amounts, account_name, memo_prefix="Memo") {
	amounts.forEach((amount) => {
		add_transaction(transaction_data(amount, account_name, memo_prefix));
	})
}

function input_transactions_data(data) {
	cy.input_by_containing_class('add-transaction-date').clear().type(data['transaction_date']);
	select_banking_account(data)
	cy.input_by_containing_class('add-transaction-memo').clear().type(data['memo']);
	cy.input_by_containing_class('add-transaction-amount').clear().type(data['amount']);
}

function select_banking_account(data) {
	cy.a_by_containing_class('m-b-6 pointer date-select-toggle').first().click();
	cy.div_by_containing_class_and_text('display-flex align-items-center', data['account']).first().click();
}

function close_in_progress_modal() {
	cy.wait_until_disappear_div_loading_spinner();
	cy.button_by_containing_text("Close").click();
}

function wait_for_add_transaction_modal_to_disappear() {
	cy.h1_by_text('Add Transaction', { timeout: 30000 }).should('not.exist');
	cy.h1_by_text('Add Transactions in Progress', { timeout: 30000 }).should('not.exist');
	cy.wait_until_disappear_div_loading_spinner();
}

function filter_by_amount(amount) {
	cy.input_by_placeholder('$ Amount').clear().type(amount);
	cy.wait(2000);
	cy.wait_until_disappear_div_loading_spinner();
}

function verify_filtered_by_amount(amount_1, amount_2){
	filter_by_amount(amount_2);
	cy.td_by_text(`+$${amount_2}`).should('exist');
	cy.td_by_text(`+$${amount_1}`).should('not.exist');
}

function move_to_trash(amount) {
	filter_by_amount(amount);
	cy.get('td.transaction-actions-column .icon-3-dots').click();
	cy.a_by_containing_class('destroy-perma-btn').should('be.visible').click();
	cy.h1_by_text("Delete Transaction").should('be.visible');
	cy.button_by_text('Delete').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function move_to_trash_transactions(amounts) {
	amounts.forEach((amount) => {
		move_to_trash(amount);
	});
}

function verify_transaction_type(amount, type) {
	filter_by_amount(amount)
	cy.span_by_containing_class('transaction-type-badge').invoke('text').should('eq', type);
}

module.exports = {
	verify_transactions_page_displayed,
	transaction_data,
	add_transaction,
	add_transactions,
	filter_by_amount,
	verify_filtered_by_amount,
	move_to_trash,
	move_to_trash_transactions,
	verify_transaction_type,
}