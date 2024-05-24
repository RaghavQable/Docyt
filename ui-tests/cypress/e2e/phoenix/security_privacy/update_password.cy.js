const login_page = require("../../../lib/common/login/login");
const security_privacy_page = require("../../../lib/phoenix/security_privacy/security_privacy");
const update_password_page = require("../../../lib/phoenix/security_privacy/update_password");
const data = Cypress.env('phoenix');

const NEW_PASSWORD = 'Docyt@2024';

describe("Security and Privacy", () => {
	it("C2956: Update password via email", { tags: '@smoke'},() => {

		login_page.login_and_navigate_to(data['tester4_email'], data['password'], 'SETTINGS_SECURITY_AND_PRIVACY')
		security_privacy_page.verify_security_privacy_page_displayed();
		security_privacy_page.click_update_password();

		// verify invalid password
		update_password_page.set_current_password('test123');
		update_password_page.verify_invalid_password();
		// set current password
		update_password_page.set_current_password(data['password']);
		update_password_page.set_security_code();
		update_password_page.set_new_password(NEW_PASSWORD);

		// revert password
		login_page.login_and_navigate_to(data['tester4_email'], NEW_PASSWORD, 'SETTINGS_SECURITY_AND_PRIVACY');
		security_privacy_page.verify_security_privacy_page_displayed();
		security_privacy_page.click_update_password();
		update_password_page.set_current_password(NEW_PASSWORD);
		update_password_page.set_security_code();
		update_password_page.set_new_password(data['password']);
	})
})