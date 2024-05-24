
const tables = require("../../common/webtables/tables")

function verify_add_receipt_form_displayed() {
    cy.h1_by_text('Add a Receipt').should('exist');
    cy.button_by_text('Select from your computer').should('be.visible')
}

function select_file_from_computer_and_upload(file_name, merchant) {
    cy.input_file_type().selectFile('cypress/upload_files/dragon/' + file_name);
    cy.wait_until_disappear_div_loading_spinner();
    cy.any_by_containing_class('upload-file-statusbar').should('be.visible');
    cy.div_by_text('Your document is being processed').should('be.visible');;
    cy.xpath(`(//*[normalize-space(text())='Merchant']/..//*[normalize-space(text())='${merchant}'])[1]`, { timeout: 360000 }).should('be.visible');
}

function fill_add_receipt_form_and_submit(receipt) {
    fill_text_field('Merchant', receipt['merchant'])
    cy.strong_by_text(receipt['merchant']).should('be.visible')
    cy.strong_by_text(receipt['merchant']).click()
    fill_text_field('Amount', receipt['amount'])
    fill_date_field('Date', receipt['date']);
    click_save_and_close_button();
}

function fill_text_field(label, text) {
    click_input_by_label(label)
    cy.input_by_label(label).clear().type(text);
}

function fill_date_field(label, date) {
    click_input_by_label(label),
    //cy.input_by_label(label).clear();
    //cy.wait(1000);
    cy.xpath("//td[not(contains(@class,'old')) and not(contains(@class,'new')) and text()='" + date + "']").click()
}

function click_input_by_label(label){
    cy.xpath("//div[normalize-space(text())='" + label + "']/..//div[contains(@class, 'document-field-value')]").click()
}

function fill_amount(amount) {
    fill_text_field('Amount', amount.toString());
}

function click_save_and_close_button() {
    cy.wait(2000);
    cy.button_by_text('Save & Close').click();
    cy.wait_until_disappear_button_by_text('Save & Close');
}

function verify_receipt_details(merchant, amount, date) {
    cy.input_by_label('Merchant*').should('have.value', merchant);
    cy.input_by_label('Amount*').should('have.value', amount.replaceAll(',', ''));
    cy.input_by_label('Date*').should('have.value', date);
}

function click_approve_receipt_review_next_button() {
    cy.button_by_text('Approve Receipt - Review Next').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function select_payment_account(payment_account) {
    fill_text_field('Payment Account*', payment_account)
    cy.strong_by_text(payment_account).should('be.visible')
    cy.any_by_text(payment_account).click()
    cy.wait(2000);
}
  
module.exports = {
    verify_add_receipt_form_displayed,
    select_file_from_computer_and_upload,
    fill_add_receipt_form_and_submit,
    fill_amount,
    click_save_and_close_button,
    fill_date_field,
    verify_receipt_details,
    select_payment_account,
    click_approve_receipt_review_next_button

};
  