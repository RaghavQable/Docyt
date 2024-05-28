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
    cy.input_by_containing_id(label).clear().type(text, {force: true}).each(($el, index, $list) => {
        if ($el.text() === text) {
            $el.click()
        }
    })
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

module.exports = {
    verify_Transactions_page,
    Add_transaction_flow,
    verify_add_transaction_in_progress,
    click_on_close_button,
    search_transaction,
    delete_transaction,
    verify_alert_message
}