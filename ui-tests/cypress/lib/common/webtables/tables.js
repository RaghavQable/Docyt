

function verifyTotalRows(alias, count) {
  cy.waitUntil(function() {
      return cy.get(alias).should('have.length', count)
  }, {timeout: 30000})
  cy.get(alias).should('have.length', count)
}

function clickFirstCellFromFirstRow(alias) {
  cy.get(alias).get('tr').first().get('td').first().click()
}

function clickLastCellFromFirstRow(alias) {
  cy.get(alias).get('tr').first().get('td').last().click()
}

// returns true if the specified tag with specified text is present in the first row
function first_row_table_cell_text_present(alias, tag_name, text) {
  cy.get(alias).get('tr').first().get('td').contains(tag_name, text);
}

// returns true if the 'td' tag contains specified text in the first row
function first_row_table_td_text_present(alias, text) {
  cy.get(alias).get('tr').first().get('td').contains(text);
}

// click on specified tag from first row. Clicks on first match
function click_specified_tag_from_first_row(alias, tag_name) {
  cy.get(alias).get('tr').first().get(tag_name).first().click();
}


module.exports = {
  verifyTotalRows,
  clickFirstCellFromFirstRow,
  clickLastCellFromFirstRow,
  first_row_table_cell_text_present,
  first_row_table_td_text_present,
  click_specified_tag_from_first_row
};
  