const login_page  = require("../../../lib/common/login/login");
const sign_out_page = require('../../../lib/common/sign_out/sign_out');
const team_management_page  = require("../../../lib/phoenix/my_team/team_management");
const business_management_page  = require("../../../lib/phoenix/my_team/business_management");
const client_management_page  = require("../../../lib/phoenix/my_team/client_management");
const invitationPage = require('../../../lib/phoenix/invitation');
const data = Cypress.env('phoenix');

const EMPLOYEE = 'Employee';
const BUSINESS_ADMIN = 'Business Admin';

const STAFF = 'Staff (Hidden from clients)'
const ACCOUNT_MANAGER = 'Account Manager'

describe("Team Management", () => {
	it("C32: Add a new Employee", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'SETTINGS_MY_TEAM');
		team_management_page.verify_team_management_page_displayed();
		team_management_page.add_new_member(data['tester6_name'], data['tester6_email']);
		team_management_page.select_member_type(EMPLOYEE)
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester6_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_business5_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'SETTINGS_MY_TEAM');
		team_management_page.verify_team_management_page_displayed();
		team_management_page.verify_new_member_added(data['tester6_name'], EMPLOYEE);
		team_management_page.remove_from_business();
	})

	it("C1608: Add a new Business Admin", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'SETTINGS_MY_TEAM');
		team_management_page.verify_team_management_page_displayed();
		team_management_page.add_new_member(data['tester6_name'], data['tester6_email']);
		team_management_page.select_member_type(BUSINESS_ADMIN)
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester6_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_business5_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'SETTINGS_MY_TEAM');
		team_management_page.verify_team_management_page_displayed();
		team_management_page.verify_new_member_added(data['tester6_name'], BUSINESS_ADMIN);
		team_management_page.remove_from_business();
	})

	it("C4449: Add a Business", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_MY_TEAM', `/${data['tester5_id']}?type=business`);
		business_management_page.verify_business_page_displayed(data['test_business5_name']);
		business_management_page.active_business(data['test_business6_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_business6_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_MY_TEAM', `/${data['tester5_id']}?type=business`);
		business_management_page.verify_business_page_displayed(data['test_business5_name']);
		business_management_page.verify_new_member_added(data['test_business6_name'], EMPLOYEE);
		business_management_page.change_business_role(BUSINESS_ADMIN)
		team_management_page.remove_from_business();
	})

	it("C4703, C4705: Add Client and Change roles of client", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_MY_TEAM', `/${data['tester5_id']}?type=client`);
		client_management_page.verify_client_page_displayed(data['tester5_name']);
		client_management_page.add_client(data['test_client_business2_name']);
		cy.reload(true);
		client_management_page.verify_new_client_added(data['test_client_business2_name'], STAFF);
		client_management_page.change_client_role(ACCOUNT_MANAGER)
		client_management_page.remove_client(data['test_client_business2_name']);
	})

	it("C319964: Search Employees by Business", () => {

		const employee_name = data['user_name']
		const employee_name_5 = data['tester5_name']
		const business_name_5 = data['test_business5_name']
		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'SETTINGS_MY_TEAM');
		team_management_page.verify_team_management_page_displayed();
		team_management_page.filter_by_name(employee_name_5)
		team_management_page.verify_employee_displayed_in_table(employee_name_5, 1)
		team_management_page.clear_filters()
		team_management_page.filter_by_business_name(business_name_5)
		team_management_page.verify_employee_displayed_in_table(employee_name_5, 2)
		team_management_page.verify_employee_displayed_in_table(employee_name, 2)
	})

})