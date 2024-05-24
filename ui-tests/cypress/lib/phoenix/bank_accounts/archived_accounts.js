function verify_account_is_archived(data) {
	cy.contains('.payment-account-name', data['account_name'], { timeout: 30000 }).should('exist');
	cy.contains('.payment-account-no', data['last4']).should('exist');
}

function unarchive_account() {
	cy.a_by_containing_class('btn-payment-account-dropdown').click();
	cy.a_by_containing_class('unarchive-account-btn', { timeout: 30000 }).click();
	cy.h4_by_text("Unarchive Account", { timeout: 30000 }).should('be.visible');
	cy.button_by_containing_text('Proceed').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function go_to_active_accounts_page() {
	cy.a_by_containing_text('ACTIVE').click();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_account_is_archived,
	unarchive_account,
	go_to_active_accounts_page,
}