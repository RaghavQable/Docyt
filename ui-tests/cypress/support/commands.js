// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
/// <reference types="@cypress/xpath" />

import '@cypress/xpath';
import 'cypress-wait-until';
import 'cypress-if';
import "cypress-real-events";
import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()

Cypress.Commands.add('register_commands', () => {
    ///////////////////////// LOCATORS LIST ////////////////////////////
    let locator_list = {
        ////////////////////// GENERAL  ///////////////////////
        'any_by_id':                        (text)          => cy.get("#" + text),
        'any_by_containing_class':          (text)          => cy.get("." + text),
        'any_by_text':                      (text)          => cy.xpath(`//*[normalize-space(text())='${text}']`),   
        'any_corresponding_to_label':       (label, text)   => cy.xpath(`(//*[normalize-space(text())='${label}']/..//*[normalize-space(text())='${text}'])[1]`),
        'div_loading_spinner':              ()              => cy.xpath("//div[contains(@class, 'spinner-overlay') or contains(@class, 'spinner-local-overlay')]"),
        'div_toast_message':                (text)          => cy.xpath(`//div[contains(@class, 'toast-message') and normalize-space(text())='${text}']`),
        'div_vendor_name' :                 (text)          => cy.xpath(`(//div[contains(@id,'${text}')]//td[contains(@class,'pointer')]/div)[2]`), 
        'div_contain_class':                (text)          => cy.xpath(`//div[contains(@class,'${text}')]`),
        'div_contain_span_text':            (label,text)    => cy.xpath(`//div[contains(@class,'${label}')]//span[text()='${text}']`),
        'div_by_following_a':               (text)          => cy.xpath(`(//div[text()='${text}']/following::a)[1]`),
        'div_by_parent_a':                  (text)          => cy.xpath(`(//div[text()='${text}']/parent::a)[1]`),
        'table_by_following_a':             (text)          => cy.xpath(`//table//a[contains(@id,'${text}')]`),

        ////////////////////// IMAGE  /////////////////////////
        'img_docyt_logo':                   ()              => cy.xpath("//a[contains(@class,'header-logo')]/img"),

        ////////////////////// HEADING ////////////////////////
        'h1_by_text':                       (text)          => cy.xpath(`//h1[normalize-space(text())='${text}']`),
        'h2_by_text':                       (text)          => cy.xpath(`//h2[normalize-space(text())='${text}']`),
        'h2_by_containing_text':            (text)          => cy.xpath(`//h2[contains(text(), '${text}')]`),
        'h3_by_text':                       (text)          => cy.xpath(`//h3[normalize-space(text())='${text}']`),
        'h4_by_text':                       (text)          => cy.xpath(`//h4[normalize-space(text())='${text}']`),
        'h5_by_text':                       (text)          => cy.xpath(`//h5[normalize-space(text())='${text}']`),

        ////////////// INPUT / SELECT / TEXTAREA //////////////
        'input_by_placeholder':             (text)          => cy.xpath(`//input[@placeholder='${text}']`),
        'input_by_label':                   (text)          => cy.xpath(`//*[(self::div or self::label) and normalize-space(text())="${text}"]/..//input`),
        'input_by_id':                      (text)          => cy.xpath(`//input[@id='${text}']`),
        'input_by_containing_class':        (text)          => cy.xpath(`(//input[contains(@class, '${text}')])[1]`),
        'input_by_containing_id':           (text)          => cy.xpath(`(//input[contains(@id, '${text}')])[1]`),
        'input_checkbox':                   ()              => cy.xpath(`(//input[@type='checkbox'])[1]`),
        'input_file_type':                  ()              => cy.xpath(`(//input[@type='file'])[1]`),
        'input_by_name':                    (text)          => cy.xpath(`//input[@name='${text}']`),
        'input_by_value':                   (text)          => cy.xpath(`//input[@value='${text}']`),
        'input_by_type':                    (text)          => cy.xpath(`//input[@type='${text}']`),
        'input_datepicker':                 (text)          => cy.xpath(`//div[contains(@class, 'datepicker') and contains(@style, 'block')]//td[@class='day' and text()='${text}']`),
        'select_by_label':                  (text)          => cy.xpath(`//*[(self::div or self::label) and normalize-space(text())="${text}"]/..//select`),
        'select_by_option':                 (text)          => cy.xpath(`//option[normalize-space(text())='${text}']/parent::select`),
        'option_by_text':                   (text)          => cy.xpath(`//option[normalize-space(text())='${text}']`),
        'textarea_by_label':                (text)          => cy.xpath(`//*[(self::div or self::label) and normalize-space(text())='${text}']/..//textarea`),
        'add_invoice_input':                (text)          => cy.xpath(`(//div[text()='${text}']/following::div//input)`).eq(0),
        'input_by_containing_text_label':   (text)          => cy.xpath(`//label[normalize-space(text())='${text}']/following-sibling::input`),
        'vendor_checkbox':                  ()              => cy.xpath(`(//table//div[contains(@class,'checkbox')])[2]`),              

        ////////////////////  ANCHOR  /////////////////////////
        'a_by_text':                        (text)          => cy.xpath(`(//a[normalize-space(text())='${text}']|//*[normalize-space(text())='${text}']/ancestor::a)[1]`),
        'a_by_containing_text':             (text)          => cy.xpath(`//a[contains(text(), '${text}')]`),
        'a_by_containing_class':            (text)          => cy.xpath(`//a[contains(@class,'${text}')]`),
        'a_by_text_and_index':              (text, index)   => cy.xpath(`(//a[normalize-space(text())='${text}']|//*[normalize-space(text())='${text}']/ancestor::a)[${index}]`),
        'a_corresponding_to_label':         (text)          => cy.xpath(`//*[(self::div or self::label) and normalize-space(text())='${text}']/..//a[normalize-space(text())='${text}']`),
        'a_by_href':                        (text)          => cy.xpath(`//a[normalize-space(@href)='${text}']`),
        'a_by_icon':                        (text)          => cy.xpath(`//*[(self::span or self::i) and contains(@class, '${text}')]/ancestor::a`),
        'select_category':                  (text)          => cy.xpath(`//a[contains(text(),'${text}')]`) ,
        'a_by_containing_id':               (text)          => cy.xpath(`(//a[contains(@id,'${text}')])`) ,
        'a_by_containing_dot':              (text)          => cy.xpath(`//a[contains(., '${text}')]`) ,
        'a_by_containing_list_option':      (text)          => cy.xpath(`(//table//li//div[contains(text(),'${text}')]/parent::a)[1]`),

        ////////////////////// BUTTON /////////////////////////
        'button_by_text':                   (text)          => cy.xpath(`(//button[normalize-space(text())='${text}']|//*[normalize-space(text())='${text}']/ancestor::button)[1]`),
        'button_by_containing_text':        (text)          => cy.xpath(`(//button[contains(text(), '${text}')])[1]`),
        'button_by_containing_class':       (text)          => cy.xpath(`//button[contains(@class,'${text}')]`),
        'button_by_containing_id':          (text)          => cy.xpath(`//button[contains(@id,'${text}')]`),
        'button_by_icon':                   (text)          => cy.xpath(`//*[(self::a or self::span) and contains(@class, '${text}')]/ancestor::button`),
        'button_by_title':                  (text)          => cy.xpath(`//button[@title='${text}']`),
        'button_by_type':                   (text)          => cy.xpath(`//button[@type='${text}']`),
        'button_by_id':                     (text)          => cy.xpath(`//button[@id='${text}']`),
        'button_by_data_id':                (text)          => cy.xpath(`//button[@data-id="${text}"]`),

        /////////// SPAN / PARAGRAPH / LABEL TEXT  ////////////
        'span_by_text':                       (text)        => cy.xpath(`//span[normalize-space(text())='${text}']`),
        'span_by_containing_class':           (text)        => cy.xpath(`//span[contains(@class,'${text}')]`),
        'span_by_data_title':                 (text)        => cy.xpath(`//span[normalize-space(@data-title)='${text}']`),
        'p_by_text':                          (text)        => cy.xpath(`//p[normalize-space(text())='${text}']`),
        'p_by_containing_text':               (text)        => cy.xpath(`//p[text()[contains(.,'${text}')]]`),
        'label_by_text':                      (text)        => cy.xpath(`//label[normalize-space(text())='${text}']`),
        'label_by_containing_class_and_text': (class_name, text)    => cy.xpath(`//label[contains(@class, '${class_name}') and normalize-space(text())='${text}']`),
        'label_by_for':                       (text)        => cy.xpath(`//label[@for='${text}']`),
        'strong_by_text':                     (text)        => cy.xpath(`(//strong[normalize-space(text())='${text}'])[1]`),
        'dropdown_list_option':               (text)        =>  cy.xpath(`//span[contains(.,'${text}')]/ancestor::a`),
        'span_by_anchor':                     (text,n)        =>  cy.xpath(`(//span[text()='${text}']/ancestor::a)[${n}]`),

        //////////////////// DIV CONTAINER ////////////////////
        'div_by_text':                      (text)          => cy.xpath(`//div[normalize-space(text())="${text}"]`),
        'div_by_containing_class':          (text)          => cy.xpath(`(//div[contains(@class, '${text}')])[1]`),
        'div_by_id':                        (text)          => cy.xpath(`//div[@id='${text}']`),
        'div_by_containing_class_and_text': (class_name, text)  => cy.xpath(`//div[contains(@class, '${class_name}') and normalize-space(text())='${text}']`),

        ////////////////////// IFRAME /////////////////////////
        'iframe_by_containing_class':       (text)          => cy.xpath(`//iframe[contains(@class, '${text}')]`),
        'iframe_by_id':                     (text)          => cy.xpath(`//iframe[@id='${text}']`),

        //////////////////// TABLE ELEMENTS ///////////////////
        // Match all table headings
        'th_div_all_table_headings':                    ()                      => cy.xpath("//*[((self::div and contains(@class, 'table-column')) or self::th)]"),
        // Match any table Heading by its text
        'th_div_table_heading':                         (text)                  => cy.xpath(`//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${text}']`),
        // Get all preceding column headings of any provided column heading
        'th_div_preceding_table_headings':              (text)                  => cy.xpath(`//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${text}']/preceding-sibling::*`),
        // Match any element by text under a particular column heading
        'any_match_table_heading_by_table_data':        (column_name, text)     => cy.xpath(`//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${text}']`),
        // Match any element by text under a particular column number
        'any_match_column_num_by_table_data':           (column_num, text)      => cy.xpath(`//*[(self::div and contains(@class, 'table-column')) or self::td][${column_num}]//*[normalize-space(text())='${text}']|//*[((self::div and contains(@class, 'table-column')) or self::td) and normalize-space(text())='${text}']`),
        // Match any table cell by its element text under a particular column heading
        'td_div_table_cell_by_matching_column_data':    (column_name, text)     => cy.xpath(`//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${text}']/ancestor::*[(self::div and contains(@class, 'table-column')) or self::td]`),
        // Match any table row by element text under a particular column heading
        'tr_div_table_row_by_matching_column_data':     (column_name, text)     => cy.xpath(`//*[(self::div and contains(@class, 'table-row')) or self::tr][count(//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${text}']/ancestor::*[(self::div and contains(@class, 'table-row')) or self::tr]/preceding-sibling::*)+1]`),
        // Get all preceding rows of row with matching text under a column number
        'tr_div_preceding_table_rows':                  (column_num, text)      => cy.xpath(`//*[(self::div and contains(@class, 'table-column')) or self::td][${column_num}]//*[normalize-space(text())='${text}']/ancestor::*[(self::div and contains(@class, 'table-row')) or self::tr]/preceding-sibling::*`),
        // Match any text element under a column 2 corresponding to another text element under other column 1
        'any_match_table_data_by_corresponding_row_col':(column1_name, column1_text, column2_name, column2_text) => cy.xpath(`//*[(self::div and contains(@class, 'table-row')) or self::tr][count(//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column1_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${column1_text}']/ancestor::*[(self::div and contains(@class, 'table-row')) or self::tr]/preceding-sibling::*)+1]//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column2_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${column2_text}']`),
        // Match table cell under a column 2 corresponding to another text element under another column 1
        'td_div_table_cell_by_corresponding_row_col':   (column1_name, column1_text, column2_name)               => cy.xpath(`//*[(self::div and contains(@class, 'table-row')) or self::tr][count(//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column1_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${column1_text}']/ancestor::*[(self::div and contains(@class, 'table-row')) or self::tr]/preceding-sibling::*)+1]//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column2_name}']/preceding-sibling::*)+1]`),
        // Match table cell under a column 2 number corresponding to text element under another column 1
        'td_div_table_cell_index_by_corresponding_row_col': (column1_name, column1_text, column2_num)            => cy.xpath(`//*[(self::div and contains(@class, 'table-row')) or self::tr][count(//*[(self::div and contains(@class, 'table-column')) or self::td][count(//*[((self::div and contains(@class, 'table-column')) or self::th) and normalize-space(text())='${column1_name}']/preceding-sibling::*)+1]//*[normalize-space(text())='${column1_text}']/ancestor::*[(self::div and contains(@class, 'table-row')) or self::tr]/preceding-sibling::*)+1]//*[(self::div and contains(@class, 'table-column')) or self::td][${column2_num}]`), 
        // Match any table cell by row number and column number
        'td_div_table_cell_by_row_col':                 (row_num, column_num)   => cy.xpath(`//*[(self::div and contains(@class, 'table-row')) or self::tr][${row_num}]//*[(self::div and contains(@class, 'table-column')) or self::td][${column_num}]`),
        // Get all Cells under a column
        'td_div_all_column_cells':                      (column_num)            => cy.xpath(`//*[(self::div and contains(@class, 'table-column')) or self::td][${column_num}]`),
        // Get Table cell by its text
        'td_by_text':                                   (text)                  => cy.xpath(`(//td[normalize-space(text())='${text}'])[1]`),
        'get_invoice_amount_data':                      ()                      => cy.xpath(`(//table//td[contains(@class,'invoice-amount')]//button)[1]`),  
        'get_first_raw_data_in_table':                  (text)                  => cy.xpath(`(//td[contains(@class,'${text}')]/span)[1]`)
    
    
    }

    for (const op in locator_list) {
        if (locator_list.hasOwnProperty(op)) {
            const func = locator_list[op];
            switch(func.length) {
                case 0:
                    Cypress.Commands.add(op, () => {
                        return func();
                    })
                    Cypress.Commands.add('wait_until_visible_' + op, () => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func().should('be.visible');
                        }, {timeout: 30000, interval: 1000})
                    })
                    Cypress.Commands.add('wait_until_disappear_' + op, () => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func().should('have.length', 0);
                        }, {timeout: 30000, interval: 1000})
                    })
                    break;
                case 1:
                    Cypress.Commands.add(op, (text) => {
                        return func(text);
                    })
                    Cypress.Commands.add('wait_until_visible_' + op, (text) => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func(text).should('be.visible');
                        }, {timeout: 30000, interval: 1000})
                    })
                    Cypress.Commands.add('wait_until_disappear_' + op, (text) => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func(text).should('not.be.visible');
                        }, {timeout: 30000, interval: 1000})
                    })
                    break;
                case 2:
                    Cypress.Commands.add(op, (text1, text2) => {
                        return func(text1, text2);
                    })
                    Cypress.Commands.add('wait_until_visible_' + op, (text1, text2) => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func(text1, text2).should('be.visible');
                        }, {timeout: 30000, interval: 1000})
                    })
                    Cypress.Commands.add('wait_until_disappear_' + op, (text1, text2) => {
                        cy.wait(1000);
                        cy.waitUntil(function() {
                            return func(text1, text2).should('have.length', 0);
                        }, {timeout: 30000, interval: 1000})
                    })
                    break;
                case 3:
                    Cypress.Commands.add(op, (text1, text2, text3) => {
                        return func(text1, text2, text3);
                    })
                    break;
                case 4:
                    Cypress.Commands.add(op, (text1, text2, text3, text4) => {
                        return func(text1, text2, text3, text4);
                    })
                    break;
                default:
                    cy.log("Incorrect length of locator function")
            }
        }
    }
});

Cypress.Commands.add('getIframeBody', (iframe_key) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get(iframe_key)
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
})
