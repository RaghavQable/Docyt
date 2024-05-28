function verify_summary_Uncategorized_Transactions_tab(expected) {
    cy.div_contain_span_text('summary', 'Uncategorized Transactions').should('be.visible').should('have.text', expected)
}

function verify_summary_Uncleared_Documents_tab(expected) {
    cy.div_contain_span_text('summary', 'Uncleared Documents').should('be.visible').should('have.text', expected)
}

function verify_summary_Unmatched_Transfers_tab(expected) {
    cy.div_contain_span_text('summary', 'Unmatched Transfers').should('be.visible').should('have.text', expected)
}

function verify_summary_Undocumented_Transactions_tab(expected) {
    cy.div_contain_span_text('summary', 'Undocumented Transactions').should('be.visible').should('have.text', expected)
}

module.exports = {
    verify_summary_Uncategorized_Transactions_tab,
    verify_summary_Uncleared_Documents_tab,
    verify_summary_Unmatched_Transfers_tab,
    verify_summary_Undocumented_Transactions_tab
}
