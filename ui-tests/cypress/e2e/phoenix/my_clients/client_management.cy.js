const login_page  = require("../../../lib/common/login/login");
const sign_out_page = require('../../../lib/common/sign_out/sign_out');
const business_employee_page = require("../../../lib/phoenix/my_clients/business_employee");
const accounting_team_page = require("../../../lib/phoenix/my_clients/accounting_team");
const invitationPage = require('../../../lib/phoenix/invitation');
const data = Cypress.env('phoenix');

const EMPLOYEE = 'Employee';
const BUSINESS_ADMIN = 'Business Admin';

const STAFF = 'Staff (Hidden from clients)';
const ACCOUNT_MANAGER = 'Account Manager';
const CONTROLLER_TITLE = 'Controller';

describe("Client Management", () => {
	it("C7605: Add a Employee", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_CLIENT_MANAGEMENT');
		business_employee_page.go_to_business_employees_page(data['test_client_business1_name'], data['test_business1_name'], data['user_name'], false);
		business_employee_page.add_new_employee(data['tester3_name'], data['tester3_email']);
		business_employee_page.select_member_type(EMPLOYEE)
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester3_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_client_business1_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_CLIENT_MANAGEMENT');
		business_employee_page.go_to_business_employees_page(data['test_client_business1_name'], data['test_business1_name'], data['user_name'], false);
		business_employee_page.verify_new_member_added(data['tester3_name'], EMPLOYEE);
		business_employee_page.remove_from_business();
	})

	it("C7606: Add Business Admin", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_CLIENT_MANAGEMENT');
		business_employee_page.go_to_business_employees_page(data['test_client_business2_name'], data['test_business2_name'], data['user_name'], true);
		business_employee_page.add_new_employee(data['tester6_name'], data['tester6_email']);
		business_employee_page.select_member_type(BUSINESS_ADMIN)
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester6_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_client_business2_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_CLIENT_MANAGEMENT');
		business_employee_page.go_to_business_employees_page(data['test_client_business2_name'], data['test_business2_name'], data['user_name'], false);
		business_employee_page.verify_new_member_added(data['tester6_name'], BUSINESS_ADMIN);
		business_employee_page.remove_from_business();
	})

	it("C7604 C7610:Assign Team Member and Edit Client Role", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to(data['email'], data['password'], 'SETTINGS_CLIENT_MANAGEMENT');
		accounting_team_page.go_to_accounting_team_page(data['test_client_business2_name'], data['test_business2_name'], data['user_name']);
		accounting_team_page.assign_team_member(data['tester1_name']);
		accounting_team_page.verify_member_added(data['tester1_name'], STAFF);
		accounting_team_page.update_role(ACCOUNT_MANAGER);
		accounting_team_page.update_title(CONTROLLER_TITLE);
		accounting_team_page.verify_role_and_title_updated(ACCOUNT_MANAGER, CONTROLLER_TITLE);
		accounting_team_page.remove_from_client();
	})
})