

function verify_payee_detail_page_displayed(payee) {
    cy.div_by_text(payee).should('exist');
    cy.a_by_text('PAYMENTS').should('exist');
    cy.a_by_text('ADDRESS BOOK').should('exist');
    cy.a_by_text('PROFILE').should('exist');
}

function verify_profile_tab_displayed(payee){
    cy.div_by_text('Profile Info').should('exist');
    cy.span_by_text(payee).should('exist');
    cy.button_by_id('payee-dropdown-btn').should('exist');
}

function check_profile_tab_detail_by_field(field, expected_value) {
    cy.xpath(`//span[text()='${field}']/../..//*[text()='${expected_value}']`).should('exist');
}

function verify_payee_details_in_profile_tab(payee) {
    check_profile_tab_detail_by_field('Name', payee['name']);
    check_profile_tab_detail_by_field('Website', payee['website']);
    check_profile_tab_detail_by_field('Email', payee['email']);
    check_profile_tab_detail_by_field('Phone Number', payee['phone']);
    check_profile_tab_detail_by_field('Check Payable to', payee['check_payable_to']);
    check_profile_tab_detail_by_field('Address', payee['address']);
    check_profile_tab_detail_by_field('Preffered Payment Method', payee['preffered_payment_method']);
}

function delete_payee(){
    cy.wait(2000);
    cy.button_by_id('payee-dropdown-btn').should('be.visible').click();
    cy.a_by_text('Remove Payee').click();
    verify_remove_payee_modal_displayed();
    cy.button_by_text('Proceed').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_remove_payee_modal_displayed() {
    cy.h4_by_text('Remove Payee');
    cy.p_by_text('Are you sure you want to delete this payee?');
    cy.a_by_text('Cancel');
    cy.button_by_text('Proceed');
}

  
module.exports = {
    verify_payee_detail_page_displayed,
    verify_profile_tab_displayed,
    verify_payee_details_in_profile_tab,
    delete_payee,
    verify_remove_payee_modal_displayed
};
  