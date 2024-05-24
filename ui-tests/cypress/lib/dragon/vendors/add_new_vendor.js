

function verify_add_new_vendor_modal_displayed() {
    cy.h4_by_text('Add New Vendor').should('exist');
    cy.button_by_text('Create New Vendor').should('exist');
}


function search_vendor_in_docyt_business_network_and_add(vendor) {
    cy.input_by_placeholder('Search Vendors in Docyt Business Network').type(vendor);
    cy.strong_by_text(vendor).click();
    cy.span_by_text(vendor).should('exist');
    cy.input_by_id('verify-information').click();
    cy.button_by_text('Add Vendor').click();
    cy.wait_until_disappear_div_loading_spinner();
    cy.reload();
}

function click_create_new_vendor_button(){
    cy.button_by_text('Create New Vendor').click();
}

function click_import_from_ledger_link(){
    cy.a_by_text('or Import From Ledger').click();
}

function verify_add_payee_merchant_modal_displayed(){
    cy.h4_by_text('Add Payee/Merchant').should('exist');
    cy.button_by_text('Save Payee');
}

function add_payee_merchant_details_and_save_payee(payee_name, payment_method){
    cy.input_by_placeholder("Small, Simpler Name").type(payee_name);
    cy.button_by_title('Select Payment Method').click();
    cy.a_by_text(payment_method).click();
    cy.button_by_text('Save Payee').click();
    cy.wait_until_disappear_div_loading_spinner();
}
  
module.exports = {
    verify_add_new_vendor_modal_displayed,
    search_vendor_in_docyt_business_network_and_add,
    click_create_new_vendor_button,
    click_import_from_ledger_link,
    verify_add_payee_merchant_modal_displayed,
    add_payee_merchant_details_and_save_payee
};
  