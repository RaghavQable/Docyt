const login_page  = require("../../../lib/common/login/login");
const transactions_page  = require("../../../lib/phoenix/bank_accounts/transactions");
const trash_page = require("../../../lib/phoenix/bank_accounts/trash");
const uncategorized_transactions_page = require("../../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page = require("../../../lib/lion/transactions/expenses_transactions");
const lion_api = require("../../../lib/api/lion");

const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const data = Cypress.env('lion');

const amounts = [(Math.random() * 100).toFixed(2), (Math.random() * 100).toFixed(2), (Math.random() * 100).toFixed(2)];

describe("Reconciliation Center / Transactions", () => {
	it("C27532: Multiple vendors with the same transaction pattern", () => {
		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business2_id'])
		transactions_page.verify_transactions_page_displayed();
    // add 2 transactions with same pattern
    transactions_page.add_transactions(amounts.slice(0, 2), data['credit_cards']['test2_business_credit_card'])

    navigate_to_business_path('RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS', data['test_business2_id']);
    uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
    // verify 2 transactions with the other vendor and category
    uncategorized_transactions_page.expense_categorize_transactions(
      amounts.slice(0, 2),
      [data['vendor1']['name'], data['vendor2']['name']]
    )

    navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business2_id']);
		expenses_transactions_page.verify_expenses_transactions_page_displayed();
    expenses_transactions_page.verify_expense_transactions_details(amounts.slice(0, 2))

    // update index
    lion_api.update_index(data['test_business2_id']);

    navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business2_id']);
    transactions_page.verify_transactions_page_displayed();
    // add transaction with same pattern
    transactions_page.add_transaction(transactions_page.transaction_data(amounts[2], data['credit_cards']['test2_business_credit_card']));

    // verify transaction is not verified
    cy.reload();
    transactions_page.verify_transaction_type(amounts[2], 'Uncategorized');

    // remove transactions
    transactions_page.move_to_trash_transactions(amounts);
		navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business2_id'])
		trash_page.verify_trash_page_displayed();
    trash_page.delete_transactions(data['email'], data['password'], data['test_business2_id'], amounts);
	})
})