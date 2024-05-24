function accept_invitation(name) {
	cy.wait_until_visible_h1_by_text('Notifications');
	cy.div_by_containing_class('notification-item-view').first().click();
  cy.wait(1000);
  cy.get(`h4:contains("Invitation to join ${name}")`)
    .then(() => {
      cy.button_by_containing_class('select-accept-js').click();
    }).else().then(() => {
      cy.log(`Not found Invitation from ${name}`); 
    });
}

module.exports = {
	accept_invitation,
}
