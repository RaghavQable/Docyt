
const login_page  = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const data = Cypress.env('phoenix');

describe("Dashboard", () => {
	it("C79: Show business list", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'DASHBOARD_ACCOUNTING')
		dashboard_page.verify_business_dashboard_accounting_page_displayed();

		dashboard_page.verify_business_exists(data['test_business1_name']) // shows the business to admin
		dashboard_page.verify_business_not_exist(data['test_client_business1_name']) // does not show the client business
		dashboard_page.verify_business_exists(data['test_business3_name']) // shows the business to the employee who has role
		dashboard_page.verify_business_not_exist(data['test_business7_name']) // does not show the business to the employee without role
	})

	it("C272010: Sort Clients List", { tags: '@smoke'}, () => {

		login_page.login(data['email'], data['password'])
		dashboard_page.verify_client_dashboard_page_displayed();

		dashboard_page.verify_sort_by_client_name(data['test_client_business1_name'])
		dashboard_page.click_table_heading_column('Client')
		dashboard_page.verify_sort_by_client_name(data['test_client_business2_name'])
	})
})