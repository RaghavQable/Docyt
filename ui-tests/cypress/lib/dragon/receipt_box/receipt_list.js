
const tables = require("../../common/webtables/tables")

function verify_receipt_list_page_displayed() {
    cy.h3_by_text('Receipt List').should('exist');
    cy.button_by_containing_class('add-receipt-btn').should('exist');
}

function click_add_receipt_button() {
    cy.button_by_containing_class('add-receipt-btn').click();
}

function filter_by_amount(amount) {
    cy.input_by_placeholder('$ Amount').clear().type(amount);
    cy.wait_until_disappear_div_loading_spinner();
}

function filter_and_verify_receipt_exist(type, value, formatted_amount) {
    cy.input_by_placeholder(type).clear().type(value);
    cy.wait_until_disappear_div_loading_spinner();
    verify_receipt_exist_with_amount(formatted_amount);
    cy.input_by_placeholder('Search Vendors').clear();''
}

function verify_receipt_exist_with_amount(formatted_amount) {
    cy.any_match_table_heading_by_table_data('Amount', formatted_amount).should('exist');
}

function createTableAlias() {
    cy.xpath("//div[contains(@class, 'receipts-table-wrapper')]/table").as('receipt_list_table')
}

function click_amount_dropdown_option(formatted_amount, option) {
    cy.any_match_table_heading_by_table_data('Amount', formatted_amount).click();
    cy.button_by_text(option).click()
}

function edit_receipt(formatted_amount) {
    click_amount_dropdown_option(formatted_amount, 'Edit Receipt');
    cy.wait_until_visible_h4_by_text('Editing a verified receipt');
    cy.button_by_text('Proceed').click();
}

function delete_receipt_with_amount(formatted_amount) {
    filter_by_amount(formatted_amount)
    click_amount_dropdown_option(formatted_amount, 'Delete Receipt')
    cy.button_by_text("Proceed").click()
    cy.wait_until_disappear_div_loading_spinner();
}

  
module.exports = {
    verify_receipt_list_page_displayed,
    click_add_receipt_button,
    filter_by_amount,
    filter_and_verify_receipt_exist,
    verify_receipt_exist_with_amount,
    delete_receipt_with_amount,
    click_amount_dropdown_option,
    edit_receipt
};
  