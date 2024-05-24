
const login_page  = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const receipt_list_page = require("../../lib/dragon/receipt_box/receipt_list");
const add_edit_receipt = require("../../lib/dragon/receipt_box/add_edit_receipt");
const {navigate_to_business_path} = require("../../lib/common/navigation/navigation")
const time_helper = require("../../utils/time_helper");
const number_helper = require("../../utils/number_helper");
const data = Cypress.env('dragon');

describe("Receipt Box", () => {

    it("C46: Upload receipt through browser", () => {
        const receipt_file = data['receipt1']['file'];
        const receipt = data['receipt1'];
        const amount = number_helper.get_random_number(10000);
        const formatted_amount = number_helper.get_formatted_amount(amount);
        const current_date = time_helper.get_current_date_of_month();

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECEIPT_BOX_RECEIPT_LIST", data['test_business1_id'])
        receipt_list_page.verify_receipt_list_page_displayed();
        receipt_list_page.click_add_receipt_button();
        add_edit_receipt.verify_add_receipt_form_displayed();
        add_edit_receipt.select_file_from_computer_and_upload(receipt_file, receipt['merchant']);
        add_edit_receipt.fill_amount(amount);
        add_edit_receipt.fill_date_field("Date", current_date);
        add_edit_receipt.click_save_and_close_button();
        cy.reload();
        receipt_list_page.filter_by_amount(amount);
        receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);
        receipt_list_page.delete_receipt_with_amount(formatted_amount);
    })

    it("C51 C10867 C213229: Approve and Edit Receipt, Filter Receipt", { tags: '@smoke'}, () => {

        const merchant = data['vendor2']['name'];
        const amount = number_helper.get_random_number(100000);
        const formatted_amount = number_helper.get_formatted_amount(amount);
        const current_date = time_helper.get_current_date_of_month();
        const formatted_date = time_helper.get_formatted_date("MM/DD/YYYY");
        const payment_account = "Cash";

        const receipt = {
            merchant: merchant,
            amount: amount,
            formatted_amount: formatted_amount,
            date: current_date,
            formatted_date: formatted_date
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECEIPT_BOX_RECEIPT_LIST", data['test_business1_id'])
        receipt_list_page.verify_receipt_list_page_displayed();
        receipt_list_page.click_add_receipt_button();
        add_edit_receipt.verify_add_receipt_form_displayed();
        add_edit_receipt.fill_add_receipt_form_and_submit(receipt);
        cy.reload();
        receipt_list_page.filter_by_amount(amount);
        receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);

        receipt_list_page.click_amount_dropdown_option(formatted_amount, 'Approve Receipt Data');
        add_edit_receipt.verify_receipt_details(receipt['merchant'], formatted_amount.slice(1), formatted_date);
        add_edit_receipt.select_payment_account(payment_account);
        add_edit_receipt.click_approve_receipt_review_next_button();
        receipt_list_page.verify_receipt_list_page_displayed();

        navigate_to_business_path("RECEIPT_BOX_RECEIPT_LIST_APPROVED", data['test_business1_id']);
        receipt_list_page.verify_receipt_list_page_displayed();
        receipt_list_page.filter_by_amount(amount);
        receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);

        receipt_list_page.edit_receipt(formatted_amount);
        navigate_to_business_path("RECEIPT_BOX_RECEIPT_LIST", data['test_business1_id']);

        receipt_list_page.filter_and_verify_receipt_exist('Search Vendors', merchant, formatted_amount);
        receipt_list_page.filter_and_verify_receipt_exist('Account', payment_account, formatted_amount);
        receipt_list_page.filter_and_verify_receipt_exist('Start', current_date, formatted_amount);
        receipt_list_page.filter_and_verify_receipt_exist('End', current_date, formatted_amount);
        receipt_list_page.filter_and_verify_receipt_exist('Uploader', data['name'], formatted_amount);
        receipt_list_page.filter_by_amount(amount);
        receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);

        receipt_list_page.delete_receipt_with_amount(formatted_amount);
    })

})