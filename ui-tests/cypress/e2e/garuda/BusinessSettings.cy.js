
const login_page  = require("../../lib/common/login/login");
const integrations_page = require("../../lib/garuda/settings/integrations");

const {navigate_to} = require("../../lib/common/navigation/navigation")
const notifications = require("../../lib/common/notifications/notifications")
const data = Cypress.env('garuda');
const time_helper = require("../../utils/time_helper");


describe("Business Settings", () => {

    it("C61996: Fosse Integration Activation Procedure", () => {
        // This test is partially automated. Email send part is yet to be implemented
        
        const business_name = data['test_business4_name'];
        const integration_name = data['integration']['fosse']['name']
        const start_date = time_helper.get_formatted_date('YYYY-MM-DD');
        const revenue_mapping = data['revenue_center']['report1'];

        login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_INTEGRATIONS');
        integrations_page.verify_integration_settings_page_displayed();
        integrations_page.click_business_name(business_name);
        integrations_page.verify_selected_business_integration_page_displayed(business_name, integration_name);
        integrations_page.click_dropdown_option_for_integration(integration_name, 'Configure');
        integrations_page.verify_configure_your_fosse_integration_page_displayed(integration_name);
        integrations_page.fill_configure_fosse_integration_form_and_submit(start_date, revenue_mapping);
        cy.wait(20000);  // Waiting for sometime as mentioned in TestCase
        integrations_page.activate_integration(integration_name);
        integrations_page.click_dropdown_option_for_integration(integration_name, 'Configure');
        integrations_page.verify_email_populated_in_configure_fosse_integration_page();
        navigate_to('SETTINGS_INTEGRATIONS');
        integrations_page.verify_integration_settings_page_displayed();
        integrations_page.click_business_name(business_name);
        integrations_page.verify_selected_business_integration_page_displayed(business_name, integration_name);
        cy.wait(5000);
        integrations_page.pause_integration(integration_name);
        integrations_page.disconnect_integration(integration_name);
        
    })

    it("71537: UPS Store (When credentials are incorrect)", () => {
        
        const business_name = data['test_business3_name'];
        const integration_name = data['integration']['ups_store']['name']
        const username = data['integration']['ups_store']['username']
        const password = data['integration']['ups_store']['password']
        const store = data['integration']['ups_store']['store']
        const start_date = time_helper.get_formatted_date('YYYY-MM-DD', time_helper.get_first_date_of_current_month())
        const revenue_mapping = data['integration']['ups_store']['revenue_mapping']

        login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_INTEGRATIONS');
        integrations_page.verify_integration_settings_page_displayed();
        integrations_page.click_business_name(business_name);
        integrations_page.verify_selected_business_integration_page_displayed(business_name, integration_name);
        integrations_page.click_dropdown_option_for_integration(integration_name, 'Configure');
        integrations_page.verify_configure_your_ups_store_integration_page_displayed(integration_name);
        integrations_page.fill_configure_ups_store_integration_form_and_submit(username, password, store, start_date, revenue_mapping);
        cy.wait(2000);  // Waiting for sometime as mentioned in TestCase
        integrations_page.activate_integration(integration_name);
        cy.wait(2000);
        integrations_page.click_dropdown_option_for_integration(integration_name, 'Reset');
        integrations_page.verify_reset_runs_modal_displayed();
        integrations_page.fill_reset_runs_modal('1', '1')
        cy.wait(2000);
        integrations_page.click_dropdown_option_for_integration(integration_name, 'View History');
        integrations_page.verify_history_shows_pending_status(integration_name)
        navigate_to('SETTINGS_INTEGRATIONS');
        integrations_page.verify_integration_settings_page_displayed();
        integrations_page.click_business_name(business_name);
        integrations_page.verify_selected_business_integration_page_displayed(business_name, integration_name);
        cy.wait(2000);
        integrations_page.pause_integration(integration_name);
        integrations_page.disconnect_integration(integration_name);
    })


})