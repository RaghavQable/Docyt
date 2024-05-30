const login_page  = require("../../../lib/common/login/login");
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const uncategorized_transactions_page  = require("../../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page  = require("../../../lib/lion/transactions/expenses_transactions");
const income_transactions_page  = require("../../../lib/lion/transactions/income_transactions");
const uncleared_transactions_page = require("../../../lib/lion/transactions/uncleared_transactions");
//time_helper = require("../../../utils/time_helper");
//const number_helper = require("../../../utils/number_helper");
const data = Cypress.env('lion');


describe("Reconciliation Center / Transactions List", () => {
	it("C12978: Filter Expenses", ()=>
        {
            //By Vendor
            login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_expenses_by_vendor(data['vendor1']['name'])

            //By Category
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_category();

            //By Account Type
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_account_type();

            //By From Date
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_from_date();

            //By To Date
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_to_date();

            //By Description
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_description();

            //By Amount
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            expenses_transactions_page.filter_expenses_by_amount2();

        })

    it("C12979: Filter Incomes", ()=>
     {
            //By Vendor
            login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_expenses_by_vendor(data['vendor1']['name']);
    
            //By Account Type
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_incomes_by_account_type();
    
            //By From Date
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_incomes_by_from_date();
    
            //By To Date
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_incomes_by_to_date();
    
            //By Description
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_incomes_by_description();
    
            //By Amount
            navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
            income_transactions_page.verify_income_transactions_page_displayed();
            income_transactions_page.filter_incomes_by_amount2();
    
            })    
    
    
    })

