#!/bin/bash

export EXTRA_ARGS=""

if [[ "$BROWSER" == "chrome" ]]; then
   EXTRA_ARGS="--headless"
   export ELECTRON_EXTRA_LAUNCH_ARGS="--disable-gpu"
fi

printenv
cd tests

suite="${SUITE_NAME}"
if [ -z "$suite" ]; then
   suite="smoke"
fi

threads="${PARALLEL_THREADS}"
if [ -z "$threads" ]; then
   threads=1
fi

display_suite_name=${suite^}
current_date=$(date +"%d%b")

if [ "$suite" = "regression" ]; then
   echo "Starting full regression run"
   CYPRESS_TESTRAIL_RUN_NAME="Cypress_${display_suite_name}_${current_date} (${ENVIRONMENT})" npx cypress-parallel -s cypress:run -t $((${threads})) -d "${TESTS_DIR}" --args \'"--config-file=${CONFIG_FILE} --browser=${BROWSER} $EXTRA_ARGS"\'
else
   echo "Starting run for Tag @${suite}"
   CYPRESS_TESTRAIL_RUN_NAME="Cypress_${display_suite_name}_${current_date} (${ENVIRONMENT})" npx cypress-parallel -s cypress:run -t $((${threads})) -d "${TESTS_DIR}" --args \'"--config-file=${CONFIG_FILE} --browser=${BROWSER} --env grepTags=@${suite} $EXTRA_ARGS"\'
fi
