
const paths = {
  SIGN_IN: '/sign_in',
  DASHBOARD_ACCOUNTING : '/dashboard?tab=ACCOUNTING',
  BUSINESS_DASHBOARD: "/",

  ////////////////////// ACCOUNTS PAYABLE /////////////////////
  ACCOUNTS_PAYABLE_SUMMARY: '/accounts_payable',
  ACCOUNTS_PAYABLE_INVOICE_QUEUE: '/accounts_payable/queue?type=queued',
  ACCOUNTS_PAYABLE_INVOICE_PAID: '/accounts_payable/queue?type=paid',
  ACCOUNTS_PAYABLE_INVOICE_STOPPED: '/accounts_payable/queue?type=stopped',
  ACCOUNTS_PAYABLE_CHECK_REGISTER: '/accounts_payable/check_registers',
  ACCOUNTS_PAYABLE_SETTLEMENT_ITEMS: '/accounts_payable/settlement_items?type=settle_queued',
  ACCOUNTS_PAYABLE_PAYEES: '/accounts_payable/payees',
  ACCOUNTS_PAYABLE_PAYMENT_RULES: '/accounts_payable/rules',
  ACCOUNTS_PAYABLE_SETTINGS: '/accounts_payable/settings',
  ACCOUNTS_PAYABLE_TRASH: '/accounts_payable/settings/trash',

  ///////////////// RECEIPT BOX ///////////////////////
  RECEIPT_BOX_RECEIPT_LIST: '/receipt_box/queue?type=unverified',
  RECEIPT_BOX_RECEIPT_LIST_APPROVED: '/receipt_box/queue?type=verified',
  RECEIPT_BOX_MERCHANTS: '/receipt_box/merchants',
  RECEIPT_BOX_SETTINGS: '/receipt_box/settings',
  RECEIPT_BOX_TRASH: '/receipt_box/settings/trash',

  ///////////////// BUSINESS REPORTS //////////////////
  BUSINESS_REPORTS_BASIC: '/reports?category=basic',
  BUSINESS_REPORTS_REVENUE: '/reports?category=revenue',
  BUSINESS_REPORTS_EXPENSE: '/reports?category=expense',
  BUSINESS_REPORTS_MANAGEMENT_REPORT: '/reports?category=management',
  BUSINESS_REPORTS_DEPARTMENTAL_REPORTS: '/reports?category=department',
  BUSINESS_REPORTS_BUDGET_AND_FORECAST: '/reports/budgets',

  ///////////////// BUSINESS MAILROOM /////////////////
  BUSINESS_MAILROOM_INBOX: '/business_inbox',
  BUSINESS_MAILROOM_TRASH: '/business_inbox/trash',

  ///////////////// REVENUE CENTER ////////////////////
  REVENUE_CENTER_SUMMARY: '/revenue_service',
  REVENUE_CENTER_MONTHLY_REPORTS: '/revenue_service/reports',
  REVENUE_CENTER_DAILY_REPORTS: '/revenue_service/reports_daily',
  REVENUE_CENTER_UNVERIFIED_REPORTS: '/revenue_service/unverified',
  REVENUE_CENTER_SETTINGS: '/revenue_service/settings',

  ///////////////// RECONCILIATION CENTER /////////////
  RECONCILIATION_CENTER_SUMMARY: '/reconciliation_center',
  RECONCILIATION_CENTER_UNCATEGORIZED_TRANSACTIONS: '/reconciliation_center/transactions?type=unverified',
  RECONCILIATION_CENTER_UNCLEARED_DOCUMENTS: '/reconciliation_center/documents',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_EXPENSES: '/reconciliation_center/expenses',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_INCOME: '/reconciliation_center/revenue',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_BANK_TRANSFERS: '/reconciliation_center/bank_transfers',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_PAYROLL_CHARGES: '/reconciliation_center/payroll',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_EQUITY_LIABILITIES_ASSETS: '/reconciliation_center/equity',
  RECONCILIATION_CENTER_TRANSACTION_TYPES_LOAN_PAYMENTS: '/reconciliation_center/loan_payments',
  RECONCILIATION_CENTER_CHART_OF_ACCOUNTS: '/reconciliation_center/categories',
  RECONCILIATION_CENTER_SETTINGS: '/reconciliation_center/settings',
  RECONCILIATION_CENTER_ALL_TRANSACTIONS: '/reconciliation_center/all_transactions',

  ///////////////// BANKING ACCOUNTS //////////////////
  BANKING_ACCOUNTS_SUMMARY: '/banking_accounts',
  BANKING_ACCOUNTS_TRANSACTIONS: '/banking_accounts/transactions?transaction_date_order=desc',
  BANKING_ACCOUNTS_ACCOUNTS: '/banking_accounts/accounts',
  BANKING_ACCOUNTS_CSV_IMPORT: '/banking_accounts/transaction_imports',
  BANKING_ACCOUNTS_TRASH: '/banking_accounts/trash?transaction_date_order=desc',

  ///////////////// EXPENSE REPORTS ///////////////////
  EXPENSE_REPORTS_MY_EXPENSES: '/expense_reports',
  EXPENSE_REPORTS_EMPLOYEE_EXPENSES: '/expense_reports/employees',
  EXPENSE_REPORTS_CATEGORY_MANAGEMENT: '/expense_reports/category_management',
  EXPENSE_REPORTS_SETTINGS: '/expense_reports/settings',
  EXPENSE_REPORTS_MY_EXPENSES_SUBMITTED: '/expense_reports/expenses?type=submitted',

  ///////////////// ACCOUNTS RECEIVABLE ///////////////
  ACCOUNTS_RECEIVABLE_INVOICES: '/accounts_receivable_service/invoices?type=completed',
  ACCOUNTS_RECEIVABLE_PAYMENTS: '/accounts_receivable_service/payments',
  ACCOUNTS_RECEIVABLE_CREDIT_MEMO: '/accounts_receivable_service/credit-memos',
  ACCOUNTS_RECEIVABLE_CUSTOMERS: '/accounts_receivable_service/customers',
  ACCOUNTS_RECEIVABLE_MY_VENDOR_PROFILE: '/accounts_receivable_service/vendor_profile',
  ACCOUNTS_RECEIVABLE_SETTINGS: '/accounts_receivable_service/settings',

  ///////////////// VENDORS ///////////////////////////
  VENDORS_MY_VENDORS: '/vendor_service',
  VENDORS_DOCYT_BUSINESS_NETWORK: '/vendor_service/docyt_network',
  VENDORS_1099_REPORTS: '/vendor_service/1099_reports',

  ///////////////// SETTINGS //////////////////////////
  SETTINGS_TEAM_MANAGEMENT: '/settings/team_management',
  USER_SETTINGS_CLIENT_MANAGEMENT: '/client_management',
  USER_SETTINGS_SECURITY_PRIVACY: '/security',
  SETTINGS_PERSONAL_PROFILE: '/settings',
  SETTINGS_MY_BUSINESSES: '/settings/businesses',
  SETTINGS_MANAGEMENT_GROUP: '/settings/management_groups',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  SETTINGS_SECURITY_AND_PRIVACY: '/settings/security',
  SETTINGS_MY_TEAM: '/settings/team_management',
  SETTINGS_INTEGRATIONS: '/settings/integrations',
  SETTINGS_CLIENT_MANAGEMENT: '/settings/client_management',

  ///////////////// QUICKBOOKS CONNECTION CENTER //////////////////////////
  QUICKBOOKS_CONNECTION_CENTER: '/quickbooks_center',

  ///////////////// MY_NOTIFICATIONS //////////////////////////
  MY_NOTIFICATIONS: '/my_notifications'
}


function navigate_to(path, custom_path=null) {
    let final_path = Cypress.env("baseUrl") + paths[path]
    if (custom_path) {
        final_path = final_path + custom_path
    }
    cy.visit(final_path)
}

function navigate_to_business_path(path, business_id) {
    const final_path = `${Cypress.env("baseUrl")}/businesses/${business_id}${paths[path]}`
    cy.visit(final_path)
}

function navigate_settings_page(business_id, step) {
    let final_path = `${Cypress.env("baseUrl")}/setup-business/${business_id}`
    if (step) {
        final_path = `${final_path}?step=${step}`
    }
    cy.visit(final_path)
}

function navigate_client_business_settings_page(client_business_id, accounting_firm_business_id, step) {
    let final_path = `${Cypress.env("baseUrl")}/setup-client-business/${client_business_id}?accounting_firm_business_id=${accounting_firm_business_id}`
    if (step) {
        final_path = `${final_path}&step=${step}`
    }
    cy.visit(final_path)
}


module.exports = {
    navigate_to,
    navigate_to_business_path,
    navigate_settings_page,
    navigate_client_business_settings_page
};
  