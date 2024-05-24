const login_page  = require("../../../lib/common/login/login");
const accounts_page  = require("../../../lib/phoenix/bank_accounts/accounts");
const archived_accounts_page  = require("../../../lib/phoenix/bank_accounts/archived_accounts");
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const data = Cypress.env('phoenix');

const BANK_ACCOUNT_TYPE = 'Bank Account';
const CREDIT_CARD_TYPE = 'Credit Card'

describe("Bank Accounts / Accounts", () => {
	it("C6008, C6012: Create a new Bank Account manually and Archive / Unarchive an account", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_ACCOUNTS", data['test_business5_id'])
		accounts_page.verify_blank_accounts_page_displayed();

		const account_data = accounts_page.manual_account_data(BANK_ACCOUNT_TYPE);
		accounts_page.add_bank_account_manually(account_data);
		accounts_page.verify_created_new_account(account_data);
		accounts_page.archive_account(account_data);
		accounts_page.go_to_archived_account_page();
		archived_accounts_page.verify_account_is_archived(account_data);
		archived_accounts_page.unarchive_account();
		archived_accounts_page.go_to_active_accounts_page();
		accounts_page.disconnect_account();
	})

	it("C96: Create a new Bank Account via Plaid", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_ACCOUNTS", data['test_business5_id'])
		accounts_page.verify_blank_accounts_page_displayed();

		const account_data = accounts_page.manual_account_data(BANK_ACCOUNT_TYPE);
		accounts_page.add_auto_account_with_financial_institution(account_data, BANK_ACCOUNT_TYPE);
		accounts_page.verify_created_new_account(account_data, 'Auto');
		accounts_page.disconnect_account();
	})

	it("C103422: Create a new Credit Card via Plaid", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_ACCOUNTS", data['test_business5_id'])
		accounts_page.verify_blank_accounts_page_displayed();

		const account_data = accounts_page.manual_account_data(CREDIT_CARD_TYPE);
		accounts_page.add_auto_account_with_financial_institution(account_data, CREDIT_CARD_TYPE);
		accounts_page.verify_created_new_account(account_data, 'Auto');
		accounts_page.disconnect_account();
	})
})