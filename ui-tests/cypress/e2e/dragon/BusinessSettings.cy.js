
const login_page  = require("../../lib/common/login/login");
const business_profile = require("../../lib/dragon/business_settings/business_profile");

const {navigate_settings_page} = require("../../lib/common/navigation/navigation")
const data = Cypress.env('dragon');

describe("Business Settings", () => {

    it("C61999: Edit Business Profile", { tags: '@smoke'}, () => {

        const business_details = data['business6']
        const new_business_profile = {
            display_name: "Dragon Business New",
            business_name: "Dragon Business New",
            email: "automation+dragon@docyt.com",
            address: business_details['address']
          }
        login_page.login_and_navigate_to_settings_page(data['email'], data['password'], data['test_business6_id'], 3);
        business_profile.verify_business_profile_page_displayed(data['test_business6_name']);
        business_profile.verify_business_details(business_details);
        business_profile.click_edit_profile_link();
        business_profile.verify_edit_business_profile_modal_displayed();
        business_profile.verify_details_populated_in_business_profile_modal(business_details);
        business_profile.clear_field("Business Name");
        business_profile.click_save_button();
        business_profile.verify_validation_error_displayed("Business Name is required.");
        business_profile.update_business_profile(new_business_profile);
        cy.reload();
        business_profile.verify_business_details(new_business_profile);
        business_profile.click_edit_profile_link();
        business_profile.verify_edit_business_profile_modal_displayed();
        business_profile.update_business_profile(business_details);
        cy.reload();
    })


})