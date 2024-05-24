const login_page  = require("../../../lib/common/login/login");
const sign_out_page = require('../../../lib/common/sign_out/sign_out');
const business_employees_page  = require("../../../lib/phoenix/business_settings/business_employee");
const client_business_employee_page = require('../../../lib/phoenix/my_clients/business_employee');
const invitationPage = require('../../../lib/phoenix/invitation');
const data = Cypress.env('phoenix');

const EMPLOYEE = 'Employee';
const BUSINESS_ADMIN = 'Business Admin';

describe("Business Settings", () => {
	it("C31956: Add an employee", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_settings_page(data['email'], data['password'], data['test_business4_id'], 4);
		business_employees_page.verify_business_employees_page_displayed(data['test_business4_name']);
		business_employees_page.add_new_member(data['tester5_name'], data['tester5_email'], EMPLOYEE);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester5_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_business4_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to_settings_page(data['email'], data['password'], data['test_business4_id'], 4);
		business_employees_page.verify_business_employees_page_displayed(data['test_business4_name']);
		business_employees_page.filter_by_name(data['tester5_name']);
		business_employees_page.verify_new_member_added(data['tester5_name'], EMPLOYEE);
		client_business_employee_page.remove_from_business();
	})

	it("C31957: Add a business admin", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_settings_page(data['email'], data['password'], data['test_business5_id'], 4);
		business_employees_page.verify_business_employees_page_displayed(data['test_business5_name']);
		business_employees_page.add_new_member(data['tester2_name'], data['tester2_email'], BUSINESS_ADMIN);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to(data['tester2_email'], data['password'], 'MY_NOTIFICATIONS');
		invitationPage.accept_invitation(data['test_business5_name']);
		sign_out_page.sign_out();
		cy.reload(true);
		login_page.login_and_navigate_to_settings_page(data['email'], data['password'], data['test_business5_id'], 4);
		business_employees_page.verify_business_employees_page_displayed(data['test_business5_name']);
		business_employees_page.filter_by_name(data['tester2_name']);
		business_employees_page.verify_new_member_added(data['tester2_name'], BUSINESS_ADMIN);
		client_business_employee_page.remove_from_business();
	})
})