const login_page  = require("../../../lib/common/login/login");
const csv_import_page  = require("../../../lib/phoenix/bank_accounts/csv_import");
const data = Cypress.env('phoenix');

describe("Bank Accounts / CSV import", () => {
	it("C15308: Upload CSV", { tags: '@smoke'}, () => {

		const file = data['transaction1']['file']

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_CSV_IMPORT", data['test_business2_id'])
		csv_import_page.verify_csv_import_page_displayed();
		csv_import_page.select_bank_account();
		csv_import_page.upload_csv(file);
		csv_import_page.verify_csv_uploaded();
		csv_import_page.delete_csv();
	})
})