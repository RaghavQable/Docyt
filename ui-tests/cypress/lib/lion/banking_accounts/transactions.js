function verify_Transactions_page(){
    cy.h2_by_text('Transactions').should('be.visible').should('exist');
    cy.button_by_text('Add Transaction').should('be.visible').should('exist');
}

function Add_transaction_flow(transaction){
    cy.button_by_text('Add Transaction').click({force:true})
    fill_add_transaction_field('Starting Date', transaction['Date'])
    select_bank_account_option()
    fill_add_transaction_field('Description', transaction['Description'])
    select_type('select', transaction['Type'])
    fill_add_transaction_field('Amount', transaction['Amount'])
    click_on_Add_button()
}

function fill_add_transaction_field(label, text) {
    cy.input_by_placeholder(label).clear().type(text, {force: true});
  }

function select_bank_account_option(){
    cy.div_by_following_a('All Accounts').click({force:true})
    cy.wait(1000)
    cy.div_by_parent_a('Bank Account').click({force:true})
    cy.wait(1000)
}

function select_type(label,text){
    cy.wait(1000)
    cy.input_by_containing_id(label).clear().type(text, {force: true})
    cy.wait(1000)
    cy.focused()
    .type('{downarrow}', { force: true})
    .should('exist')
    .type('{enter}', { force: true});
    cy.wait(500)
}

function click_on_Add_button(){
    cy.button_by_text('Add').click({force:true})
    cy.wait(1000)
}

function verify_add_transaction_in_progress(){
    cy.h1_by_text('Add Transactions in Progress').should('be.visible').should('exist')
}

function click_on_close_button(){
    cy.button_by_text('Close').click({force:true})
}

function search_transaction(text){
    cy.input_by_placeholder('Transaction Description').clear().type(text, {force: true})
    cy.wait_until_disappear_div_loading_spinner();
    cy.wait(2000)
}

function search_transaction_on_all_transaction_page(text){
    cy.input_by_placeholder('Description').clear().type(text, {force: true})
    cy.wait_until_disappear_div_loading_spinner();
    cy.wait(2000)
}

function search_transaction_on_income_page(text){
    cy.input_by_placeholder('Description').type(text, {force: true})
    cy.wait(2000)
    cy.wait_until_disappear_div_loading_spinner();
    cy.wait(1000)
}

function click_on_transaction_more_option(){
    cy.table_by_following_a('actions_dropdown').click({force:true})
    cy.wait(2000)
}

function delete_transaction(){
    click_on_transaction_more_option()
    cy.div_by_parent_a('Delete Transaction').click({force:true})
    cy.wait(1000)
    cy.h1_by_text('Delete Transaction').should('exist')
    cy.button_by_text('Delete').click({force:true})
}

function verify_alert_message(alert_title,alert_message){
    cy.div_contain_class('toast-title').should('have.text',alert_title)
    cy.div_contain_class('toast-message').should('have.text',alert_message)
}

function go_to_reconciliation_center()
{
    cy.div_by_parent_a('Go to Reconciliation Center').click({force:true})
    cy.wait(2000)
}

function verify_transaction_present_in_reconciliation_center(fields){
    cy.table_by_containing_td_text(fields).should('be.visible').should('exist')
}

function verify_transaction_present_in_all_transaction_page(description){
    cy.table_by_div_text(description).should('be.visible').should('exist')
}

function verify_transaction_present_in_income_page(description){
    cy.span_by_text(description).should('be.visible').should('exist')
}

function verify_transaction_present_in_Expense_page(description){
    cy.table_by_div_contains_text(description).should('be.visible').should('exist')
}

function click_on_transaction_in_reconciliation_center(fields){
    cy.table_by_containing_td_text(fields).should('be.visible').click({force:true});
    cy.wait(2000)
}

function get_transaction_type_and_verify(expected){
    cy.get_span_text_by_input('Transaction Type').should('have.text',expected)
}

function select_category_flow(text){
    cy.a_by_containing_text('Select Category').scrollIntoView().click({force:true})
    cy.wait(1000)
    cy.input_by_placeholder('Select Chart of Account').click({force:true})
    cy.wait(1000)
    cy.input_by_placeholder('Select Chart of Account').type(text,{force:true, delay: 1000})
    cy.wait(1000)
    cy.focused()
        .type('{downarrow}', { force: true})
        .should('exist')
        .type('{enter}', { force: true});
    cy.wait(2000)
    cy.button_by_text('Save').click({force:true})
    cy.wait(1000)
    cy.button_by_only_text('Categorize Transaction').click({force:true})
    cy.wait(2000)
    cy.button_by_only_text('Close').click()
    cy.wait(1000)
}

function select_vendor(text){
    cy.input_by_placeholder('Enter Vendor Name').scrollIntoView().type(text)
    cy.strong_by_text(text).should('be.visible').click()
    cy.wait(1000)
    cy.button_by_only_text('Categorize Transaction').click()
    cy.wait(2000)
    cy.button_by_only_text('Close').click()
    cy.wait(1000)
}

function click_on_reset_filters(){
    cy.a_by_text('Reset Filters').should('be.visible').dblclick({force:true})
    cy.wait(3000)
}

function change_transaction_type_in_categorize_transaction(text){
    cy.change_transaction_type(text).click({force:true})
}

function select_from_account(text){
    cy.select_from_account('From Account*').scrollIntoView().click()
    cy.span_by_contain_text(text).eq(0).should('be.visible').click()
    cy.wait(1000)
}

function click_on_categorize_button(){
    cy.button_by_only_text('Categorize Transaction').click({force:true})
    cy.wait(2000)

    function click_on_categorize_button() {
        cy.button_by_only_text('Categorize Transaction').click({ force: true });
        cy.wait(2000);
    
        cy.button_by_only_text('Close').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.wrap($btn).click();
            } else {
                // Do nothing if the button is not visible
            }
        });
    
        cy.a_by_containing_class('close').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.wrap($btn).click();
            } else {
                // Do nothing if the button is not visible
            }
        });
    
        cy.wait(1000);
    
}
}

module.exports = {
    verify_Transactions_page,
    Add_transaction_flow,
    verify_add_transaction_in_progress,
    click_on_close_button,
    search_transaction,
    delete_transaction,
    verify_alert_message,
    click_on_transaction_more_option,
    go_to_reconciliation_center,
    verify_transaction_present_in_reconciliation_center,
    click_on_transaction_in_reconciliation_center,
    get_transaction_type_and_verify,
    select_category_flow,
    verify_transaction_present_in_all_transaction_page,
    search_transaction_on_all_transaction_page,
    verify_transaction_present_in_income_page,
    search_transaction_on_income_page,
    verify_transaction_present_in_Expense_page,
    select_vendor,
    click_on_reset_filters,
    change_transaction_type_in_categorize_transaction,
    select_from_account,
    click_on_categorize_button
}