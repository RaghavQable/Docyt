
function verify_security_privacy_page_displayed(){
  cy.wait_until_visible_span_by_text("Docyt Settings");
	cy.wait_until_visible_h2_by_text("Security & Privacy");
}

function click_update_password() {
  cy.a_by_text('Update Password').click();
  cy.wait_until_visible_h4_by_text('Update Password')
}

module.exports = {
  verify_security_privacy_page_displayed,
  click_update_password,
};
  