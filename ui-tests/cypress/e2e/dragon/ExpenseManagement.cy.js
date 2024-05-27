
const login_page  = require("../../lib/common/login/login");
const expense_page = require("../../lib/dragon/expense_management/my_expenses");
const add_edit_expense = require("../../lib/dragon/expense_management/add_edit_expense");

const {navigate_to_business_path} = require("../../lib/common/navigation/navigation")
const time_helper = require("../../utils/time_helper");
const number_helper = require("../../utils/number_helper");
const data = Cypress.env('dragon');

describe("Expense Management", () => {

    it("C9169: Add Expense", { tags: '@smoke'}, () => {

        const current_date = time_helper.get_current_date_of_month();
        const amount = number_helper.get_random_number(100000);
        const formatted_amount = number_helper.get_formatted_amount(amount);
        const expense_file = data['receipt1']['file'];
        const expense = {
            "merchant": data['vendor4']['name'],
            "payment_date": current_date,
            "amount": amount
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "EXPENSE_REPORTS_MY_EXPENSES", data['test_business1_id'])
        expense_page.verify_my_expenses_page_displayed();
        expense_page.click_add_expense_button();
        add_edit_expense.verify_add_employee_expense_form_displayed();
        add_edit_expense.select_file_from_computer_and_upload(expense_file);
        add_edit_expense.fill_add_employee_expense_form_and_Submit(expense);
        cy.reload();
        expense_page.filter_by_amount(amount.toString(), amount.toString());
        expense_page.verify_expense_merchant(formatted_amount, expense["merchant"]);
        expense_page.delete_expense(amount);

        
    })


    it.only("C9171: Submit Expense",{tags: '@smoke'},()=>
    {
        const current_date = time_helper.get_current_date_of_month();
        const amount = number_helper.get_random_number(100000);
        const formatted_amount = number_helper.get_formatted_amount(amount);
        const expense_file = data['receipt1']['file'];
        const expense = {
            "merchant": data['vendor4']['name'],
            "payment_date": current_date,
            "amount": amount
        }

        login_page.login_and_navigate_to_business_path(data['email'], data['password'], "EXPENSE_REPORTS_MY_EXPENSES", data['test_business1_id'])
        expense_page.verify_my_expenses_page_displayed();
        expense_page.click_add_expense_button();
        add_edit_expense.verify_add_employee_expense_form_displayed();
        add_edit_expense.select_file_from_computer_and_upload(expense_file);
        add_edit_expense.fill_add_employee_expense_form_and_Submit(expense);
        cy.reload();
        expense_page.filter_by_amount(amount.toString(), amount.toString());
        expense_page.verify_expense_merchant(formatted_amount, expense["merchant"]);
        expense_page.click_first_row_amount_dropdown_option('Submit Expense');
        navigate_to_business_path("EXPENSE_REPORTS_MY_EXPENSES_SUBMITTED", data['test_business1_id']);
        expense_page.filter_by_amount(amount.toString(), amount.toString());
        expense_page.verify_expense_merchant(formatted_amount, expense["merchant"]);
        navigate_to_business_path("ACCOUNTS_PAYABLE_INVOICE_QUEUE", data['test_business1_id']);
        
        
       
        })


})