
function verify_invoice_trash_page_displayed() {
    cy.wait_until_visible_h2_by_text('Trash')
    cy.wait_until_visible_any_by_id('trash-action-dropdown-btn');
}

function empty_trash() {
    cy.get('td.invoice-amount-column').if()
    .then(() => {
        cy.any_by_id('trash-action-dropdown-btn').click();
        cy.p_by_text('Select All').click();
        cy.any_by_id('trash-action-dropdown-btn').click();
        cy.p_by_text('Delete Selected').click();
        cy.wait_until_visible_p_by_text('Delete Permanently');
        cy.span_by_text('Delete').click();
        cy.wait_until_disappear_div_loading_spinner();
    }).else().then(() => {
        cy.log("Not found Invoice in Trash"); 
    });
}
  
module.exports = {
    verify_invoice_trash_page_displayed,
    empty_trash
};
  