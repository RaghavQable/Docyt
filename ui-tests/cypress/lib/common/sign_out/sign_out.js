const { navigate_to } = require("../navigation/navigation");
const { verify_client_dashboard_page_displayed } = require("../../phoenix/dashboard/dashboard");
const { verify_login_page_displayed } = require('../login/login');

function sign_out() {
	navigate_to('BUSINESS_DASHBOARD');
	verify_client_dashboard_page_displayed();
	cy.div_by_containing_class('header__userpic').click({force: true});
	cy.button_by_containing_class('sign-out-js').click({force: true});
	verify_login_page_displayed();
}

module.exports = {
	sign_out
};
