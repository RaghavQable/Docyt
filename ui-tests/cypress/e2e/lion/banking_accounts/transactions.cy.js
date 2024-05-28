const login_page  = require("../../../lib/common/login/login");
const transaction_page = require("../../../lib/lion/banking_accounts/transactions")
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const time_helper = require("../../../utils/time_helper");
const number_helper = require("../../../utils/number_helper");

const data = Cypress.env('lion');

describe("Banking Account / Transactions", () => {
	it("C305218: Automatic verification with pattern (Auto Categorization)", () => {
		const Description_name = number_helper.generateRandomString(10);
		const Trans_type = 'Deposit';
		const current_date = time_helper.get_current_date_of_month();
		const amount = number_helper.get_random_number(100000);

		const alert_title = 'Success'
        const alert_message = 'Move to Trash successfully'

        const transaction = {
            "Date": current_date,
            "Description": Description_name,
            "Type": Trans_type,
			"Amount": amount
        }

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business1_id'])
        transaction_page.verify_Transactions_page();
		transaction_page.Add_transaction_flow(transaction);
		transaction_page.verify_add_transaction_in_progress();
		transaction_page.click_on_close_button();
		transaction_page.search_transaction(Description_name)
		transaction_page.delete_transaction()
		transaction_page.verify_alert_message(alert_title,alert_message)
	})

})