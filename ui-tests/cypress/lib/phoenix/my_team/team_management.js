const business_employee_page = require('../my_clients/business_employee');
const tables = require("../../common/webtables/tables")

function verify_team_management_page_displayed() {
	cy.wait_until_visible_span_by_text('Docyt Settings')
	cy.wait_until_visible_h2_by_text('Team Management')
	cy.wait_until_visible_button_by_containing_class('btn-add-member')
}

function close_business_profile_details_page() {
	cy.a_by_containing_class('close-page-btn').click({ force: true});
	verify_team_management_page_displayed();
}

function add_new_member(name, email) {
	cy.get(`span.block-wrapper:contains("${name}")`).if()
    .then(() => {
			filter_by_name(name);
			edit_business_profile();
			remove_from_business();
			close_business_profile_details_page();
    }).else().then(() => {
			cy.log("Not found team member"); 
    });
	cy.button_by_containing_class('btn-add-member').click();
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

function filter_by_name(name) {
	cy.input_by_containing_class('input-filter-employee').clear().type(name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait(1000);
}

function filter_by_business_name(business_name) {
	cy.input_by_placeholder('All Businesses').clear().type(business_name)
	cy.a_by_text(business_name).click()
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait(1000);
}

function edit_business_profile() {
	cy.button_by_containing_class('action-menu-toggle-btn').click();
	cy.div_by_containing_class('member-business-js').click({ force: true })
	cy.wait_until_visible_label_by_text('Business Role')
}

function verify_new_member_added(name, type) {
	filter_by_name(name)
	edit_business_profile();
	cy.span_by_containing_class('sel-business-role-js').should('have.text', type);
}

function remove_from_business() {
	cy.div_by_containing_class('team-removepic').click({force: true});
	cy.get('.invite-notify-panel').if()
		.then(() => {
			business_employee_page.retract_invitation();
		}).else().then(() => {
			cy.button_by_containing_class('remove-business-js').click({force: true});
			cy.wait_until_visible_h4_by_text('Remove From Business');
			cy.button_by_id('delete-btn').click();
			cy.wait_until_disappear_div_loading_spinner();
			cy.wait(1000);
		})
}

function createTableAlias() {
    cy.xpath("//div[contains(@class, 'team-table-wrapper')]//table").as('team_table')
}

function verify_employee_displayed_in_table(employee_name, count) {
	createTableAlias()
    tables.verifyTotalRows('@team_table', 1)
	cy.any_match_table_heading_by_table_data('Employee', employee_name).should('be.visible');
}

function clear_filters() {
	cy.input_by_placeholder('All Employees').clear();
	cy.input_by_placeholder('All Businesses').clear();
}



module.exports = {
	verify_team_management_page_displayed,
	add_new_member,
	select_member_type,
	verify_new_member_added,
	remove_from_business,
	filter_by_name,
	filter_by_business_name,
	verify_employee_displayed_in_table,
	clear_filters
}
