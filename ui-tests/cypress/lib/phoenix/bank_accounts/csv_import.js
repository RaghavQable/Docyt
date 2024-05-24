const tables = require("../../common/webtables/tables")

function verify_csv_import_page_displayed() {
	cy.wait_until_visible_span_by_text('CSV Import');
	cy.wait_until_visible_td_by_text('Bank Account(manual)');
}

function select_bank_account() {
	cy.td_by_text('Bank Account(manual)').click();
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait_until_visible_button_by_text('Upload CSV');
}

function click_upload_csv_button() {
	cy.button_by_text('Upload CSV').click();
	cy.wait_until_visible_h4_by_text('Upload CSV');
	cy.wait_until_visible_p_by_text('Drag and drop the transaction CSV here.');
}

function select_file_from_computer_and_upload(file_name) {
	cy.input_file_type().selectFile('cypress/upload_files/phoenix/' + file_name);
	cy.wait_until_disappear_div_loading_spinner();
	cy.wait_until_visible_h1_by_text('Map CSV Columns');
}

function verify_csv_uploaded() {
	cy.reload();
	cy.span_by_containing_class('text-grey').should('contain', 'Last updated: ')
}

function upload_csv(file_name) {
	click_upload_csv_button();
	select_file_from_computer_and_upload(file_name);
	cy.button_by_text('Save').click();
	cy.wait_until_disappear_div_loading_spinner();
}

function createTableAlias() {
	cy.xpath('//table[@class="table banking-accounts-table csv-imports-table"]').as('csv_table');
}

function delete_csv() {
	createTableAlias();
	tables.verifyTotalRows('@csv_table', 1);
	tables.clickLastCellFromFirstRow('@csv_table');
	cy.a_by_containing_class('delete-btn').click();
	cy.wait_until_visible_h4_by_text('Delete CSV');
	cy.button_by_text('Proceed').click();
	cy.wait_until_disappear_div_loading_spinner();
	cy.reload();
	cy.any_by_text('No CSV imports created').should('be.visible');
}

module.exports = {
	verify_csv_import_page_displayed,
	select_bank_account,
	upload_csv,
	verify_csv_uploaded,
	delete_csv
}