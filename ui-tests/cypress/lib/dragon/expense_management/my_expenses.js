
const tables = require("../../common/webtables/tables")

function verify_my_expenses_page_displayed() {
    cy.h1_by_text('Expenses').should('be.visible')
    cy.button_by_containing_class('expense-add-btn').should('be.visible')
}

function click_add_expense_button() {
    cy.button_by_containing_class('expense-add-btn').click()
}

function filter_by_amount(min_amount, max_amount) {
    cy.input_by_placeholder('Min').clear().type(min_amount);
    cy.input_by_placeholder('Max').clear().type(max_amount);
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_expense_merchant(formatted_amount, merchant) {
    cy.any_match_table_data_by_corresponding_row_col('Amount', formatted_amount, 'Merchant', merchant).should('exist');
}

function createTableAlias() {
    cy.xpath("//div[contains(@class, 'expense-queue-table-wrapper')]/table").as('expense_queue_table')
}

function click_first_row_amount_dropdown_option(option) {
    createTableAlias()
    tables.verifyTotalRows('@expense_queue_table', 1)
    tables.clickLastCellFromFirstRow('@expense_queue_table')
    cy.wait(1000)
    cy.button_by_text(option).click() 
}

function delete_expense(amount) {
    filter_by_amount(amount.toString(), amount.toString());
    click_first_row_amount_dropdown_option("Remove Expense");
    cy.button_by_text("Proceed").click()
    cy.wait_until_disappear_div_loading_spinner();
}


module.exports = {
    verify_my_expenses_page_displayed,
    click_add_expense_button,
    filter_by_amount,
    verify_expense_merchant,
    click_first_row_amount_dropdown_option,
    delete_expense
};
  