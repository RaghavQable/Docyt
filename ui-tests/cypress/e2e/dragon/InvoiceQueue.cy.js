
const login_page  = require("../../lib/common/login/login");
const dashboard_page = require("../../lib/phoenix/dashboard/dashboard");
const invoice_queue_page = require("../../lib/dragon/invoice_queue_service/invoice_queue_list");
const add_edit_invoice = require("../../lib/dragon/invoice_queue_service/add_edit_invoice");
const trash_page = require("../../lib/dragon/invoice_queue_service/trash");
const {navigate_to_business_path} = require("../../lib/common/navigation/navigation")
const time_helper = require("../../utils/time_helper");
const number_helper = require("../../utils/number_helper");
const data = Cypress.env('dragon');

describe("Invoice Queue", () => {
    it("C13216 C44 C28638 C37 C65: Add Invoice, Verify Invoice, Invoice Detail, Edit Invoice, Pay using Docyt Check and Delete Invoice", { tags: '@smoke'}, () => {
        const invoice_number = "INV_" + time_helper.get_epoch_time();
        const current_date = time_helper.get_current_date_of_month();
        const last_date_of_month = time_helper.get_last_date_of_current_month();
        const amount = number_helper.get_random_number(100000);
        const invoice = {
            "invoice_number": invoice_number,
            "payee": data['vendor2']['name'],
            "invoice_date": current_date,
            "due_date": last_date_of_month,
            "amount": amount,
            "address": data['vendor2']['city_pin'],
            "formatted_amount": number_helper.get_formatted_amount(amount)
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();

        // C13216 Add Invoice Manually
        invoice_queue_page.click_add_invoice_button()
        add_edit_invoice.verify_add_an_invoice_form_displayed()
        add_edit_invoice.fill_add_invoice_form_and_submit(invoice)
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_exists(invoice_number)

        // C44 Verify Invoice
        invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification')
        invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data")
        add_edit_invoice.verify_docyt_id_displayed();
        add_edit_invoice.click_mark_as_verified_button();
        cy.reload();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay')

        // C37 Edit Invoice
        invoice_queue_page.edit_invoice();
        cy.reload();
        invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification');

        // verify Invoice again
        invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data")
        add_edit_invoice.verify_docyt_id_displayed();
        add_edit_invoice.click_mark_as_verified_button();
        cy.reload();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay')

        // C28638 Pay by Docyt Check
+       invoice_queue_page.click_first_row_amount_dropdown_option("Pay by Docyt Check")
        add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page()
+       add_edit_invoice.verify_docyt_id_displayed();
        add_edit_invoice.verify_invoice_data_under_details_tab(invoice);

        // C37
        add_edit_invoice.click_generate_check_button();
        add_edit_invoice.verify_identity_and_generate_payment();
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business1_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_exists(invoice_number);

        invoice_queue_page.click_first_row_amount_dropdown_option("Cancel Payment");
        add_edit_invoice.click_confirm_from_cancel_payment_modal();
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.filter_by_invoice(invoice_number)

        // C65 Delete Invoice
        invoice_queue_page.delete_invoice(invoice_number)

        // Remove permanently
        navigate_to_business_path("ACCOUNTS_PAYABLE_TRASH", data['test_business1_id']);
        trash_page.verify_invoice_trash_page_displayed();
        trash_page.empty_trash();
    })

    it("C35 C139672 C25139 C336394: Upload invoice through browser(Pre_populate Department and CharofAccount), Preview Document in Invoice Queue", { tags: '@smoke'}, () => {

        const epoch_time = time_helper.get_epoch_time().toString()
        const invoice_number = "INV_" + epoch_time.substring(epoch_time.length - 4);
        const payee = data['vendor3']['payee']
        const file_name = data['vendor3']['file']
        const amount = data['vendor3']['amount']
        const format_amount = number_helper.get_formatted_amount(amount).slice(1);
        const chart_of_account = data['vendor3']['chart_of_account']

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.click_add_invoice_button()
        add_edit_invoice.verify_add_an_invoice_form_displayed()
        add_edit_invoice.select_file_from_computer_and_upload(file_name)
        add_edit_invoice.verify_auto_polpulated_data_in_form(payee, format_amount, chart_of_account) // C336394
        add_edit_invoice.fill_invoice_number(invoice_number);
        add_edit_invoice.click_save_and_close_button();
        invoice_queue_page.verify_invoice_queue_page_displayed();
        cy.reload();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_exists(invoice_number)
        invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification')
        invoice_queue_page.verify_invoice_chart_of_account(invoice_number, chart_of_account)
        invoice_queue_page.verify_preview_document(payee);
        invoice_queue_page.close_preview_document_modal();

        invoice_queue_page.delete_invoice(invoice_number)
    })

    it("C85544: Verify Add Invoice Button is enabled", { tags: '@smoke'}, () => {
        
        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();

        invoice_queue_page.verify_add_invoice_button_enabled();
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business1_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.verify_add_invoice_button_enabled();
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_STOPPED", data['test_business1_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.verify_add_invoice_button_enabled();
    })

    it("C41: Mark an invoice as paid by Credit Card", { tags: '@smoke'}, () => {

        const invoice_number = "INV_" + time_helper.get_epoch_time();
        const current_date = time_helper.get_current_date_of_month();
        const last_date_of_month = time_helper.get_last_date_of_current_month();
        const amount = number_helper.get_random_number(100000);
        const invoice = {
            "invoice_number": invoice_number,
            "payee": data['vendor2']['name'],
            "invoice_date": current_date,
            "due_date": last_date_of_month,
            "amount": amount,
            "address": data['vendor2']['city_pin'],
            "formatted_amount": number_helper.get_formatted_amount(amount)
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();

        invoice_queue_page.click_add_invoice_button()
        add_edit_invoice.verify_add_an_invoice_form_displayed()
        add_edit_invoice.fill_add_invoice_form_and_submit(invoice)
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_exists(invoice_number)

        invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification')
        invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data")
        add_edit_invoice.verify_docyt_id_displayed();
        add_edit_invoice.click_mark_as_verified_button();
        cy.reload();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay')

        invoice_queue_page.click_first_row_amount_dropdown_option("Mark as paid", "Credit Card")
        add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page()
        add_edit_invoice.verify_mark_as_paid_by_credit_card_modal_displayed()
        add_edit_invoice.sumbit_mark_as_paid_by_credit_card_modal(last_date_of_month, 'Credit Card(manual)')

        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business1_id']);
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_status(invoice_number, 'Paid')
        invoice_queue_page.verify_payment_method(invoice_number, 'Credit Card')

        invoice_queue_page.delete_invoice(invoice_number)
    })

    it("C134979: Add an invoice manually in PAID section", () => {
        const invoice_number = "INV_" + time_helper.get_epoch_time();
        const current_date = time_helper.get_current_date_of_month();
        const last_date_of_month = time_helper.get_last_date_of_current_month();
        const amount = number_helper.get_random_number(100000);
        const invoice = {
            "invoice_number": invoice_number,
            "payee": data['vendor2']['name'],
            "invoice_date": current_date,
            "due_date": last_date_of_month,
            "amount": amount,
            "address": data['vendor2']['city_pin'],
            "formatted_amount": number_helper.get_formatted_amount(amount)
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();

        invoice_queue_page.click_add_invoice_button()
        add_edit_invoice.verify_add_an_invoice_form_displayed()
        add_edit_invoice.fill_add_invoice_form_and_submit(invoice)
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id']);
        invoice_queue_page.filter_by_invoice(invoice_number)
        invoice_queue_page.verify_invoice_exists(invoice_number)
        invoice_queue_page.delete_invoice(invoice_number)
    })

    // C76607 Marking an invoice as Paid using Manual Check (use Exsiting Docyt check)

     it("C76607: Marking an invoice as Paid using Manual Check (use Exsiting Docyt check)",()=> {
        
        const invoice_number = "INV_" + time_helper.get_epoch_time();
        const current_date = time_helper.get_current_date_of_month();
        const last_date_of_month = time_helper.get_last_date_of_current_month();
        const amount = number_helper.get_random_number(100000);
        const checkNum = invoice_queue_page.get_random_number(100000);
        const invoice = {
            "invoice_number": invoice_number,
            "payee": data['vendor2']['name'],
            "invoice_date": current_date,
            "due_date": last_date_of_month,
            "amount": amount,
            "address": data['vendor2']['city_pin'],
            "formatted_amount": number_helper.get_formatted_amount(amount)
        }
        
        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
        invoice_queue_page.verify_invoice_queue_page_displayed();
        invoice_queue_page.click_add_invoice_button();
        add_edit_invoice.fill_add_invoice_form_and_submit(invoice);
        invoice_queue_page.click_on_first_row_amount_data();
        invoice_queue_page.click_on_amount_sub_option("Verify Data");
        add_edit_invoice.click_mark_as_verified_button();
        cy.reload();
        invoice_queue_page.click_on_first_row_amount_data();
        invoice_queue_page.click_on_mark_as_paid_sub_option("Mark as paid","Manual Check");
        add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page();
        invoice_queue_page.mark_as_paid_manual_flow(checkNum);
        invoice_queue_page.check_register_flow();


     })

     it.only("C18300: Cancel Docyt Check",()=>
        {
            {
                const invoice_number = "INV_" + time_helper.get_epoch_time();
                const current_date = time_helper.get_current_date_of_month();
                const last_date_of_month = time_helper.get_last_date_of_current_month();
                const amount = number_helper.get_random_number(100000);
                const invoice = {
                    "invoice_number": invoice_number,
                    "payee": data['vendor2']['name'],
                    "invoice_date": current_date,
                    "due_date": last_date_of_month,
                    "amount": amount,
                    "address": data['vendor2']['city_pin'],
                    "formatted_amount": number_helper.get_formatted_amount(amount)
                }
        
                login_page.login_and_navigate_to_business_path(data['email'], data['password'], "ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id'])
                invoice_queue_page.verify_invoice_queue_page_displayed();
        
                
                invoice_queue_page.click_add_invoice_button()
                add_edit_invoice.verify_add_an_invoice_form_displayed()
                add_edit_invoice.fill_add_invoice_form_and_submit(invoice)
                invoice_queue_page.filter_by_invoice(invoice_number)
                invoice_queue_page.verify_invoice_exists(invoice_number)
        
                
                invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification')
                invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data")
                add_edit_invoice.verify_docyt_id_displayed();
                add_edit_invoice.click_mark_as_verified_button();
                cy.reload();
                invoice_queue_page.filter_by_invoice(invoice_number)
                invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay')
                
        +       invoice_queue_page.click_first_row_amount_dropdown_option("Pay by Docyt Check")
                add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page()
        +       add_edit_invoice.verify_docyt_id_displayed();
                add_edit_invoice.verify_invoice_data_under_details_tab(invoice);
        
                // Pay by Docyt Check
                add_edit_invoice.click_generate_check_button();
                add_edit_invoice.verify_identity_and_generate_payment();
                navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business1_id']);
                invoice_queue_page.verify_invoice_queue_page_displayed();
                invoice_queue_page.filter_by_invoice(invoice_number)
                invoice_queue_page.verify_invoice_exists(invoice_number);
        
                invoice_queue_page.click_first_row_amount_dropdown_option("Cancel Payment");
                add_edit_invoice.click_confirm_from_cancel_payment_modal();
                navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id']);
                invoice_queue_page.verify_invoice_queue_page_displayed();
                invoice_queue_page.filter_by_invoice(invoice_number)
                invoice_queue_page.delete_invoice(invoice_number)
        
        }})

        
    

})