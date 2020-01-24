const mysql = require('mysql');
const util = require('util');

exports.handler = async function (event, context) {
    try {
        let connection = await mysql.createConnection({
            host: 'remotemysql.com',
            port: 3306,
            user: 'HUsuEQonjy',
            password: '1f3NmBt9vW',
            database: 'HUsuEQonjy'
        });
        await connection.connect();

        // https://stackoverflow.com/a/51690276/7708096
        const query = util.promisify(connection.query).bind(connection);

        let parameters = JSON.parse(event.body);
        let insertQuery = "INSERT INTO `students`(`name`, `email`, `phone`) VALUES('" + parameters.name + "', '" + parameters.email + "', '" + parameters.phone + "')";

        return {
            statusCode: 200,
            body: JSON.stringify({
                students: await query(insertQuery).then((queryResult) => {
                    connection.end();

                    return queryResult;
                })
            }),
        };
    } catch (err) {
        console.log(err.message);

        return {
            statusCode: 500,
            body: JSON.stringify({
                msg: err.message
            })
        }
    }
}
