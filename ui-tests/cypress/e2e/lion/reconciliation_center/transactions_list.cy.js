const login_page  = require("../../../lib/common/login/login");
const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const uncategorized_transactions_page  = require("../../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page  = require("../../../lib/lion/transactions/expenses_transactions");
const income_transactions_page  = require("../../../lib/lion/transactions/income_transactions");
const uncleared_transactions_page = require("../../../lib/lion/transactions/uncleared_transactions");
const data = Cypress.env('lion');


describe("Reconciliation Center / Transactions List", () => {
	it("C12978: Filter Expenses", ()=>
        {
            login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES", data['test_business1_id'])
            expenses_transactions_page.verify_expenses_transactions_page_displayed();
            
        })
    
    
    })

