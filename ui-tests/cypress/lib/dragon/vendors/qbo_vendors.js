
const tables = require("../../common/webtables/tables")

function verify_import_vendors_from_quickbook_page_displayed() {
    cy.div_by_text('We are loading your vendors from QuickBooks. This process can take a few minutes. Please, do not close this browser window.');
    cy.h1_by_text('Import Vendors from QuickBooks').should('exist');
    cy.wait(2000);
    cy.wait_until_disappear_div_loading_spinner();
}

function filter_vendor_by_name(name) {
    cy.input_by_placeholder('Filter by name').type(name);
    cy.wait(2000);
}

async function get_first_enabled_vendor_name(var_name) {
    cy.xpath("(//input[not(@disabled) and contains(@class, 'qbo-vendor-item-checkbox')]/ancestor::tr/td[2][not(contains(text(), \"'\"))])[1]").then(($elem) => {
        let text = $elem.text();
        cy.wrap(text).as(var_name);
  })
}

function createVendorTableAlias() {
    cy.xpath("//div[contains(@class, 'vendors-list')]//table").as('vendor_table')
}

function select_vendor_from_first_row_and_continue(vendor_name) {
    createVendorTableAlias();
    tables.first_row_table_td_text_present('@vendor_table', vendor_name);
    tables.click_specified_tag_from_first_row('@vendor_table', 'input');
    cy.label_by_text('1 Vendors Selected').should('exist');
    cy.button_by_text('Continue').click();
}

function verify_review_your_selection_page_displayed() {
    cy.h1_by_text('Review your selection before importing').should('exist');
    cy.button_by_text('Finish Importing').should('exist');
}

function verify_vendor_displayed_on_review_selection_page(vendor_name) {
    cy.any_by_text(vendor_name).should('exist');
}

function click_finish_importing(){
    cy.button_by_text('Finish Importing').click();
}

function review_selection_and_finish_importing(vendor_name) {
    verify_review_your_selection_page_displayed()
    verify_vendor_displayed_on_review_selection_page(vendor_name);
    click_finish_importing();
    cy.wait_until_disappear_div_loading_spinner();
}


module.exports = {
    verify_import_vendors_from_quickbook_page_displayed,
    filter_vendor_by_name,
    select_vendor_from_first_row_and_continue,
    verify_review_your_selection_page_displayed,
    verify_vendor_displayed_on_review_selection_page,
    click_finish_importing,
    review_selection_and_finish_importing,
    get_first_enabled_vendor_name
};
  