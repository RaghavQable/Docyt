

function verify_add_employee_expense_form_displayed() {
    cy.h1_by_text('Add Employee Expense').should('be.visible')
    cy.button_by_text('Select from your computer').should('be.visible')
}

function select_file_from_computer_and_upload(file_name) {
    cy.input_file_type().selectFile('cypress/upload_files/dragon/' + file_name);
    cy.wait_until_disappear_div_loading_spinner();
    cy.any_by_containing_class('upload-file-statusbar').should('be.visible');
    cy.div_by_text('Your document is being processed').should('be.visible');
    cy.iframe_by_containing_class('pdf-viewer').should('be.visible');
    cy.wait(5000);
}

function fill_add_employee_expense_form_and_Submit(expense) {
    fill_text_field('Amount', expense['amount'])
    fill_date_field('Payment Date', expense['payment_date']);
    click_save_and_close_button();
}

function fill_date_field(label, date) {
    click_input_by_label(label)
    select_date_from_date_selector(date)
}

function fill_text_field(label, text) {
    click_input_by_label(label)
    cy.input_by_label(label).type(text);
}

function select_date_from_date_selector(date) {
    cy.xpath("//td[not(contains(@class,'old')) and not(contains(@class,'new')) and text()='" + date + "']").click()
}

function click_input_by_label(label){
    cy.xpath("//div[normalize-space(text())='" + label + "']/..//div[contains(@class, 'document-field-value')]").click()
}

function click_save_and_close_button() {
    cy.button_by_text('Save & Close').click();
    cy.wait_until_disappear_button_by_text('Save & Close');
}

module.exports = {
    verify_add_employee_expense_form_displayed,
    select_file_from_computer_and_upload,
    fill_add_employee_expense_form_and_Submit
};
  