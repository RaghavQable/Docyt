
function verify_business_profile_page_displayed(business_name) {
    cy.h1_by_text('Setup ' + business_name).should('be.visible');
    cy.any_corresponding_to_label('Business Profiles', business_name).should('be.visible');
}

function verify_business_details(business) {
    cy.any_corresponding_to_label('Business Name', business['business_name']).should('be.visible');
    cy.any_corresponding_to_label('Email', business['email']).should('be.visible');
    cy.any_corresponding_to_label('Address', business['address']).should('be.visible');
}

function click_edit_profile_link() {
    cy.a_by_text('Edit Profile').click();
}

function verify_edit_business_profile_modal_displayed() {
    cy.h1_by_text('Edit Business Profile').should('be.visible');
    cy.button_by_text('Save').should('exist');
}

function verify_details_populated_in_business_profile_modal(business) {
    cy.input_by_label('Display Name').should('have.value', business['display_name']);
    cy.input_by_label('Business Name').should('have.value', business['business_name']);
    cy.input_by_label('Email').should('have.value', business['email']);
}

function clear_field(label) {
    cy.input_by_label(label).clear();
}

function click_save_button() {
    cy.button_by_text('Save').click();
}

function verify_validation_error_displayed(error) {
    cy.p_by_containing_text(error).should('be.visible');
}

function update_business_profile(business_profile) {
    cy.input_by_label("Display Name").clear().type(business_profile['display_name']);
    cy.input_by_label("Business Name").clear().type(business_profile['business_name']);
    cy.input_by_label("Email").clear().type(business_profile['email']);
    cy.button_by_text('Save').click();
    cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
    verify_business_profile_page_displayed,
    verify_business_details,
    click_edit_profile_link,
    verify_edit_business_profile_modal_displayed,
    verify_details_populated_in_business_profile_modal,
    clear_field,
    click_save_button,
    verify_validation_error_displayed,
    update_business_profile
};
  