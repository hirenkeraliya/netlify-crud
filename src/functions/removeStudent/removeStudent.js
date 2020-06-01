const mysql = require('mysql');
const util = require('util');
const querystring = require('querystring');

exports.handler = async function (event, context) {
    try {
        let connection = await mysql.createConnection({
            host: 'remotemysql.com',
            port: 3306,
            user: 'LPDOlK2gkX',
            password: 'p1xbGyuioV',
            database: 'LPDOlK2gkX'
        });
        await connection.connect();

        // https://stackoverflow.com/a/51690276/7708096
        const query = util.promisify(connection.query).bind(connection);

        let editQuery = "DELETE FROM `students` WHERE `students`.`id`=" + event.queryStringParameters.id;

        return {
            statusCode: 200,
            body: JSON.stringify({
                student: await query(editQuery).then((queryResult) => {
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
