const tables = require("../../common/webtables/tables")

function verify_income_transactions_page_displayed() {
	cy.wait_until_visible_span_by_text('Reconciliation Center');
	cy.wait_until_visible_h2_by_text('Income');
	cy.wait_until_disappear_div_loading_spinner();
}

function createTableAlias() {
	cy.xpath('//table[@class="table expense-table-view bg-white"]').as('income_transactions_table');
}

function click_first_transaction_item() {
	createTableAlias();
	tables.verifyTotalRows('@income_transactions_table', 1);
	tables.clickFirstCellFromFirstRow('@income_transactions_table');
}

function verify_income_transaction_details() {
	cy.get('.document-field-value').each(($el) => {
		expect($el.text()).not.to.be.empty;
	});
}

function uncategorize_transaction() {
	cy.reload();
	createTableAlias();
	tables.verifyTotalRows('@income_transactions_table', 1);
	tables.clickLastCellFromFirstRow('@income_transactions_table');
	cy.a_by_containing_class('not-revenue-btn').click();
	cy.wait_until_visible_h4_by_text('Modify transaction');
	cy.button_by_text('Confirm').click();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_income_transactions_page_displayed,
	click_first_transaction_item,
	verify_income_transaction_details,
	uncategorize_transaction
}
