const login_page = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const data = Cypress.env('phoenix')

describe("Login page", () => {
    it("Valid user can login successfully", () => {

        login_page.login(data['email'], data['password']);
        dashboard_page.verify_client_dashboard_page_displayed();
    })
  })