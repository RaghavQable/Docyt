const tables = require("../../common/webtables/tables")

function verify_chart_of_accounts_page_displayed() {
    cy.wait_until_visible_h2_by_text('Chart of Accounts')
    cy.wait_until_visible_button_by_containing_class('btn-add-coa')
    cy.wait_until_disappear_div_loading_spinner();
}

function click_add_button() {
    cy.button_by_containing_class('btn-add-coa').click();
}

function verify_add_custom_category_form_displayed() {
    cy.wait_until_visible_h3_by_Text('Add Custom Category')
    cy.wait_until_visible_button_by_text('Add Category')
}

function fill_add_custom_category_form_and_submit(category){
    cy.input_by_placeholder('Select Account Type').type(category['account_type']);
    cy.strong_by_text(category['account_type']).click();
    cy.div_by_text('Add Departments').click();
    cy.wait_until_visible_h4_by_text('Map Departments to Category');
    category['mapped_departments'].forEach(verify_department);
    cy.button_by_text('Map Departments').click();
    cy.wait(2000);
    cy.input_by_placeholder('Select Detail Type').type(category['detail_type']);
    cy.strong_by_text(category['detail_type']).click();
    cy.input_by_label('Category Name').click().type(category['name']);
    cy.input_by_label('Category Code').click().type(category['code']);
    cy.button_by_text('Add Category').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_category_details(category) {
    cy.any_match_table_heading_by_table_data('Category', category['name']).should('be.visible');
    cy.td_by_text(category['code']).should('be.visible');
    cy.td_by_text(category['account_type']).should('be.visible');
    cy.td_by_text(category['detail_type']).should('be.visible');
    cy.any_match_table_heading_by_table_data('Mapped Departments', category['mapped_departments'].join(', ')).should('be.visible');

}

function createTableAlias() {
    cy.xpath("//table[@id='category-table']").as('category_table')
}

function click_first_row_three_dot_dropdown_option(option) {
    createTableAlias()
    tables.verifyTotalRows('@category_table', 1)
    tables.clickLastCellFromFirstRow('@category_table')
    cy.wait(1000)
    cy.a_by_text(option).click()
}

function delete_first_category() {
    click_first_row_three_dot_dropdown_option('Delete Accounting Category');
    cy.wait_until_visible_h4_by_text('Delete Category');
    cy.button_by_text('Delete').click();
    cy.wait_until_disappear_div_loading_spinner();
    tables.verifyTotalRows('@category_table', 0)
}

function verify_department(department, index) {
    cy.input_by_label(department).click();
}

function filter_by_category_name_or_code(search_term) {
    cy.input_by_placeholder('Category or Code').type(search_term);
    cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
    verify_chart_of_accounts_page_displayed,
    click_add_button,
    verify_add_custom_category_form_displayed,
    fill_add_custom_category_form_and_submit,
    filter_by_category_name_or_code,
    verify_category_details,
    delete_first_category
}
