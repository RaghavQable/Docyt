const login_page  = require("../../../lib/common/login/login");
const transaction_page = require("../../../lib/lion/banking_accounts/transactions")
const transactions_phoenix = require("../../../lib/phoenix/bank_accounts/transactions")
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const time_helper = require("../../../utils/time_helper");
const number_helper = require("../../../utils/number_helper");

const data = Cypress.env('lion');

describe("Banking Account / Transactions", () => {
	it("C305218: Automatic verification with pattern (Auto Categorization)", () => {
		const Description_name = number_helper.generateRandomString(10);
		const Description_name_new = number_helper.generateRandomString(10);
		const deposit_Trans_type = 'Deposit';
		const Withdrawal_Trans_type = 'Withdrawal';
		const current_date = time_helper.get_current_date_of_month();
		const amount = number_helper.get_random_number(100000);
        const alert_title = 'Success'
        const alert_message = 'Move to Trash successfully'

        const deposit_transaction = {
            "Date": current_date,
            "Description": Description_name,
            "Type": deposit_Trans_type,
			"Amount": amount
        }
		
        const Withdrawal_transaction = {
            "Date": current_date,
            "Description": Description_name_new,
            "Type": Withdrawal_Trans_type,
			"Amount": amount
        }

		// for deposit >> Income scenario

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business1_id'])
        transaction_page.verify_Transactions_page();
		transaction_page.Add_transaction_flow(deposit_transaction);
		transaction_page.verify_add_transaction_in_progress();
		transaction_page.click_on_close_button();
		transactions_phoenix.wait_for_add_transaction_modal_to_disappear();
		transaction_page.search_transaction(Description_name)	
        transaction_page.click_on_transaction_more_option();
        transaction_page.go_to_reconciliation_center();
		transaction_page.verify_transaction_present_in_reconciliation_center(Description_name)
		transaction_page.click_on_transaction_in_reconciliation_center(Description_name)
	
		transaction_page.get_transaction_type_and_verify('Income')
		transaction_page.select_category_flow('Test')

		navigate_to_business_path('RECONCILIATION_CENTER_ALL_TRANSACTIONS',data['test_business1_id'])
		transaction_page.search_transaction_on_all_transaction_page(Description_name)
		transaction_page.verify_transaction_present_in_all_transaction_page(Description_name)

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME',data['test_business1_id'])
		transaction_page.search_transaction_on_income_page(Description_name)
		transaction_page.verify_transaction_present_in_income_page(Description_name)
	

		// for withdrawal >> expanse scenario

		navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS',data['test_business1_id'])

		transaction_page.Add_transaction_flow(Withdrawal_transaction);
		transaction_page.verify_add_transaction_in_progress();
		transaction_page.click_on_close_button();
		transactions_phoenix.wait_for_add_transaction_modal_to_disappear();
		transaction_page.search_transaction(Description_name_new)	
        transaction_page.click_on_transaction_more_option();
        transaction_page.go_to_reconciliation_center();
		transaction_page.verify_transaction_present_in_reconciliation_center(Description_name_new)
		transaction_page.click_on_transaction_in_reconciliation_center(Description_name_new)
	
		transaction_page.get_transaction_type_and_verify('Expense')
		transaction_page.select_vendor(data['vendor2']['name'])

		navigate_to_business_path('RECONCILIATION_CENTER_ALL_TRANSACTIONS',data['test_business1_id'])
		transaction_page.search_transaction_on_all_transaction_page(Description_name_new)
		transaction_page.verify_transaction_present_in_all_transaction_page(Description_name_new)

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES',data['test_business1_id'])
		transaction_page.search_transaction_on_income_page(Description_name_new)
		transaction_page.verify_transaction_present_in_Expense_page(Description_name_new)

		navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS',data['test_business1_id'])
		transaction_page.search_transaction(Description_name)	
		transaction_page.delete_transaction(Description_name)
		transaction_page.verify_alert_message(alert_title,alert_message)
		transaction_page.search_transaction(Description_name_new)
		transaction_page.delete_transaction(Description_name_new)

	})

})