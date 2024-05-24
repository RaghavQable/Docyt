const login_page  = require("../../../lib/common/login/login");
const transactions_page  = require("../../../lib/phoenix/bank_accounts/transactions");
const trash_page = require("../../../lib/phoenix/bank_accounts/trash");
const uncategorized_transactions_page = require("../../../lib/lion/transactions/uncategorized_transactions");
const expenses_transactions_page = require("../../../lib/lion/transactions/expenses_transactions");
const receipt_list_page = require("../../../lib/dragon/receipt_box/receipt_list");
const add_edit_receipt = require("../../../lib/dragon/receipt_box/add_edit_receipt");
const receipt_trash_page = require("../../../lib/dragon/receipt_box/trash");
const invoice_queue_page = require("../../../lib/dragon/invoice_queue_service/invoice_queue_list");
const invoice_trash_page = require("../../../lib/dragon/invoice_queue_service/trash");

const add_edit_invoice = require("../../../lib/dragon/invoice_queue_service/add_edit_invoice");
const lion_api = require("../../../lib/api/lion");
const time_helper = require("../../../utils/time_helper");
const number_helper = require("../../../utils/number_helper");

const { navigate_to_business_path } = require("../../../lib/common/navigation/navigation");
const data = Cypress.env('lion');

const amounts = [(Math.random() * 100).toFixed(2), (Math.random() * 100).toFixed(2)];
const memo_prefix = Math.random().toString(36).substr(2, 10);

