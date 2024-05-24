

function verify_toast_message_notification_displayed(message) {
    cy.wait_until_visible_div_toast_message(message);
}

module.exports = {
    verify_toast_message_notification_displayed
}