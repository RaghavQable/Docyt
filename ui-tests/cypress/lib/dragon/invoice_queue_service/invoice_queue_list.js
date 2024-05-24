const invoiceQueue = require("../../../e2e/dragon/InvoiceQueue.cy");
const tables = require("../../common/webtables/tables")

function verify_invoice_queue_page_displayed() {
    cy.h3_by_text('Invoice Queue').should('exist');
    cy.button_by_containing_class('add-invoice-btn').should('exist');
}

function filter_by_invoice(invoice_number) {
    cy.input_by_placeholder('Invoice#').clear().type(invoice_number);
    cy.wait_until_disappear_div_loading_spinner();
}

function verify_invoice_exists(invoice_number) {
    cy.any_match_table_heading_by_table_data('Invoice #', invoice_number).should('exist');
}

function verify_invoice_status(invoice_number, status) {
    cy.any_match_table_data_by_corresponding_row_col('Invoice #', invoice_number, 'Status', status).should('exist');
}

function verify_payment_method(invoice_number, payment_method) {
    cy.any_match_table_data_by_corresponding_row_col('Invoice #', invoice_number, 'Payment Method', payment_method).should('exist');
}

function verify_invoice_chart_of_account(invoice_number, chart_of_account) {
    cy.any_match_table_data_by_corresponding_row_col('Invoice #', invoice_number, 'Chart Of Account', chart_of_account).should('exist');
}

function verify_add_invoice_button_enabled() {
    cy.button_by_containing_class('add-invoice-btn').should('not.be.disabled');
}

function verify_preview_document(payee) {
    cy.any_by_containing_class('preview-clickable').click();
    cy.wait_until_visible_div_by_containing_class('preview-modal');
    cy.any_by_containing_class('img-document').should('exist');
    cy.span_by_text(payee).should('exist');
}

function close_preview_document_modal() {
    cy.button_by_containing_class('close').click();
}
  
function click_add_invoice_button() {
    cy.button_by_containing_class('add-invoice-btn').click();
}

function createTableAlias() {
    cy.xpath("//div[contains(@class, 'invoice-queue-list')]/table").as('invoice_queue_table')
}

function click_first_row_amount_dropdown_option(option, sub_option='') {
    createTableAlias()
    tables.verifyTotalRows('@invoice_queue_table', 1)
    tables.clickLastCellFromFirstRow('@invoice_queue_table')
    cy.wait(1000)
    if(sub_option == ''){
        cy.button_by_text(option).click()
    }else{
        cy.a_by_text(option).realHover();
        cy.button_by_text(sub_option).click()
    }
    
}

function edit_invoice() {
    click_first_row_amount_dropdown_option("Edit Invoice");
    cy.get(`h4.modal-title:contains("Editing an approved or verified invoice")`).if()
        .then(() => {
            cy.button_by_text('Proceed').click();
        }).else().then(() => {
            cy.log("Invoice is not pushed to QBO"); 
        });
}

function delete_invoice(invoice) {
    filter_by_invoice(invoice)
    click_first_row_amount_dropdown_option("Delete Invoice")
    cy.h1_by_text('Delete Document').should('be.visible')
    cy.button_by_text("Delete").should('be.visible').click()
    cy.wait_until_disappear_div_loading_spinner();

    // verify_invoice_deleted
    tables.verifyTotalRows('@invoice_queue_table', 0)
}

function Add_invoice_flow(){
    click_add_invoice_button();

    const chase = 'Chase';

    cy.h1_by_text('Add an Invoice').should('be.visible');
    cy.add_invoice_input('Payee').click({force: true}).type(chase)
    cy.wait(2000)
    cy.dropdown_list_option(chase).click()
    cy.add_invoice_input('Amount').click({force: true}).type('129')
    //cy.select_category('Select Category').click();
    cy.add_invoice_input('Invoice Date').click({force: true}).type(getCurrentFormattedDate()).type('{enter}')
    cy.add_invoice_input('Due Date').click({force: true}).type(getCurrentFormattedDate(4)).type('{enter}')
    cy.add_invoice_input('Invoice #').click({force: true}).type('567')
    cy.add_invoice_input('Account #').click({force: true}).type('98765')
    cy.button_by_text('Save & Close').click();   
}

/*function fill_add_invoice_form_and_submit_flow(invoice) {

    invoiceQueue.fill_text_field('Payee', invoice['payee'])
    cy.strong_by_text(invoice['payee']).should('be.visible')
    cy.strong_by_text(invoice['payee']).click()
    cy.a_by_text("Edit").should('be.visible');
    fill_text_field('Amount', invoice['amount'])
    fill_date_field('Invoice Date', getCurrentFormattedDate());
    fill_date_field('Due Date', getCurrentFormattedDate(2));
    fill_text_field('Invoice #', invoice['invoice_number']);
    click_save_and_close_button();
} */

function getCurrentFormattedDate(daysToAdd) {
    // Set the default value for daysToAdd using a ternary operator
    daysToAdd = typeof daysToAdd !== 'undefined' ? daysToAdd : 0;

    // Get the current date
    const currentDate = new Date();

    // Add the specified number of days
    currentDate.setDate(currentDate.getDate() + daysToAdd);

    // Extract day, month, and year
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
    const year = currentDate.getFullYear();

    // Form the date string in the format "MM/DD/YYYY"
    const formattedDate = `${month}/${day}/${year}`;

    // Return the formatted date string
    return formattedDate;
}

function click_on_first_row_amount_data(){
    cy.get_invoice_amount_data().scrollIntoView()
    cy.wait(2000)
    cy.get_invoice_amount_data().click()
    }

function click_on_amount_sub_option(option){
        cy.button_by_text(option).click()
}

function click_on_mark_as_paid_sub_option(option,sub_option=''){
    cy.a_by_text(option).click({ force: true });
    cy.wait(2000)
    cy.button_by_text(sub_option).click({ force: true })
}

function mark_as_paid_manual_flow(checkNumber){
    cy.input_by_id('estimated-date-input').type(getCurrentFormattedDate(2)).type('{enter}')
    cy.input_by_placeholder('Enter Check Number').type(checkNumber)
    cy.button_by_text('Mark as Paid').click();
}

function get_random_number(max) {
	return Math.floor((Math.random() * max) + 1);
}

function check_register_flow()
{
    cy.span_by_anchor('Check Register',2).click({force:true});
    
}




module.exports = {
    verify_invoice_queue_page_displayed,
    filter_by_invoice,
    verify_invoice_exists,
    verify_invoice_status,
    verify_payment_method,
    verify_invoice_chart_of_account,
    verify_add_invoice_button_enabled,
    verify_preview_document,
    close_preview_document_modal,
    click_add_invoice_button,
    edit_invoice,
    delete_invoice,
    click_first_row_amount_dropdown_option,
    Add_invoice_flow,
    click_on_first_row_amount_data,
    click_on_amount_sub_option,
    click_on_mark_as_paid_sub_option,
    mark_as_paid_manual_flow,
    check_register_flow,
    get_random_number
};
  