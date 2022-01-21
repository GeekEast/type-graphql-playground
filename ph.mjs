const primaryContainer = 'mongodb-primary';

const initializeMongoCluster = async () => {
  console.log(chalk.green('configuring local mongo cluster'));
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_configure_mongo_cluster.sh`;
};

const seed = async () => {
  console.log(chalk.green('seeding data into mongo cluster'));
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_db_scripts.sh`;
};

const index = async () => {
  console.log(chalk.green('indexing data'));
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_indexing_scripts.sh`;
};

const up = async () => {
  console.log(chalk.green('building up the mongo and dynamodb'));
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local up -d`;
  sleep(3000);
  await initializeMongoCluster();
  await seed();
  await index();
};

const down = async () => {
  console.log(chalk.green('destroying the mongo database'));
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local down`;
};

if (argv._.length > 1) {
  const mode = argv._.pop();
  switch (mode) {
    case 'seed':
      await seed();
      break;
    case 'index':
      await index();
      break;
    case 'up':
      await up();
      break;
    case 'down':
      await down();
      break;
    default:
      break;
  }
}
