const tables = require("../../common/webtables/tables");

function verify_invoices_page_displayed(business_name) {
  cy.wait_until_visible_h1_by_text('Invoices');
}

function createTableAlias() {
  cy.xpath("//div[contains(@class, 'payment-table-wrapper')]/table").as('invoices_table')
}

function filter_by_invoice_number(invoice_number) {
  cy.input_by_placeholder('Invoice Number').clear().type(invoice_number);
  cy.wait_until_disappear_div_loading_spinner();
}

function verify_invoice_exists(invoice_number) {
  filter_by_invoice_number(invoice_number)
  createTableAlias()
  tables.verifyTotalRows('@invoices_table', 1)
}

module.exports = {
  verify_invoices_page_displayed,
  verify_invoice_exists,
};