'use strict';

const chalk = require('chalk');
const {db} = require('./server/db');
const app = require('./server');
const PORT = 3000;

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log(chalk.green('db synced!'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is listening on port ${PORT}!`));
    });
  });
