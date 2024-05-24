const login_page  = require("../../../lib/common/login/login");
const transactions_page  = require("../../../lib/phoenix/bank_accounts/transactions");
const trash_page = require("../../../lib/phoenix/bank_accounts/trash");
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const data = Cypress.env('phoenix');

const amount_1 = (Math.random() * 100).toFixed(2);
const amount_2 = (Math.random() * 100).toFixed(2);

describe("Bank Accounts / Transactions", () => {
	it("C84786: Filter Transactions by Amount", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business4_id'])
		transactions_page.verify_transactions_page_displayed();

		transactions_page.add_transaction(transactions_page.transaction_data(amount_1));
		transactions_page.add_transaction(transactions_page.transaction_data(amount_2));
		transactions_page.verify_filtered_by_amount(amount_1, amount_2);
		transactions_page.move_to_trash(amount_1);
		transactions_page.move_to_trash(amount_2);

		navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business4_id'])
		trash_page.verify_trash_page_displayed();
		trash_page.delete_transaction(data['email'], data['password'], data['test_business4_id'], amount_1);
		trash_page.delete_transaction(data['email'], data['password'], data['test_business4_id'], amount_2);
	})
})