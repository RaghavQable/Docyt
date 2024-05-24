
const login_page  = require("../../../lib/common/login/login");
const invoice_queue_page = require("../../../lib/dragon/invoice_queue_service/invoice_queue_list");
const add_edit_invoice = require("../../../lib/dragon/invoice_queue_service/add_edit_invoice");
const trash_page = require("../../../lib/dragon/invoice_queue_service/trash");
const ar_invoices_page = require("../../../lib/dragon/accounts_receivable/invoices");
const {navigate_to_business_path} = require("../../../lib/common/navigation/navigation")
const time_helper = require("../../../utils/time_helper");
const number_helper = require("../../../utils/number_helper");
const data = Cypress.env('dragon');

describe("Accounts Receivable / Invoices", () => {
    it("C82866: Invoices List", () => {
        const invoice_number = "INV_" + time_helper.get_epoch_time();
        const current_date = time_helper.get_current_date_of_month();
        const last_date_of_month = time_helper.get_last_date_of_current_month();
        const amount = number_helper.get_random_number(100000);
        const invoice = {
            "invoice_number": invoice_number,
            "payee": data['test_business3_name'],
            "invoice_date": current_date,
            "due_date": last_date_of_month,
            "amount": amount,
            "formatted_amount": number_helper.get_formatted_amount(amount)
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business3_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();

        invoice_queue_page.click_add_invoice_button();
        add_edit_invoice.verify_add_an_invoice_form_displayed();
        add_edit_invoice.fill_add_invoice_form_and_submit(invoice);
        invoice_queue_page.filter_by_invoice(invoice_number);
        invoice_queue_page.verify_invoice_exists(invoice_number);

        invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification');
        invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data");
        add_edit_invoice.verify_docyt_id_displayed();
        add_edit_invoice.click_mark_as_verified_button();
        cy.reload();
        invoice_queue_page.filter_by_invoice(invoice_number);
        invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay');

        invoice_queue_page.click_first_row_amount_dropdown_option("Mark as paid", "Credit Card");
        add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page();
        add_edit_invoice.verify_mark_as_paid_by_credit_card_modal_displayed();
        add_edit_invoice.sumbit_mark_as_paid_by_credit_card_modal(last_date_of_month, 'Credit Card(manual)');

        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business3_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.filter_by_invoice(invoice_number);
        invoice_queue_page.verify_invoice_status(invoice_number, 'Paid');
        invoice_queue_page.verify_payment_method(invoice_number, 'Credit Card');

        navigate_to_business_path("ACCOUNTS_RECEIVABLE_INVOICES", data['test_business3_id']);
        ar_invoices_page.verify_invoices_page_displayed();
        ar_invoices_page.verify_invoice_exists(invoice_number)

        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business3_id']);
        invoice_queue_page.delete_invoice(invoice_number);
        navigate_to_business_path("ACCOUNTS_PAYABLE_TRASH", data['test_business3_id']);
        trash_page.verify_invoice_trash_page_displayed();
        trash_page.empty_trash();
    })

})