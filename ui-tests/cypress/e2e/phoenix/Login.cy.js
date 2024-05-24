const login_page = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const data = Cypress.env('phoenix')

describe("Login page", () => {
    it("C91749: should allow valid user to login successfully", { tags: '@smoke'}, () => {

        login_page.login(data['email'], data['password']);
        dashboard_page.verify_client_dashboard_page_displayed();
    })

    it("should not allow invalid user to login", { tags: '@smoke'}, () => {

        login_page.login("incorrect_user@docyt.com", "incorrect_password");
        login_page.verify_error_message_displayed("Provided combination of email and password is invalid.");
    })
  })