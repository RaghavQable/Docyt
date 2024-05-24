const common_api = require("../../api/common")
const phoenix_api = require("../../api/phoenix");

function verify_trash_page_displayed() {
	cy.h2_by_text('Transactions').should('be.visible');
	cy.wait(2000);
	cy.wait_until_disappear_div_loading_spinner();
}

function delete_transaction(email, password, business_id, amount) {
	common_api.get_auth_token(email, password).then((token) => {
		phoenix_api.get_transaction_service_documents(token, business_id, amount, true).then((res) => {
			const transaction_id = res[0]['id']
			if (transaction_id === undefined) return;

			phoenix_api.delete_transaction_permanently(token, transaction_id)
			cy.wait(1000);
		})
	})
}

function delete_transactions(email, password, business_id, amounts) {
	amounts.forEach((amount) => {
		delete_transaction(email, password, business_id, amount);
	});
}

module.exports = {
	verify_trash_page_displayed,
	delete_transaction,
	delete_transactions
}