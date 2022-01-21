# #!/bin/bash

# Wait a bit for mongo connection
sleep 2s

TIMES=5
COUNT=0
MONGO_RUNNING_MSG="MongoDB shell version"
while [ "$IS_MONGO_RUNNING" != "true" ] && [ $COUNT -lt $TIMES ]; do
  IS_MONGO_RUNNING=$(mongo --version)
  COUNT=$(($COUNT + 1))
  if [[ "$IS_MONGO_RUNNING" != *"$MONGO_RUNNING_MSG"* ]]; then
    echo "mongo attempt $COUNT connection failed"
    sleep 1s
  else
    break
  fi
done

if [[ "$IS_MONGO_RUNNING" != *"$MONGO_RUNNING_MSG"* ]]; then
  echo "Cannot connect to mongo. Exit!"
  exit 1
fi

# indexing collections
FILES="$(ls /scripts/indexing-scripts/*.js | sort -n)"

for f in $FILES; do
  echo $f
  mongo mongodb://localhost:27017/demo /scripts/indexing-scripts/$(basename $f)
  script_exit_code=$?
  if [ $script_exit_code != 0 ]; then
    exit $script_exit_code
  fi
done

echo "INJECT INDEX DONE!"
