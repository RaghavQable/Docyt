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

function filter_expenses_by_vendor(text)
{
     cy.input_by_placeholder('Search Vendors').type(text,{force:true})
	 cy.wait_until_disappear_div_loading_spinner();
	 cy.wait(1000)
	 cy.strong_by_text(text).should('be.visible').click()
     cy.wait(1000)
	 createTableAlias();
	 tables.verifyTotalRows('@expenses_transactions_table', 1);
	 tables.first_row_table_td_text_present('@expenses_transactions_table',text)
	 
}

function filter_expenses_by_category()
{
     cy.input_by_placeholder('Category').type('Fuel',{force:true})
	 cy.wait_until_disappear_div_loading_spinner();
	 cy.wait(2000)
     cy.focused()
        .type('{downarrow}', { force: true})
        .should('exist')
        .type('{enter}', { force: true});
	 cy.wait(1000)
	 createTableAlias();
	 tables.verifyTotalRows('@expenses_transactions_table', 1);
	 tables.first_row_table_td_text_present('@expenses_transactions_table','Fuel')
	 
}

function filter_expenses_by_account_type()
    {
       cy.div_by_text('Account').click();
	   cy.span_by_text_with_ancestor_a('Bank Account').trigger('mouseover').click();
	   cy.wait_until_disappear_div_loading_spinner();
	   cy.wait(1000);
	   createTableAlias();
	   tables.verifyTotalRows('@expenses_transactions_table', 1);
	   tables.first_row_table_td_text_present('@expenses_transactions_table','Bank Account');
	}

function filter_expenses_by_from_date()
     {
        cy.input_by_placeholder('From').type('Date',{force:true}).click();
		cy.wait_until_disappear_div_loading_spinner();
		createTableAlias();
	    tables.verifyTotalRows('@expenses_transactions_table', 1);
	    tables.first_row_table_td_text_present('@expenses_transactions_table','Date');
     }


function filter_expenses_by_to_date()
     {
        cy.input_by_placeholder('To').type('Date',{force:true}).click();
		cy.wait_until_disappear_div_loading_spinner();
		createTableAlias();
	    tables.verifyTotalRows('@expenses_transactions_table', 1);
	    tables.first_row_table_td_text_present('@expenses_transactions_table','date');
     }	
	 
function filter_expenses_by_description()
{
	cy.input_by_placeholder('Description').type('random description',{force:true})
	cy.wait_until_disappear_div_loading_spinner();
	createTableAlias();
	tables.verifyTotalRows('@expenses_transactions_table', 1);
	tables.first_row_table_td_text_present('@expenses_transactions_table','random description');
}

function filter_expenses_by_amount2()
{
	cy.input_by_placeholder('$ Amount').type('random amount',{force:true})
	cy.wait_until_disappear_div_loading_spinner();
	createTableAlias();
	tables.verifyTotalRows('@expenses_transactions_table', 1);
	tables.first_row_table_td_text_present('@expenses_transactions_table','random amount');
}

module.exports = {
	verify_expenses_transactions_page_displayed,
	click_first_transaction_item,
	filter_by_amount,
	verify_expense_transaction_details,
	verify_expense_transactions_details,
	uncategorize_transaction,
	close_transaction_details_modal,
	filter_expenses_by_vendor,
	filter_expenses_by_category,
	filter_expenses_by_account_type,
	filter_expenses_by_from_date,
	filter_expenses_by_to_date,
	filter_expenses_by_description,
	filter_expenses_by_amount2,
}
