const TestRailReporter = require('cypress-testrail');

module.exports = (on, config) => {

    require('@cypress/grep/src/plugin')(config);
    const customComment = 'AUTOMATION Testing through Cypress';
    new TestRailReporter(on, config, customComment).register();
    return config
}