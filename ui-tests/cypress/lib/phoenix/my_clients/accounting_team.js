function go_to_accounting_team_page(client_name, business_name, user_name) {
	cy.div_by_containing_class('business-dropdown-wrapper').click();
	cy.any_by_text(business_name).click();
	cy.span_by_text(client_name).click();
	cy.span_by_text(user_name).click();
	cy.wait_until_disappear_div_loading_spinner();
	verify_accounting_team_page_displayed(client_name);
}

function verify_accounting_team_page_displayed(client_name) {
	cy.wait_until_visible_span_by_text('Client Management');
	cy.wait_until_visible_span_by_text(client_name);
	cy.wait_until_visible_h2_by_text("Accounting Team");
}

function assign_team_member(user_name) {
	filter_by_name(user_name);
	cy.get(`span.nav-item-text:contains("${user_name}")`).if()
    .then(() => {
			remove_from_client();
		}).else().then(() => {
			cy.log("Accounting Team member does not exist"); 
    });
	cy.a_by_text('Edit').click();
	cy.wait_until_visible_h4_by_text('Assign Team Members');
	cy.input_by_placeholder('Search Employees').clear().type(user_name);
	cy.div_by_containing_class('member-select-item').click();
	cy.span_by_text('Save').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function filter_by_name(user_name) {
	cy.input_by_placeholder('Name').clear().type(user_name);
}

function verify_member_added(user_name, type) {
	filter_by_name(user_name);
	cy.span_by_containing_class('sel-client-role-js').should('have.text', type);
}

function update_role(type) {
	cy.div_by_id('client-role-dropdown-btn').click();
	cy.any_by_text(type).click();
	cy.wait_until_disappear_div_loading_spinner();
}

function update_title(title) {
	cy.div_by_id('client-title-dropdown-btn').click();
	cy.any_by_text(title).click();
	cy.wait_until_disappear_div_loading_spinner();
}

function verify_role_and_title_updated(type, title) {
	cy.span_by_containing_class('sel-client-role-js').should('have.text', type);
	cy.span_by_containing_class('sel-client-title-js').should('have.text', title);
}

function remove_from_client() {
	cy.div_by_containing_class('team-removepic').click({force: true});
	cy.button_by_containing_class('remove-business-js').click({force: true});
	cy.wait_until_visible_h4_by_text('Remove Team Member From Client');
	cy.button_by_id('delete-btn').click();
	cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
	go_to_accounting_team_page,
	assign_team_member,
	verify_member_added,
	update_role,
	update_title,
	verify_role_and_title_updated,
	remove_from_client
}
