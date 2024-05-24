const notifications = require("../../common/notifications/notifications")

function verify_integration_settings_page_displayed() {
    cy.span_by_text('Docyt Settings').should('be.visible');
    cy.h2_by_text('Integrations').should('be.visible');
}

function click_business_name(name) {
    cy.span_by_text(name).click();
}

function verify_selected_business_integration_page_displayed(business_name, integration_name) {
    cy.h2_by_text(business_name + ' - Integrations').should('be.visible');
    cy.span_by_text(integration_name).should('be.visible');
}

function click_dropdown_for_integration(integration_name) {
    cy.xpath("//span[normalize-space(text())='" + integration_name + "']/ancestor::div[contains(@class,'business-item-wrapper')]//button[contains(@class, 'dropdown-toggle')]").click();
}

function click_dropdown_option_for_integration(integration_name, option) {
    click_dropdown_for_integration(integration_name);
    cy.xpath("//span[normalize-space(text())='" + integration_name + "']/ancestor::div[contains(@class,'business-item-wrapper')]//*[normalize-space(text())='" + option + "']/ancestor::a").should('be.visible').click();
}

function verify_configure_your_fosse_integration_page_displayed(integration_name) {
    cy.h2_by_text('Configure your ' + integration_name + ' Integration').should('be.visible');
    cy.input_by_label('Email Address').should('be.visible').should('have.attr', 'readonly');
    cy.input_by_label('Email Address').should('be.empty');
    cy.input_by_label('Start Date').should('be.visible');
    cy.select_by_label('Revenue Mapping').should('be.visible');
}

function verify_configure_your_ups_store_integration_page_displayed(integration_name) {
    cy.h2_by_text('Configure your ' + integration_name + ' Integration').should('be.visible');
    cy.button_by_text('Show Password').should('be.visible')
    cy.input_by_label('Username').should('be.visible')
    cy.input_by_label('Password').should('be.visible')
    cy.input_by_label('Store').should('be.visible');
    cy.input_by_label('Start Date').should('be.visible');
    cy.select_by_label('Revenue Mapping').should('be.visible');
}

function verify_email_populated_in_configure_fosse_integration_page() {
    cy.input_by_label('Email Address').should('be.visible').should('have.attr', 'readonly');
    cy.input_by_label('Email Address').invoke('val').should('not.be.empty');
}

function fill_configure_ups_store_integration_form_and_submit(username, password, store, start_date, revenue_mapping) {
    cy.input_by_label('Username').type(username);
    cy.input_by_label('Password').type(password);
    cy.input_by_label('Store').type(store);
    cy.input_by_label('Start Date').type(start_date);
    cy.select_by_label('Revenue Mapping').select(revenue_mapping)
    cy.input_by_value('Save Draft').click();
    cy.wait_until_disappear_div_loading_spinner();
    notifications.verify_toast_message_notification_displayed('Draft has been saved.');
}

function fill_configure_fosse_integration_form_and_submit(date, revenue_mapping) {
    cy.input_by_label('Start Date').type(date);
    cy.select_by_label('Revenue Mapping').select(revenue_mapping)
    cy.input_by_value('Save Draft').click();
    cy.wait_until_disappear_div_loading_spinner();
    notifications.verify_toast_message_notification_displayed('Draft has been saved.');
}

function activate_integration(integration_name) {
    click_dropdown_option_for_integration(integration_name, 'Activate');
    notifications.verify_toast_message_notification_displayed('Integration has been activated');
}

function pause_integration(integration_name) {
    click_dropdown_option_for_integration(integration_name, 'Pause');
    notifications.verify_toast_message_notification_displayed('Integration has been paused');
}

function disconnect_integration(integration_name) {
    click_dropdown_option_for_integration(integration_name, 'Disconnect');
    cy.p_by_text('Are you sure that you would like to disconnect this integration?').should('be.visible');
    cy.button_by_text('Disconnect').should('be.visible').click();
    notifications.verify_toast_message_notification_displayed('Integration has been disconnected');
}

function verify_reset_runs_modal_displayed() {
    cy.h4_by_text('Reset Runs').should('be.visible');
    cy.input_by_label('Start Date').should('be.visible');
    cy.input_by_label('End Date').should('be.visible');
    cy.a_by_text('Cancel').should('be.visible');
    cy.button_by_text('Reset').should('be.visible');
}

function fill_reset_runs_modal(start_date, end_date) {
    cy.input_by_placeholder('Start Date').click();
    select_date_from_date_selector(start_date);
    cy.input_by_placeholder('End Date').click();
    select_date_from_date_selector(end_date);
    cy.button_by_text('Reset').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_history_shows_pending_status(integration_name) {
    cy.h2_by_containing_text(integration_name).should('be.visible');
    cy.span_by_text('Pending').should('be.visible');
}

function select_date_from_date_selector(date) {
    cy.xpath("//td[not(contains(@class,'old')) and not(contains(@class,'new')) and text()='" + date + "']").click()
}

function click_close_page_button() {
    cy.any_by_containing_class('close-page-btn').click();
}

module.exports = {
    verify_integration_settings_page_displayed,
    click_business_name,
    verify_selected_business_integration_page_displayed,
    click_dropdown_option_for_integration,
    verify_configure_your_fosse_integration_page_displayed,
    verify_configure_your_ups_store_integration_page_displayed,
    fill_configure_fosse_integration_form_and_submit,
    fill_configure_ups_store_integration_form_and_submit,
    activate_integration,
    pause_integration,
    disconnect_integration,
    verify_email_populated_in_configure_fosse_integration_page,
    verify_reset_runs_modal_displayed,
    fill_reset_runs_modal,
    verify_history_shows_pending_status,
    click_close_page_button
}
