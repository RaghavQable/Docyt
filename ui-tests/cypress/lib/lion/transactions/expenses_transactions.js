const tables = require("../../common/webtables/tables");

function verify_expenses_transactions_page_displayed() {
	cy.wait_until_visible_span_by_text('Reconciliation Center');
	cy.wait_until_visible_h2_by_text('Expenses');
	cy.wait_until_disappear_div_loading_spinner();
}

function createTableAlias() {
	cy.xpath('//table[@class="table expense-table-view bg-white"]').as('expenses_transactions_table')
}

function click_first_transaction_item() {
	createTableAlias();
	tables.verifyTotalRows('@expenses_transactions_table', 1);
	tables.clickFirstCellFromFirstRow('@expenses_transactions_table')
}

function verify_expense_transaction_details(amount) {
	filter_by_amount(amount);
	click_first_transaction_item()
	cy.get('.document-field-value').each(($el) => {
		expect($el.text()).not.to.be.empty;
	});
	close_transaction_details_modal();
}

function verify_expense_transactions_details(amounts) {
	amounts.forEach((amount) => {
		verify_expense_transaction_details(amount)
	})
}

function close_transaction_details_modal() {
	cy.span_by_containing_class('icon-not-a-chargeback-icon').click({force: true});
}

function filter_by_amount(amount) {
	cy.input_by_placeholder('$ Amount').clear().type(amount);
	cy.wait_until_disappear_div_loading_spinner();
}

function uncategorize_transaction(amount) {
	filter_by_amount(amount);
	createTableAlias();
	tables.verifyTotalRows('@expenses_transactions_table', 1);
	tables.clickLastCellFromFirstRow('@expenses_transactions_table');
	cy.a_by_containing_class('not-expense').click();
	cy.wait_until_visible_h4_by_text('Modify transaction');
	cy.button_by_text('Confirm').click();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_expenses_transactions_page_displayed,
	click_first_transaction_item,
	filter_by_amount,
	verify_expense_transaction_details,
	verify_expense_transactions_details,
	uncategorize_transaction,
	close_transaction_details_modal,
}
