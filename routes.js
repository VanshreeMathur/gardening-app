// help from: https://dev.to/saulojoab/how-to-get-data-from-an-mysql-database-in-react-native-53a4

const express = require('express');
const mysql = require('mysql');

// build database connectiono
const connection = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gardeningapp'

});

// start our express app
const app = express();

// create a GET route to return data from 'user' table
app.get('/api/users', function(req, res){

    // connect to the database
    connection.getConnection(function (err, connection) {

        // execute the MySQL query
        connection.query(`SELECT * FROM user `, function (error, results, fields){

            // if there is an error
            if (error){
                throw error;
            }

            // get response from database
            res.send(results);

        });

    });

});

// create a GET route to return data from 'user' table
app.get('/api/users/:email', function(req, res){

    // connect to the database
    connection.getConnection(function (err, connection) {

        // execute the MySQL query (RETURN THE USER_ID AND PASSWORD FROM THE SPECIFIED EMAIL)
        connection.query(`SELECT user_id, password FROM user WHERE email = "${req.params.email}" `, function (error, results, fields){

            // if there is an error
            if (error){
                throw error;
            }

            // get response from database
            res.send(JSON.stringify(results));

        });

    });

});

// start our server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Go to localhost:${port}/api/users/ so you can see the data. :)`);
});
