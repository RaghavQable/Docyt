const team_management_page = require('./team_management');

function verify_business_page_displayed(business_name) {
	cy.wait_until_visible_span_by_text('Team Management')
	cy.wait_until_visible_span_by_text(business_name)
}

function filter_by_name(name) {
	cy.input_by_containing_class('business-filter-js').clear().type(name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait_until_visible_label_by_text(name);
	cy.wait(1000);
}

function active_business(business_name) {
	filter_by_name(business_name);
	cy.get('span.inactive:contains("Inactive")').if()
    .then(() => {
			cy.log("Business is Inactive status"); 
		}).else().then(() => {
			team_management_page.remove_from_business();
			cy.reload();
			filter_by_name(business_name);
    });
	cy.button_by_containing_class('add-busines-js').click();
	cy.wait_until_visible_span_by_containing_class('sent-invite')
}

function verify_new_member_added(name, type) {
	filter_by_name(name)
	cy.span_by_containing_class('sel-business-role-js').should('have.text', type);
}

function change_business_role(type) {
	cy.div_by_id('business-role-dropdown-btn').click();
	cy.any_by_text(type).click();
	cy.span_by_containing_class('sel-business-role-js').should('have.text', type);
}

module.exports = {
	verify_business_page_displayed,
	active_business,
	verify_new_member_added,
	change_business_role
}
