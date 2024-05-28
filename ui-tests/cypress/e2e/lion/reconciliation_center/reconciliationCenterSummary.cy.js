const login_page  = require("../../../lib/common/login/login");
const summary_page  = require("../../../lib/lion/reconciliation_center/summary");
const lion_api = require("../../../lib/api/lion");

const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const data = Cypress.env('lion');

describe("Reconciliation Center / summary", () => {
	it("C29335: Summary - this test Case will be remove after Month-End Close project released", () => {
        const Uncategorized = 'Uncategorized Transactions';
        const Uncleared = 'Uncleared Documents';
        const Unmatched = 'Unmatched Transfers';
        const Undocumented = 'Undocumented Transactions';

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "RECONCILIATION_CENTER_SUMMARY", data['test_business1_id'])
		summary_page.verify_summary_Uncategorized_Transactions_tab(Uncategorized)
        summary_page.verify_summary_Uncleared_Documents_tab(Uncleared)
        summary_page.verify_summary_Unmatched_Transfers_tab(Unmatched)
        summary_page.verify_summary_Undocumented_Transactions_tab(Undocumented)
	})

})