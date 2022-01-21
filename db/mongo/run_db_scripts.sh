#!/bin/bash

TIMES=5
COUNT=0
IS_MONGO_RUNNING=

while [ "$IS_MONGO_RUNNING" != "true" ] && [ $COUNT -lt $TIMES ]; do
  IS_MONGO_RUNNING=$(mongo --version)
  COUNT=$(($COUNT + 1))
  if [ "$IS_MONGO_RUNNING" != "$MONGO_RUNNING_MSG" ]; then
    echo "attempting to connecting mongoDB: $COUNT"
    sleep 1s
  fi
done

if [ "$IS_MONGO_RUNNING" != $MONGO_RUNNING_MSG ]; then
  exit 1
fi

FILES="$(ls /scripts/seed-scripts/*.js | sort -n)"

# Cleanup database
mongo mongodb://localhost:27017/demo --eval "db.dropDatabase()"

for f in $FILES; do
  echo "==================================>"
  echo "# start to inject: $f"
  mongo mongodb://localhost:27017/demo /scripts/seed-scripts/$(basename $f)
  script_exit_code=$?
  if [ $script_exit_code != 0 ]; then
    exit $script_exit_code
  fi
done

echo "INJECT SEEDING DATA DONE!"
