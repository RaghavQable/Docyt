const login_page = require("../../../lib/common/login/login");
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const transaction_page = require("../../../lib/lion/banking_accounts/transactions")
const uncategorized_transactions_page = require("../../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page = require("../../../lib/lion/transactions/expenses_transactions");
const income_transactions_page = require("../../../lib/lion/transactions/income_transactions");
const uncleared_transactions_page = require("../../../lib/lion/transactions/uncleared_transactions");
const time_helper = require("../../../utils/time_helper");
const number_helper = require("../../../utils/number_helper");
const data = Cypress.env('lion');


describe("Reconciliation Center / Transactions List", () => {
    it("C12978: Filter Expenses", () => {

        const Description_name = number_helper.generateRandomString(10);
        const Withdrawal_Trans_type = 'Withdrawal';
        const current_date = time_helper.get_current_date_of_month();
        const amount = number_helper.get_random_number(100000);

        const Withdrawal_transaction = {
            "Date": current_date,
            "Description": Description_name,
            "Type": Withdrawal_Trans_type,
            "Amount": amount
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business1_id'])
        transaction_page.Add_transaction_flow(Withdrawal_transaction);
        transaction_page.verify_add_transaction_in_progress();
        transaction_page.click_on_close_button();
        transaction_page.search_transaction(Description_name)
        transaction_page.click_on_transaction_more_option();
        transaction_page.go_to_reconciliation_center();
        transaction_page.verify_transaction_present_in_reconciliation_center(Description_name)
        transaction_page.click_on_transaction_in_reconciliation_center(Description_name)

        transaction_page.get_transaction_type_and_verify('Expense')
        transaction_page.select_vendor(data['vendor1']['name'])


        //By Vendor
        navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.verify_expenses_transactions_page_displayed();
        expenses_transactions_page.filter_expenses_by_vendor(data['vendor1']['name'])
        transaction_page.click_on_reset_filters();

        //By Category
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.verify_expenses_transactions_page_displayed();
        expenses_transactions_page.filter_expenses_by_category('Fuel');
        transaction_page.click_on_reset_filters();

        //By Account Type
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.filter_expenses_by_account_type();
        transaction_page.click_on_reset_filters();

        //By From Date
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.filter_expenses_by_from_date();
        transaction_page.click_on_reset_filters();

        //By To Date
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.filter_expenses_by_to_date();
        transaction_page.click_on_reset_filters();

        //By Description
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.filter_expenses_by_description(Description_name);
        transaction_page.click_on_reset_filters();

        //By Amount
        transaction_page.search_transaction_on_income_page(Description_name)
        expenses_transactions_page.filter_expenses_by_amount2(amount);
        transaction_page.click_on_reset_filters();


        navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business1_id'])
        transaction_page.search_transaction(Description_name)
        transaction_page.delete_transaction(Description_name)

    })

    it("C12979: Filter Incomes", () => {
        const Description_name = number_helper.generateRandomString(10);
		const deposit_Trans_type = 'Deposit';
		const current_date = time_helper.get_current_date_of_month();
		const amount = number_helper.get_random_number(100000);

        const deposit_transaction = {
            "Date": current_date,
            "Description": Description_name,
            "Type": deposit_Trans_type,
			"Amount": amount
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business1_id'])
        transaction_page.verify_Transactions_page();
		transaction_page.Add_transaction_flow(deposit_transaction);
		transaction_page.verify_add_transaction_in_progress();
		transaction_page.click_on_close_button();
		transaction_page.search_transaction(Description_name)	
        transaction_page.click_on_transaction_more_option();
        transaction_page.go_to_reconciliation_center();
		transaction_page.verify_transaction_present_in_reconciliation_center(Description_name)
		transaction_page.click_on_transaction_in_reconciliation_center(Description_name)
	
		transaction_page.get_transaction_type_and_verify('Income')
		transaction_page.select_category_flow('Test')

        navigate_to_business_path("RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME", data['test_business1_id'])
        income_transactions_page.verify_income_transactions_page_displayed();

        //By Account Type
        transaction_page.search_transaction_on_income_page(Description_name)
        income_transactions_page.filter_incomes_by_account_type();
        transaction_page.click_on_reset_filters();


        //By From Date
        transaction_page.search_transaction_on_income_page(Description_name)
        income_transactions_page.filter_incomes_by_from_date();
        transaction_page.click_on_reset_filters();


        //By To Date
        transaction_page.search_transaction_on_income_page(Description_name)
        income_transactions_page.filter_incomes_by_to_date();
        transaction_page.click_on_reset_filters();

        //By Description
        income_transactions_page.filter_incomes_by_description(Description_name);
        transaction_page.click_on_reset_filters();

        //By Amount
        transaction_page.search_transaction_on_income_page(Description_name)
        income_transactions_page.filter_incomes_by_amount2(amount);
        transaction_page.click_on_reset_filters();


        navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business1_id'])
        transaction_page.search_transaction(Description_name)
        transaction_page.delete_transaction(Description_name)

    })


})

