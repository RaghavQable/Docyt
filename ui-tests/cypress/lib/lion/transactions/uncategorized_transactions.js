const tables = require("../../common/webtables/tables")

function verify_uncategorized_transactions_page_displayed() {
	cy.wait_until_visible_span_by_text('Reconciliation Center');
	cy.wait_until_visible_h2_by_text('Uncategorized Transactions');
	cy.wait_until_disappear_div_loading_spinner();
}

function createTableAlias() {
	cy.xpath('//table[@class="table bg-white"]').as('uncategorized_transactions_table');
}

function click_first_transaction_item() {
	createTableAlias();
	tables.verifyTotalRows('@uncategorized_transactions_table', 1);
	tables.clickFirstCellFromFirstRow('@uncategorized_transactions_table');
	cy.wait_until_disappear_div_loading_spinner();
}

function categorize_transaction() {
	cy.button_by_text('Categorize Transaction').click({ force: true });
	cy.wait_until_visible_h4_by_text('Update in Progress');
	cy.button_by_text('Close').click();
}

function bulk_expense_categorize_transactions() {
	cy.div_by_containing_class('check-all-transaction-group').click();
	cy.p_by_text('Select All Expense Transactions').click();
	cy.wait(2000);
	categorize_transaction();
}

function filter_by_amount(amount) {
	cy.input_by_placeholder('$ Amount').clear().type(amount);
	cy.wait_until_disappear_div_loading_spinner();
}

function select_vendor(vendor_name) {
	cy.input_by_placeholder('Enter Vendor Name').invoke('attr', 'value', vendor_name);
	cy.input_by_placeholder('Enter Vendor Name').click({ force: true });
	cy.contains('span[class="m-t-2 m-l-10 vendor-item"]', vendor_name).click();
	cy.wait_until_disappear_div_loading_spinner();
}

function select_expense_option() {
	cy.get('label[for="radioExpense"] span').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function expense_categorize_transaction(amount, vendor_name = null, needs_categorize = true) {
	filter_by_amount(amount);
	click_first_transaction_item();
	cy.wait(2000);
	select_expense_option();
	if (vendor_name) {
		select_vendor(vendor_name);
	}
	if (needs_categorize) {
		categorize_transaction();
	}
}

function expense_categorize_transactions(amounts, vendor_names) {
	amounts.forEach((amount, index) => {
		expense_categorize_transaction(amount, vendor_names[index]);
	})
}

function income_categorize_transactions(amount) {
	filter_by_amount(amount);
	click_first_transaction_item();
	cy.wait(2000);
	categorize_transaction();
}

module.exports = {
	verify_uncategorized_transactions_page_displayed,
	click_first_transaction_item,
	bulk_expense_categorize_transactions,
	categorize_transaction,
	expense_categorize_transaction,
	expense_categorize_transactions,
	income_categorize_transactions,
}
