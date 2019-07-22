const express            = require('express'); 
const bodyParser         = require('body-parser'); 
const mysql              = require('mysql');
const mysqlconfig        = require('./mysqlconfig');
connection               = mysql.createConnection(mysqlconfig);
connectionForTransaction = mysql.createConnection(mysqlconfig);

const app = express(); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// //////////////////////////////////////////////////////// 
// ///////////////////DEFINING SERVER/////////////////////// 
// ///////////////////////////////////////////////////////// 

const server = app.listen(process.env.PORT || 3000, () => { 
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env); 
    connection.connect(function (err) {
        if (err) {
            console.log("Database is not connected ..." + err);
        } else {
            console.log("database connecting ...");
        }
    });

    connectionForTransaction.connect(function (err) {
        if (err) {
            console.log("Database is not connected ..." + err);
        } else {
            console.log("database connecting ...");
        }
    });
});