describe("Reconciliation Center / Transactions", () => {
	it("C9173: Automatic verification with pattern ( Auto pilot)", { tags: '@smoke'}, () => {

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business6_id'])
		transactions_page.verify_transactions_page_displayed();
    transactions_page.add_transaction(transactions_page.transaction_data(amounts[0], data['credit_cards']['test6_business_credit_card'], memo_prefix));

    navigate_to_business_path('RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS', data['test_business6_id']);
    uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
    uncategorized_transactions_page.expense_categorize_transaction(amounts[0], data['vendor2']['name']);

    navigate_to_business_path('RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES', data['test_business6_id']);
		expenses_transactions_page.verify_expenses_transactions_page_displayed();
    expenses_transactions_page.verify_expense_transaction_details(amounts[0])

    // update index
    lion_api.update_index(data['test_business6_id']);
  
    navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business6_id']);
    transactions_page.verify_transactions_page_displayed();
    transactions_page.add_transaction(transactions_page.transaction_data(amounts[1], data['credit_cards']['test6_business_credit_card'], memo_prefix));

    cy.reload();
    transactions_page.verify_transaction_type(amounts[1], 'Expense');

    // remove transactions
    transactions_page.move_to_trash_transactions(amounts);
		navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business6_id'])
		trash_page.verify_trash_page_displayed();
    trash_page.delete_transactions(data['email'], data['password'], data['test_business6_id'], amounts);
	})

  it("C2712: Automatic verification - Receipt and Transaction", () => {
    const amount = number_helper.get_random_number(100000);
    const formatted_amount = number_helper.get_formatted_amount(amount);

    const current_date = time_helper.get_current_date_of_month();
    const formatted_date = time_helper.get_formatted_date("MM/DD/YYYY");
    const payment_account = data['credit_cards']['test6_business_credit_card'];

    const receipt = {
      merchant: data['vendor2']['name'],
      amount: amount,
      formatted_amount: formatted_amount,
      date: current_date,
      formatted_date: formatted_date
    }

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business6_id'])
		transactions_page.verify_transactions_page_displayed();
    transactions_page.add_transaction(transactions_page.transaction_data(amount, data['credit_cards']['test6_business_credit_card']));

    navigate_to_business_path('RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS', data['test_business6_id']);
    uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
    uncategorized_transactions_page.expense_categorize_transaction(amount, data['vendor2']['name'], false);

    // add and verify receipt
    navigate_to_business_path('RECEIPT_BOX_RECEIPT_LIST', data['test_business6_id']);
    receipt_list_page.verify_receipt_list_page_displayed();
    receipt_list_page.click_add_receipt_button();
    add_edit_receipt.verify_add_receipt_form_displayed();
    add_edit_receipt.fill_add_receipt_form_and_submit(receipt);
    cy.reload();
    receipt_list_page.filter_by_amount(amount);
    receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);

    receipt_list_page.click_amount_dropdown_option(formatted_amount, 'Approve Receipt Data');
    add_edit_receipt.verify_receipt_details(receipt['merchant'], formatted_amount.slice(1), formatted_date);
    add_edit_receipt.select_payment_account(payment_account);
    add_edit_receipt.click_approve_receipt_review_next_button();
    receipt_list_page.verify_receipt_list_page_displayed();

    navigate_to_business_path("RECEIPT_BOX_RECEIPT_LIST_APPROVED", data['test_business6_id']);
    receipt_list_page.verify_receipt_list_page_displayed();
    receipt_list_page.filter_by_amount(amount);
    receipt_list_page.verify_receipt_exist_with_amount(formatted_amount);
  
    // verify transaction is auto verified
    navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business6_id']);
    transactions_page.verify_transactions_page_displayed();
    transactions_page.verify_transaction_type(amount, 'Expense');
    
    // remove transactions
    transactions_page.move_to_trash(amount);
		navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business6_id'])
		trash_page.verify_trash_page_displayed();
    trash_page.delete_transaction(data['email'], data['password'], data['test_business6_id'], amount);

    // remove receipt
    navigate_to_business_path("RECEIPT_BOX_RECEIPT_LIST_APPROVED", data['test_business6_id']);
    receipt_list_page.verify_receipt_list_page_displayed();
    receipt_list_page.delete_receipt_with_amount(formatted_amount);

    navigate_to_business_path("RECEIPT_BOX_TRASH", data['test_business6_id']);
    receipt_trash_page.verify_receipt_trash_page_displayed();
    receipt_trash_page.empty_trash();
	})

  it("C2242: Automatic matching - Invoice and Transaction", () => {
    const current_date = time_helper.get_current_date_of_month();
    const last_date_of_month = time_helper.get_last_date_of_current_month();
    const amount = number_helper.get_random_number(100000);
    const transaction_data = transactions_page.transaction_data(amount, data['credit_cards']['test6_business_credit_card'], memo_prefix)
    const invoice_number = transaction_data['memo'];

    const invoice = {
        "invoice_number": invoice_number,
        "payee": data['vendor2']['name'],
        "invoice_date": current_date,
        "due_date": last_date_of_month,
        "amount": amount,
        "formatted_amount": number_helper.get_formatted_amount(amount)
    }

		login_page.login_and_navigate_to_business_path(data['email'], data['password'], "BANKING_ACCOUNTS_TRANSACTIONS", data['test_business6_id'])
		transactions_page.verify_transactions_page_displayed();
    
    transactions_page.add_transaction(transaction_data);

    navigate_to_business_path('RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS', data['test_business6_id']);
    uncategorized_transactions_page.verify_uncategorized_transactions_page_displayed();
    uncategorized_transactions_page.expense_categorize_transaction(amount, data['vendor2']['name']);

    navigate_to_business_path('ACCOUNTS_PAYABLE_INVOICE_QUEUE', data['test_business6_id']);
    // add invoice
    invoice_queue_page.click_add_invoice_button()
    add_edit_invoice.verify_add_an_invoice_form_displayed()
    add_edit_invoice.fill_add_invoice_form_and_submit(invoice)
    invoice_queue_page.filter_by_invoice(invoice_number)
    invoice_queue_page.verify_invoice_exists(invoice_number)
    // verify invoice
    invoice_queue_page.verify_invoice_status(invoice_number, 'In Verification')
    invoice_queue_page.click_first_row_amount_dropdown_option("Verify Data")
    add_edit_invoice.verify_docyt_id_displayed();
    add_edit_invoice.click_mark_as_verified_button();
    cy.reload();
    invoice_queue_page.filter_by_invoice(invoice_number)
    invoice_queue_page.verify_invoice_status(invoice_number, 'Ready to Pay')

    // pay by credit card
    invoice_queue_page.click_first_row_amount_dropdown_option("Mark as paid", "Credit Card")
    add_edit_invoice.click_continue_button_from_multiple_unpaid_invoices_detected_page()
    add_edit_invoice.verify_mark_as_paid_by_credit_card_modal_displayed()
    add_edit_invoice.sumbit_mark_as_paid_by_credit_card_modal(last_date_of_month,  data['credit_cards']['test6_business_credit_card'])

    navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business6_id']);
    invoice_queue_page.verify_invoice_queue_page_displayed();
    invoice_queue_page.filter_by_invoice(invoice_number)
    invoice_queue_page.verify_invoice_status(invoice_number, 'Paid')
    invoice_queue_page.verify_payment_method(invoice_number,  data['credit_cards']['test6_business_credit_card'])
    
    // verify transaction is auto verified
    navigate_to_business_path('BANKING_ACCOUNTS_TRANSACTIONS', data['test_business6_id']);
    transactions_page.verify_transactions_page_displayed();
    transactions_page.verify_transaction_type(amount, 'Expense');
    
    // remove transactions
    transactions_page.move_to_trash(amount);
		navigate_to_business_path('BANKING_ACCOUNTS_TRASH', data['test_business6_id'])
		trash_page.verify_trash_page_displayed();
    trash_page.delete_transaction(data['email'], data['password'], data['test_business6_id'], amount);

    // remove invoice
    navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_PAID", data['test_business6_id']);
    invoice_queue_page.verify_invoice_queue_page_displayed();
    invoice_queue_page.filter_by_invoice(invoice_number)
    invoice_queue_page.delete_invoice(invoice_number)
    navigate_to_business_path("ACCOUNTS_PAYABLE_TRASH", data['test_business6_id']);
    invoice_trash_page.verify_invoice_trash_page_displayed();
    invoice_trash_page.empty_trash();
	})
})