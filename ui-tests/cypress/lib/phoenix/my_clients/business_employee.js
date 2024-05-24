function go_to_business_employees_page(client_name, business_name, user_name, need_filter) {
	if (need_filter) {
		cy.div_by_containing_class('business-dropdown-wrapper').click();
		cy.any_by_text(business_name).click();
	}
	cy.span_by_text(client_name).click();
	cy.span_by_text(user_name).click();
	cy.wait_until_disappear_div_loading_spinner();
	cy.a_by_text("BUSINESS EMPLOYEES").click();
	verify_business_employee_page_displayed(client_name)
}

function verify_business_employee_page_displayed(client_name) {
	cy.wait_until_visible_span_by_text('Client Management')
	cy.wait_until_visible_span_by_text(client_name)
}

function add_new_employee(name, email) {
	cy.get(`span.nav-item-text:contains("${name}")`).if()
    .then(() => {
			remove_from_business();
			cy.reload();
		}).else().then(() => {
			cy.log("Business Employ does not exist"); 
    });
	cy.a_by_text('Edit').click();
	cy.input_by_placeholder('First Name  Middle  Last').clear().type(name);
	cy.input_by_placeholder('Email').clear().type(email);
	cy.button_by_id('create-invite').click();
	cy.wait_until_visible_h4_by_text('Add New Member: Select Businesses');
}

function select_member_type(type) {
	cy.get('.file-category.sel-type-js').select(type)
	cy.span_by_text('Save').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function filter_by_name(business_name) {
	cy.input_by_containing_class('member-filter-js').clear().type(business_name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait(1000);
}

function verify_new_member_added(business_name, type) {
	filter_by_name(business_name)
	cy.span_by_containing_class('sel-business-role-js').should('have.text', type);
}

function remove_from_business() {
	cy.div_by_containing_class('team-removepic').click({force: true});
	cy.get('.invite-notify-panel').if()
		.then(() => {
			retract_invitation();
		}).else().then(() => {
			cy.button_by_containing_class('remove-business-js').click({force: true});
			cy.wait_until_visible_h4_by_text('Remove From Business');
			cy.button_by_id('delete-btn').click();
			cy.wait_until_disappear_div_loading_spinner();
			cy.wait(1000);
		})
}

function retract_invitation() {
	cy.button_by_containing_class('retract-invite-js').click({force: true});
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	verify_business_employee_page_displayed,
	add_new_employee,
	select_member_type,
	verify_new_member_added,
	remove_from_business,
	go_to_business_employees_page,
	retract_invitation
}
