
function verify_management_reports_page_displayed() {
	cy.wait_until_disappear_div_loading_spinner();
	cy.h2_by_text('Management Reports').should('be.visible');
    cy.get("span.icon-plus").should('be.visible');
}

function verify_create_new_advanced_report_modal_displayed() {
    cy.h1_by_text('Create New Advanced Report').should('be.visible');
    cy.button_by_text('Create Report').should('be.visible');
}

function create_advanced_report(report_name, report_type) {
    cy.wait(1000);
    cy.get("span.icon-plus").if()
        .click()
        .else()
        .then(() => {
            cy.button_by_text('Add New Advanced Report').if()
            .click()
            .else()
            .log('Add New Advanced Report button not found')
        })
        verify_create_new_advanced_report_modal_displayed();
        cy.input_by_placeholder('Enter Name of Report').clear().type(report_name);
        cy.input_by_label(report_type).click();
        cy.button_by_text('Create Report').click();
        cy.wait_until_disappear_div_loading_spinner();
}

function verify_report_type_displayed(report_type) {
    cy.div_by_text(report_type).should('be.visible');
}

function click_report_type(report_type) {
    cy.div_by_text(report_type).click();
    cy.wait_until_disappear_div_loading_spinner();

}

function filter_by_last_30_days() {
    cy.input_by_placeholder('Start Date – End Date').click();
    cy.span_by_text('Last 30 days').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_owners_operating_statement_report_page_displayed(report_name) {
    cy.h1_by_text(report_name).should('be.visible');
    cy.input_by_placeholder('Search by Name').should('be.visible');
}

function update_report_data() {
    cy.div_by_containing_class('report-status-panel').click();
    cy.wait(5000);
    cy.waitUntil(function() {
        return cy.label_by_text('Report is currently being updated').should('have.length', 0)
    }, {timeout: 180000, interval: 1000});
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_report_displayed() {
    update_report_data();
    verify_total_column_field_in_report('Rooms Revenue');
}

function verify_total_column_field_in_report(row_name) {
    cy.xpath("(//div[text()='" + row_name + "']/ancestor::div[@class='item-box']//div[@class='general-column'])[1]").should('not.be.empty');
}


module.exports = {
	verify_management_reports_page_displayed,
    create_advanced_report,
    verify_report_type_displayed,
    click_report_type,
    verify_owners_operating_statement_report_page_displayed,
    filter_by_last_30_days,
    verify_report_displayed
}
