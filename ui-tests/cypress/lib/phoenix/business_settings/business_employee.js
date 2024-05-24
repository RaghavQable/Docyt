const client_business_employees_page = require('../my_clients/business_employee');

function verify_business_employees_page_displayed(business_name) {
	cy.wait(2000);
	cy.wait_until_visible_h1_by_text(`Setup ${business_name}`)
	cy.wait_until_visible_h2_by_text('Business Employees')
}

function add_business_employee(name, email) {
	cy.a_by_text('Add').click();
	cy.wait_until_visible_h4_by_text('Add Member');
	cy.input_by_placeholder('First Name  Middle  Last').clear().type(name);
	cy.input_by_placeholder('Email').clear().type(email);
	cy.button_by_id('create-invite').click();
	cy.wait_until_visible_h4_by_text('Add New Member: Select Businesses');
}

function add_new_member(name, email, type) {
	cy.get(`span.nav-item-text:contains("${name}")`).if()
    .then(() => {
			filter_by_name(name);
			client_business_employees_page.remove_from_business();
    }).else().then(() => {
			cy.log("Not found Business Employee"); 
    });
	add_business_employee(name, email);
	cy.get('.file-category.sel-type-js').select(type)
	cy.span_by_text('Save').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function verify_new_member_added(name, type) {
	cy.div_by_containing_class('team-setting-header').should('contain', name).should('contain', type);
}

function filter_by_name(name) {
	cy.input_by_containing_class('member-filter-js').clear().type(name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait(1000);
}

module.exports = {
	verify_business_employees_page_displayed,
	add_new_member,
	filter_by_name,
	verify_new_member_added,
}

