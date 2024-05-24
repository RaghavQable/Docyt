
const login_page  = require("../../lib/common/login/login");
const { navigate_to_business_path } = require("../../lib/common/navigation/navigation");

const management_reports = require("../../lib/panda/business_reports/management_reports");
const transactions_page  = require("../../lib/phoenix/bank_accounts/transactions");
const uncategorized_transactions_page  = require("../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page  = require("../../lib/lion/transactions/expenses_transactions");
const transactions_trash_page = require("../../lib/phoenix/bank_accounts/trash");

const time_helper = require("../../utils/time_helper");
const {navigate_settings_page} = require("../../lib/common/navigation/navigation")
const data = Cypress.env('panda');

describe("Business Settings", () => {
    it("C313438: Verify Owners Report: Drill Down", { tags: '@smoke'}, () => {
        const report = data['business_reports']['report1'];
        const report_name = report['name'];
        const report_type = report['type'];
        const amount = (Math.random() * 100).toFixed(2);
        const memo_prefix = Math.random().toString(36).substr(2, 10);
       
        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business6_id'])
        transactions_page.verify_transactions_page_displayed();
		transactions_page.add_transaction(transactions_page.transaction_data(amount, 'Credit Card(manual)', memo_prefix));

        navigate_to_business_path("RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS", data['test_business6_id'])
		uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
		uncategorized_transactions_page.expense_categorize_transaction(amount, data['vendor1']['name']);

        navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business6_id']);
		expenses_transactions_page.verify_expense_transaction_details(amount);

        navigate_to_business_path('BUSINESS_REPORTS_MANAGEMENT_REPORT', data['test_business6_id'])
        management_reports.verify_management_reports_page_displayed();
        management_reports.verify_report_type_displayed(report_type);
        management_reports.click_report_type(report_type);
        management_reports.verify_owners_operating_statement_report_page_displayed(report_name);
        management_reports.filter_by_last_30_days();
        management_reports.verify_report_displayed();

        navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business6_id']);
        transactions_page.move_to_trash(amount);
        navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business6_id'])
		transactions_trash_page.verify_trash_page_displayed();
		transactions_trash_page.delete_transaction(data['email'], data['password'], data['test_business6_id'], amount);
    })


})