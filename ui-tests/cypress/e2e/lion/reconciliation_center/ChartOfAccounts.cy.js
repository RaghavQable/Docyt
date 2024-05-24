
const login_page  = require("../../../lib/common/login/login");
const chart_accounts_page = require("../../../lib/lion/reconciliation_center/chart_of_accounts")

const time_helper = require("../../../utils/time_helper");
const {navigate_settings_page} = require("../../../lib/common/navigation/navigation")
const data = Cypress.env('lion');

describe("Chart Of Accounts", () => {

    it("C13207: Add a new account", { tags: '@smoke'}, () => {

        const randomNum = time_helper.get_epoch_time();
        const category = {
            name: 'CN_' + randomNum,
            code: 'CC_' + randomNum,
            account_type: 'Expenses',
            detail_type: 'Cost of Labor',
            mapped_departments: data['business1_mapped_departments']
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_CHART_OF_ACCOUNTS", data['test_business1_id']);
        chart_accounts_page.verify_chart_of_accounts_page_displayed();
        chart_accounts_page.click_add_button();
        chart_accounts_page.fill_add_custom_category_form_and_submit(category);
        chart_accounts_page.verify_chart_of_accounts_page_displayed();
        chart_accounts_page.filter_by_category_name_or_code(category['name']);
        chart_accounts_page.verify_category_details(category);
        chart_accounts_page.delete_first_category();
    })


})