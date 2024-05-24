
const dragon_api = require("../../api/dragon");

function verify_add_an_invoice_form_displayed() {
    cy.h1_by_text('Add an Invoice').should('be.visible')
    cy.button_by_text('Select from your computer').should('be.visible')
}

function fill_add_invoice_form_and_submit(invoice) {
    fill_text_field('Payee', invoice['payee'])
    cy.strong_by_text(invoice['payee']).should('be.visible')
    cy.strong_by_text(invoice['payee']).click()
    cy.a_by_text("Edit").should('be.visible');
    fill_text_field('Amount', invoice['amount'])
    fill_date_field('Invoice Date', invoice['invoice_date']);
    fill_date_field('Due Date', invoice['due_date']);
    fill_text_field('Invoice #', invoice['invoice_number']);
    click_save_and_close_button();
} 

function click_save_and_close_button() {
    cy.wait(2000);
    cy.button_by_text('Save & Close').should('be.visible').click({force:true});
    cy.wait_until_disappear_button_by_text('Save & Close');
}

function fill_invoice_number(invoice_number) {
    cy.wait(5000);
    fill_text_field('Invoice #', invoice_number);
    cy.div_by_text('Account #').click();
    cy.input_by_label('Invoice #').should('have.value', invoice_number);
}

function select_date_from_date_selector(date) {
    cy.xpath("//td[not(contains(@class,'old')) and not(contains(@class,'new')) and text()='" + date + "']").click()
}

function fill_date_field(label, date) {
    click_input_by_label(label)
    select_date_from_date_selector(date)
}

function fill_text_field(label, text) {
    click_input_by_label(label)
    cy.input_by_label(label).clear().type(text, {force: true});
}

function click_input_by_label(label){
    cy.xpath("//div[normalize-space(text())='" + label + "']/..//div[contains(@class, 'document-field-value')]").click()
}

function verify_docyt_id_displayed() {
    cy.get('.docyt-id-number', { timeout: 10000 }).contains('INV-')
}

function verify_invoice_data_under_details_tab(invoice) {
    cy.any_corresponding_to_label('Receiver/Payee:', invoice['payee']).should('be.visible');
    cy.any_corresponding_to_label('Check Amount:', "+" + invoice['formatted_amount']).should('be.visible');
    cy.any_corresponding_to_label('Mailing Address:', invoice['address']).should('be.visible');
    cy.any_corresponding_to_label('Attachments:', 'None').should('be.visible');
    cy.span_by_text('RELATED DOCUMENTS').should('exist');
    cy.span_by_text('PAST PAYMENTS').should('exist');
    cy.button_by_text('Generate Check').should('exist');
    cy.a_by_text('Cancel').should('exist');
    cy.a_by_text('Skip').should('exist');
}

function click_generate_check_button(){
    cy.wait_until_disappear_div_loading_spinner();
    cy.button_by_text('Generate Check').click();
    cy.wait_until_disappear_div_loading_spinner()
}

function click_confirm_from_cancel_payment_modal() {
    cy.h1_by_text("Cancel Payment").should('be.visible');
    cy.button_by_text("Confirm").should('be.visible').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_identity_and_generate_payment(){
    cy.get('div.modal-header > h1').if()
    .then(() => {
        cy.input_by_placeholder("Security code").should('be.visible');
        cy.button_by_text('Generate Payment').should('be.visible');
    
        cy.wait(10000);
        dragon_api.get_first_email_verification_code().then(verification_code => {
            cy.log(verification_code); 
            cy.input_by_placeholder("Security code").type(verification_code);
          })
        cy.button_by_text('Generate Payment').click();
        cy.wait_until_disappear_div_loading_spinner();
    }).else().then(() => {
        cy.log("Verification already done"); 
    })
}

function click_mark_as_verified_button() {
    cy.wait(5000);
    cy.button_by_text('Mark as Verified - Review Next').should('be.visible').click();
    cy.wait_until_disappear_div_loading_spinner();
}

function select_file_from_computer_and_upload(file_name) {
    cy.input_file_type().selectFile('cypress/upload_files/dragon/' + file_name);
    cy.wait_until_disappear_div_loading_spinner();
    cy.any_by_containing_class('upload-file-statusbar').should('be.visible');
    cy.div_by_text('Your document is being processed').should('be.visible');
    cy.wait(2000);
}

function verify_auto_polpulated_data_in_form(payee, amount, chart_of_account) {
    cy.any_corresponding_to_label('Payee', payee).should('be.visible');
    cy.any_corresponding_to_label('Amount', amount).should('be.visible');
    cy.any_corresponding_to_label('Category', chart_of_account).should('be.visible');
    cy.wait_until_disappear_div_loading_spinner();
}

function click_continue_button_from_multiple_unpaid_invoices_detected_page() {
    cy.wait_until_disappear_div_loading_spinner();
    cy.wait(3000)
    cy.get("button.continue-js")
        .if()
        .click()
        .else()
        .log('Continue Button not found')
}

function verify_mark_as_paid_by_credit_card_modal_displayed() {
    cy.h1_by_text('Mark as Paid by Credit Card').should('be.visible');
    cy.button_by_text('Mark as Paid').should('be.visible');
}

function sumbit_mark_as_paid_by_credit_card_modal(estimated_date, payment_account) {
    cy.input_by_id('estimated-date-input').click();
    select_date_from_date_selector(estimated_date);
    cy.button_by_data_id('paymentAccount').click();
    cy.a_by_text(payment_account).click();
    cy.button_by_text('Mark as Paid').click();
    cy.wait_until_disappear_div_loading_spinner();
}

module.exports = {
    verify_add_an_invoice_form_displayed,
    fill_add_invoice_form_and_submit,
    verify_docyt_id_displayed,
    click_mark_as_verified_button,
    select_file_from_computer_and_upload,
    fill_invoice_number,
    click_save_and_close_button,
    verify_invoice_data_under_details_tab,
    click_continue_button_from_multiple_unpaid_invoices_detected_page,
    verify_mark_as_paid_by_credit_card_modal_displayed,
    sumbit_mark_as_paid_by_credit_card_modal,
    click_generate_check_button,
    verify_identity_and_generate_payment,
    click_confirm_from_cancel_payment_modal,
    verify_auto_polpulated_data_in_form
};
  