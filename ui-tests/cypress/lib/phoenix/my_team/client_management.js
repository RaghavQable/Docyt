function verify_client_page_displayed(user_name) {
	cy.wait_until_visible_span_by_text('Team Management');
	cy.wait_until_visible_span_by_text(user_name);
	cy.wait_until_visible_a_by_text('Add Client');
}

function add_client(client_name) {
	cy.get(`div.nav-item-text:contains("${client_name}")`).if()
    .then(() => {
			remove_client(client_name);
			cy.reload();
		}).else().then(() => {
			cy.log("Not found client."); 
    });
	cy.a_by_text('Add Client').click();
	cy.wait_until_visible_h4_by_text('Add Clients');
	cy.wait(1000);
	cy.div_by_containing_class('business-multi-select').click();
	cy.button_by_containing_class('btn-submit').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function filter_by_name(name) {
	cy.input_by_containing_class('business-filter-js').clear().type(name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait_until_visible_label_by_text(name);
	cy.wait(1000);
}

function verify_new_client_added(name, type) {
	filter_by_name(name)
	cy.span_by_containing_class('sel-client-role-js').should('have.text', type);
}

function change_client_role(type) {
	cy.div_by_id('client-role-dropdown-btn').click();
	cy.any_by_text(type).click();
	cy.span_by_containing_class('sel-client-role-js').should('have.text', type);
}

function remove_client(client_name) {
	cy.div_by_containing_class('team-removepic').click({force: true});
	cy.button_by_containing_class('remove-business-js').click({force: true});
	cy.wait_until_visible_h4_by_text(`Remove Client "${client_name}"`);
	cy.button_by_id('delete-btn').click();
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait(1000);
}

module.exports = {
	verify_client_page_displayed,
	add_client,
	verify_new_client_added,
	remove_client,
	change_client_role
}
