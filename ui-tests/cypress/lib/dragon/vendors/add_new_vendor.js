module.exports = {
    verify_add_new_vendor_modal_displayed: function () {
      cy.h4_by_text('Add New Vendor').should('exist');
      cy.button_by_text('Create New Vendor').should('exist');
    },
  
    search_vendor_in_docyt_business_network_and_add: function (vendor) {
      cy.input_by_placeholder('Search Vendors in Docyt Business Network').type(vendor);
      cy.strong_by_text(vendor).click();
      cy.span_by_text(vendor).should('exist');
      cy.input_by_id('verify-information').click();
      cy.button_by_text('Add Vendor').click();
      cy.wait_until_disappear_div_loading_spinner();
      cy.reload();
    },
  
    click_create_new_vendor_button: function () {
      cy.button_by_text('Create New Vendor').click();
    },
  
    click_import_from_ledger_link: function () {
      cy.a_by_text('or Import From Ledger').click();
    },
  
    verify_add_payee_merchant_modal_displayed: function () {
      cy.h4_by_text('Add Payee/Merchant').should('exist');
      cy.button_by_text('Save Payee').should('exist');
    },
  
    add_payee_merchant_details_and_save_payee: function (payee_name, payment_method) {
      cy.input_by_placeholder("Small, Simpler Name").type(payee_name);
      cy.button_by_title('Select Payment Method').click();
      cy.a_by_text(payment_method).click();
      cy.button_by_text('Save Payee').click();
      cy.wait_until_disappear_div_loading_spinner();
    },
  
    search_vendor_by_name: function (vendorName) {
      cy.input_by_placeholder('Filter by name').type(vendorName);
    },

    search_vendor_name_on_docyt_network: function (vendorName) {
        cy.input_by_placeholder('Search vendor by name').type(vendorName);
      },
  
    click_on_vendor_name: function () {
      cy.div_vendor_name('vendor-list').click();
    },
  
    click_on_address_book: function () {
      cy.a_by_containing_text('ADDRESS BOOK').click();
    },
  
    fill_add_mailing_address_form_and_submit: function (address) {
      this.fill_Check_Payable_text_field('Check Payable to', address['Check Payable to']);
      this.fill_Check_Payable_text_field('Company', address['Company']);
      this.fill_Check_Payable_text_field('Address', address['Street']);
      cy.input_by_placeholder('City').type('Texas');
      cy.input_by_placeholder('ZIP').type('1234567');
      cy.input_by_id('checkbox-authorized-address').click();
  
      this.click_save_and_close_button();
    },
  
    fill_Check_Payable_text_field: function (label, text) {
      cy.input_by_containing_text_label(label).clear().type(text, {force: true});
    },
  
    click_save_and_close_button: function () {
      cy.wait(2000);
      cy.button_by_text('Save').should('be.visible').click({force: true});
      cy.wait_until_disappear_button_by_text('Save');
      cy.button_by_text('Confirm').click({force: true});
      cy.wait(1000);
    },
  
    delete_saved_address: function() {
      cy.button_by_containing_id('address').eq(0).click({force: true});
      cy.span_by_text('Delete Address').eq(0).click({force: true});
      cy.button_by_text('Proceed').click({force: true});
    },
  
    add_mailing_address_flow: function (address) {
      cy.button_by_containing_class('add-address-btn').click();
      this.fill_add_mailing_address_form_and_submit(address);
    },

    verify_alert_message: function(alert_title,alert_message){
        cy.div_contain_class('toast-title').should('have.text',alert_title)
        cy.div_contain_class('toast-message').should('have.text',alert_message)
    },

    verify_checkbox_disabled: function(){
        cy.vendor_checkbox().should('be.disabled')
    },
    
    verify_checkbox_enabled: function(){
        cy.vendor_checkbox().should('be.enabled')
    },

    click_on_vendor_more_option: function(){
        cy.a_by_containing_id('vendor').click()
    },

    verify_remove_from_my_vendor_list_option: function(){
        cy.a_by_containing_list_option('Remove').should('be.visible')
    }
  };
  