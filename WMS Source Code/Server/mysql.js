const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
	//make hash so it is not viewable by malicious user
	user: 'root',
	password: 'root',
	database: 'warehouse'
});

connection.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      return;
    }
    console.log('Connection established sucessfully');
});

async function selectQuery(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            console.log("Selected from database");
            resolve(result);
        });
    });
}

function insertQuery(sql, values) {
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Number of records affected: " + result.affectedRows);
    });
}

module.exports = {
    selectQuery,
    insertQuery
};
