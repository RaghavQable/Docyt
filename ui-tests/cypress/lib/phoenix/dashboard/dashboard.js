const tables = require("../../common/webtables/tables")

function verify_client_dashboard_page_displayed(){
  cy.wait_until_visible_any_by_id("user-icon");
  cy.input_by_placeholder("Enter Email").should('not.exist');
  cy.wait_until_disappear_div_loading_spinner();
}

function verify_business_dashboard_page_displayed(){
  cy.input_by_placeholder("Enter Email").should('not.exist');
  cy.any_by_id("user-icon", { timeout: 30000 }).should('be.visible');
  cy.span_by_text("Tasks").should('be.visible');
}

function verify_business_dashboard_accounting_page_displayed() {
  cy.input_by_placeholder("Enter Email").should('not.exist');
  cy.any_by_id("user-icon", { timeout: 30000 }).should('be.visible');
  cy.span_by_text("Accounting").should('be.visible');
}

function verify_business_exists(business_name) {
  cy.a_by_text(business_name).should('exist');
}

function verify_business_not_exist(business_name) {
  cy.a_by_text(business_name).should('not.exist');
}

function createTableAlias() {
  cy.xpath("//div[contains(@class, 'banking-transactions-table-wrapper')]/table").as('table')
}

function click_table_heading_column(column_name) {
  cy.th_div_table_heading(column_name).click();
  cy.wait_until_disappear_div_loading_spinner();
}

function verify_sort_by_client_name(client_name){
  createTableAlias()
  tables.first_row_table_cell_text_present('@table', 'a', client_name)
}

module.exports = {
  verify_client_dashboard_page_displayed,
  verify_business_dashboard_page_displayed,
  verify_business_dashboard_accounting_page_displayed,
  verify_business_exists,
  verify_business_not_exist,
  click_table_heading_column,
  verify_sort_by_client_name
};
  