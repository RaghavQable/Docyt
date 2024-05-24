const login_page  = require("../../lib/common/login/login");
const { navigate_to_business_path } = require("../../lib/common/navigation/navigation");
const uncategorized_transactions_page  = require("../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page  = require("../../lib/lion/transactions/expenses_transactions");
const income_transactions_page  = require("../../lib/lion/transactions/income_transactions");
const uncleared_transactions_page = require("../../lib/lion/transactions/uncleared_transactions");
const data = Cypress.env('lion');

const amount_1 = 100;
const amount_2 = 200;
const amount_3 = 50

describe("Reconciliation Center / Transactions", () => {
	it("C13037, C73068, C2244: Verify expense transaction and View Expense transaction detail, Unverified a transaction", () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS", data['test_business1_id'])
		uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
		uncategorized_transactions_page.expense_categorize_transaction(amount_1);

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business1_id']);
		expenses_transactions_page.verify_expense_transaction_details(amount_1);
		expenses_transactions_page.uncategorize_transaction(amount_1);
	})

	it("C121284: Bulk Update Transactions in Unverified transactions", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS", data['test_business4_id'])
		uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
		uncategorized_transactions_page.bulk_expense_categorize_transactions();

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business4_id']);
		expenses_transactions_page.verify_expenses_transactions_page_displayed();
		expenses_transactions_page.uncategorize_transaction(amount_1);
		expenses_transactions_page.uncategorize_transaction(amount_2);
	})

	it("C13046, C2244: Verify income transaction (positive) and Unverified a transaction", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS", data['test_business1_id'])
		uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
		uncategorized_transactions_page.income_categorize_transactions(amount_3);

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME', data['test_business1_id']);
		income_transactions_page.verify_income_transactions_page_displayed();
		income_transactions_page.click_first_transaction_item();
		income_transactions_page.verify_income_transaction_details();
		income_transactions_page.uncategorize_transaction();
	})

	it("C2958: Manual matching - Unmatched documents", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_UNCLEARED_DOCUMENTS", data['test_business5_id'])
		uncleared_transactions_page.verify_uncleared_documents_page_displayed();
		uncleared_transactions_page.match_transactions();

		navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business5_id']);
		expenses_transactions_page.verify_expenses_transactions_page_displayed();
		expenses_transactions_page.uncategorize_transaction(50);
	})
})