// help from: https://dev.to/saulojoab/how-to-get-data-from-an-mysql-database-in-react-native-53a4

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gardeningapp'

});

// start our express app
const app = express();

// create a GET route to return data from 'user' table
app.get('/user', function(req, res){

    // connect to the database
    connection.getConnection(function (err, connection) {

        // execute the MySQL query
        connection.query('SELECT * FROM user', function (error, results, fields){

            // if there is an error
            if (error){
                throw error;
            }

            // get response from database
            res.send(results);

        });

    });

});

// start our server

app.listen(3000, () => {
    console.log('Go to http://YOURIP:3000/user so you can see the data.'); // REPLACE "YOURIP" WITH YOUR IP ADDRESS
});
