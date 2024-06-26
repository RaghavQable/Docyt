const tables = require("../../common/webtables/tables");
const time_helper = require("../../../utils/time_helper")

const current_date_with_format = time_helper.get_formatted_date('MM/DD/YYYY')

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

function filter_incomes_by_payment_mode(text)
{
     cy.input_by_placeholder('Search Vendors').type(text,{force:true})
	 cy.wait_until_disappear_div_loading_spinner();
	 cy.wait(1000)
	 cy.strong_by_text(text).should('be.visible').click()
     cy.wait(1000)
	 createTableAlias();
	 tables.verifyTotalRows('@income_transactions_table', 1);
	 tables.first_row_table_td_text_present('@income_transactions_table',text)
	 
}


function filter_incomes_by_account_type()
    {
       cy.div_by_text('Account').click();
	   cy.span_by_text_with_ancestor_a('Bank Account').trigger('mouseover').click();
	   cy.wait_until_disappear_div_loading_spinner();
	   cy.wait(1000);
	   createTableAlias();


	   tables.verifyTotalRows('@income_transactions_table', 1);
	   tables.first_row_table_td_text_present('@income_transactions_table','Bank Account');
	}

function filter_incomes_by_from_date()
     {
        cy.input_by_placeholder('From').type(current_date_with_format,{force:true}).click();
		cy.wait_until_disappear_div_loading_spinner();
		createTableAlias();
	    tables.verifyTotalRows('@income_transactions_table', 1);
	    tables.first_row_table_td_text_present('@income_transactions_table',current_date_with_format);
     }


function filter_incomes_by_to_date()
     {
        cy.input_by_placeholder('To').type(current_date_with_format,{force:true}).click();
		cy.wait_until_disappear_div_loading_spinner();
		createTableAlias();
	    tables.verifyTotalRows('@income_transactions_table', 1);
	    tables.first_row_table_td_text_present('@income_transactions_table',current_date_with_format);
     }	
	 
function filter_incomes_by_description(description)
{
	cy.input_by_placeholder('Description').clear().type(description,{force:true})
	cy.wait_until_disappear_div_loading_spinner();
	createTableAlias();
	tables.verifyTotalRows('@income_transactions_table', 1);
	tables.first_row_table_td_text_present('@income_transactions_table',description);
}

function filter_incomes_by_amount2(amount)
{
	function formatAmount(amount) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	}

	const formattedAmount = formatAmount(amount);

	cy.input_by_placeholder('$ Amount').type(amount, { force: true });
	cy.wait_until_disappear_div_loading_spinner();

	createTableAlias();
	tables.verifyTotalRows('@income_transactions_table', 1);
	tables.first_row_table_td_text_present('@income_transactions_table',formattedAmount);
}

module.exports = {
	verify_income_transactions_page_displayed,
	click_first_transaction_item,
	verify_income_transaction_details,
	uncategorize_transaction,
	filter_incomes_by_payment_mode,
	filter_incomes_by_account_type,
	filter_incomes_by_from_date,
	filter_incomes_by_to_date,
	filter_incomes_by_description,
	filter_incomes_by_amount2,

}
