const mysql = require('mysql');

// const keys = require('../../config/index.js');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

/* -----------DEPLOYMENT---------------------*/
// const connection = mysql.createConnection({
//   host: 'mydbinstance.cpg0q0lr1fiw.us-west-1.rds.amazonaws.com',
//   user: 'masterUser',
//   password: keys.dbpass,
//   database: 'dive_team'
// });
/* -----------DEPLOYMENT---------------------*/
// const connection = mysql.createConnection({
//   host: 'mydbinstance.cwegnsivr2ab.us-west-2.rds.amazonaws.com',
//   user: 'masterUser',
//   password: keys.dbpass,
//   database: 'dive_team',
// });

/* -----------DEVELOPMENT---------------------*/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dive_team',
});
/* -----------DEVELOPMENT---------------------*/


connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected to SQL as id ${connection.threadId}`);
});

module.exports = connection;
