const { defineConfig } = require("cypress");
const settings_common = require("./settings.common.js");
const docyt_common = require("./docyt.common.js");
const qa_common = require("./env.qa.common.js");
const team_dragon_common = require("./team.dragon.common.js");
const team_garuda_common = require("./team.garuda.common.js");
const team_lion_common = require("./team.lion.common.js");
const team_panda_common = require("./team.panda.common.js");
const team_phoenix_common = require("./team.phoenix.common.js");

module.exports = defineConfig({
  projectId: 'tariay',
  ...settings_common,

  env: {
    ...docyt_common,
    ...qa_common,
    dragon:{
      email: "automation+dragon@docyt.com",
      name: "Dragon Tester",
      password: "Test123$",
      test_business1_id: 2594,
      test_business1_name: "Dragon Business 1",
      test_business2_id: 2596,
      test_business2_name: "Dragon Business 2",
      test_business3_id: 2597,
      test_business3_name: "Dragon Business 3",
      test_business4_id: 2598,
      test_business4_name: "Dragon Business 4",
      test_business5_id: 2599,
      test_business5_name: "Dragon Business 5",
      test_business6_id: 2600,
      test_business6_name: "Dragon Business 6",
      ...team_dragon_common
    },
    garuda: {
      email: "automation+garuda@docyt.com",
      password: "Test123$",
      test_business1_id: 2620,
      test_business1_name: "Garuda Business 1",
      test_business2_id: 2622,
      test_business2_name: "Garuda Business 2",
      test_business3_id: 2623,
      test_business3_name: "Garuda Business 3",
      test_business4_id: 2624,
      test_business4_name: "Garuda Business 4",
      test_business6_id: 2525,
      test_business6_name: "Garuda Business 6",
      ...team_garuda_common
    },
    lion: {
      email: "automation+lion@docyt.com",
    password: "Test123$",
    test_business1_id: 2601,
    test_business1_name: "Lion Business 1",
    test_business2_id: 2602,
    test_business2_name: "Lion Business 2",
    test_business3_id: 2603,
    test_business3_name: "Lion Business 3",
    test_business4_id: 2604,
    test_business4_name: "Lion Business 4",
    test_business5_id: 2605,
    test_business5_name: "Lion Business 5",
    test_business6_id: 2606,
    test_business6_name: "Lion Business 6",
      ...team_lion_common
    },
    panda: {
      email: "automation+panda@docyt.com",
      password: "Test123$",
      test_business1_id: 2626,
      test_business1_name: "Panda Business 1",
      test_business2_id: 2628,
      test_business2_name: "Panda Business 2",
      test_business3_id: 2629,
      test_business3_name: "Panda Business 3",
      test_business4_id: 2630,
      test_business4_name: "Panda Business 4",
      test_business5_id: 2631,
      test_business5_name: "Panda Business 5",
      test_business6_id: 2632,
      test_business6_name: "Panda Business 6",
      ...team_panda_common
    },
    phoenix: {
      email: "automation+phoenix@docyt.com",
      password: "Test123$",
      user_name: 'Phoenix Tester',
      test_business1_id: 2607,
      test_business1_name: "Phoenix Business 1",
      test_business2_id: 2609,
      test_business2_name: "Phoenix Business 2",
      test_business3_id: 2610, // Employee
      test_business3_name: "Phoenix Business 3",
      test_business4_id: 2611,
      test_business4_name: "Phoenix Business 4",
      test_business5_id: 2612,
      test_business5_name: "Phoenix Business 5",
      test_business6_id: 2613,
      test_business6_name: "Phoenix Business 6",
      test_business7_id: 2614,
      test_business7_name: "Phoenix Business 7",
      test_client_business1_id: 2640,
      test_client_business1_name: 'Phoenix Client 1',
      test_client_business2_id: 2641,
      test_client_business2_name: 'Phoenix Client 2',
      tester1_email: 'automation+phoenix1@docyt.com',
      tester1_name: 'Phoenix Tester 1',
      tester2_email: 'automation+phoenix2@docyt.com',
      tester2_name: 'Phoenix Tester 2',
      tester3_email: 'automation+phoenix3@docyt.com',
      tester3_name: 'Phoenix Tester 3',
      tester4_email: 'automation+phoenix4@docyt.com',
      tester4_name: 'Phoenix Tester 4',
      tester4_phone: '+16503321364',
      tester5_email: 'automation+phoenix5@docyt.com',
      tester5_name: 'Phoenix Tester 5',
      tester5_id: 5369,
      tester6_email: 'automation+phoenix6@docyt.com',
      tester6_name: 'Phoenix Tester 6',
      ...team_phoenix_common
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      if (!process.env.DISABLE_TESTRAIL) {
        return require('../cypress/plugins/index.js')(on, config)
      }
    },
  },
});
