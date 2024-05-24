const login_page  = require("../../../lib/common/login/login");
const business_billings_page  = require("../../../lib/phoenix/business_settings/client_business_billings");
const data = Cypress.env('phoenix');

describe("Business Settings", () => {
	it("C37130: Add New Credit Card", { tags: '@smoke'}, () => {

		const credit_card_info = {
			"card_number": '4242 4242 4242 4242',
			"expiration_date": '12 / 40',
			"cvc": '123',
			"zip_code": '95051',
		}

		login_page.login_and_navigate_to_client_business_settings_page(data['email'], data['password'], data['test_client_business2_id'], data['test_business2_id'], 9);
		business_billings_page.verify_business_billing_page_displayed(data['test_client_business2_name']);
		business_billings_page.add_new_credit_card(credit_card_info);
	})
})