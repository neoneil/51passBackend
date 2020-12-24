var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '160302',
    database : 'PTE'
    // ,
    // charset: "utf8mb4",
    // collation:"utf8mb4_unicode_ci"
});

connection.connect(function(err) {
    if (err) throw err;
});
module.exports = connection;