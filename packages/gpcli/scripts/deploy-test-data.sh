#!/usr/bin/env bash

set -e

PROFILE=${1:-development}
echo "Using profile \"${PROFILE}\"."

#echo "Deploying pmizel@asure.io ..."
#node src/cli.js --profile "${PROFILE}" register-user \
#  --address 0x2215fef923727437C48F219947E6a7a5D1AB48C0 \
#  --birth-date 1980-08-01 \
#  --pension-date 2047-08-01 \
#  --salary 2500

#echo "Deploying fraetz@asure.io ..."
#node src/cli.js --profile "${PROFILE}" register-user \
#  --address 0x79461c71bfe8d7b3bf826dea15d7494a6af1be81 \
#  --birth-date 1989-03-29 \
#  --pension-date 2056-03-29 \
#  --salary 2500

echo "Deploying gschmuck@asure.io ..."
node src/cli.js --profile "${PROFILE}" register-user \
  --address 0xd09E4938517A3cDEa80696B9a5Ebbc90Ca12c895 \
  --birth-date 1994-06-30 \
  --pension-date 2061-06-30 \
  --salary 2500

echo "Deploying mlurz@asure.io ..."
node src/cli.js --profile "${PROFILE}" register-user \
  --address 0xb65bd15f91499ae7bf0baf82d18043bd011d1a68 \
  --birth-date 1950-05-01 \
  --pension-date 2017-05-01 \
  --salary 2500

echo "Deployment successful"
