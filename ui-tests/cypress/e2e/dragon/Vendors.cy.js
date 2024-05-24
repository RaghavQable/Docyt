
const login_page  = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const payee_list_page = require("../../lib/dragon/vendors/payee_list");
const add_vendor_modal = require("../../lib/dragon/vendors/add_new_vendor");
const payee_detail_page = require("../../lib/dragon/vendors/payee_detail");
const qbo_vendor_page = require("../../lib/dragon/vendors/qbo_vendors");
const {navigate_to_business_path} = require("../../lib/common/navigation/navigation")
const time_helper = require("../../utils/time_helper");
const data = Cypress.env('dragon');

const payee = data['vendor1']['name']
const payee2 = data['vendor2']
const new_vendor = "PAYEE_" + time_helper.get_epoch_time();

function delete_payee(payee) {
    payee_list_page.click_payee_from_list(payee);
    payee_detail_page.verify_payee_detail_page_displayed(payee);
    payee_detail_page.verify_profile_tab_displayed(payee);
    payee_detail_page.delete_payee();
    payee_list_page.verify_payee_list_page_displayed();
    cy.reload();
    payee_list_page.verify_payee_list_page_displayed();
    payee_list_page.verify_payee_not_displayed_in_list(payee);
}

describe("Vendors", () => {

    it("C28: Add a new vendor (with Search Vendors in Docyt Business Network)", { tags: '@smoke'}, () => {

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_PAYEES", data['test_business1_id'])
        payee_list_page.verify_payee_list_page_displayed();
        
        payee_list_page.click_add_payee_button();
        add_vendor_modal.verify_add_new_vendor_modal_displayed();
        add_vendor_modal.search_vendor_in_docyt_business_network_and_add(payee);
        payee_list_page.verify_payee_displayed_in_list(payee);

        delete_payee(payee);
    })

    it("C90966: Add a new vendor (with Create New Vendor)", { tags: '@smoke'}, () => {

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_PAYEES", data['test_business1_id'])
        payee_list_page.verify_payee_list_page_displayed();
        
        payee_list_page.click_add_payee_button();
        add_vendor_modal.verify_add_new_vendor_modal_displayed();
        add_vendor_modal.click_create_new_vendor_button();
        add_vendor_modal.verify_add_payee_merchant_modal_displayed();
        add_vendor_modal.add_payee_merchant_details_and_save_payee(new_vendor, 'Docyt Check');

        payee_list_page.verify_payee_displayed_in_list(new_vendor);

        delete_payee(new_vendor);
    })

    it("C90967: Add a new vendor (with Import From Ledger)", { tags: '@smoke'}, () => {

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_PAYEES", data['test_business1_id'])
        payee_list_page.verify_payee_list_page_displayed();
        
        payee_list_page.click_add_payee_button();
        add_vendor_modal.verify_add_new_vendor_modal_displayed();
        add_vendor_modal.click_import_from_ledger_link();
        qbo_vendor_page.verify_import_vendors_from_quickbook_page_displayed();
        qbo_vendor_page.get_first_enabled_vendor_name('first_vendor_name');

        cy.get('@first_vendor_name').then(payee_name => {
            cy.log(payee_name);
            qbo_vendor_page.filter_vendor_by_name(payee_name);

            qbo_vendor_page.select_vendor_from_first_row_and_continue(payee_name);
            qbo_vendor_page.review_selection_and_finish_importing(payee_name);

            navigate_to_business_path('ACCOUNTS_PAYABLE_PAYEES', data['test_business1_id']);
            payee_list_page.verify_payee_list_page_displayed();
            payee_list_page.verify_payee_displayed_in_list(payee_name);

            delete_payee(payee_name);
        });
    })

    it("C18604: View Payee Profile(Active Vendor)", () => {
        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_PAYEES", data['test_business1_id'])
        payee_list_page.verify_payee_list_page_displayed();
        payee_list_page.verify_payee_displayed_in_list(payee2['name']);
        payee_list_page.click_payee_from_list(payee2['name']);
        payee_detail_page.verify_payee_detail_page_displayed(payee2['name']);
        payee_detail_page.verify_profile_tab_displayed(payee2['name']);
        payee_detail_page.verify_payee_details_in_profile_tab(payee2);
    })

})