exports.executeSqlQueryPromisify = function (apiReference, sqlQuery, sqlParams) {

    return new Promise((resolve, reject) => {
        var query = connection.query(sqlQuery, sqlParams, function (sqlError, sqlResult) {

            if (sqlError) {
                return reject(new Error(JSON.stringify(responses.getErrorResponse())));
            }

            return resolve(sqlResult);
        })

    })
};

exports.rollbackTransactionPromisified = function (apiReference) {
    return new Promise((resolve, reject) => {
        connectionForTransaction.rollback(function () {
            return resolve();
        })
    })
};

exports.commitTransactionPromisified = function (apiReference) {
    return new Promise((resolve, reject) => {
        connectionForTransaction.commit(function (error) {

            if (error) {
                module.exports.rollbackTransactionPromisified(apiReference)
                    .then(() => {
                        return reject();
                    })
                    .catch(exception => {
                        return reject();
                    });
            }
            else {
                return resolve();
            }

        })
    })
}

exports.executeSqlTransactionPromisify = function (apiReference, sqlQuery, sqlParams) {

    return new Promise((resolve, reject) => {
        var query = connectionForTransaction.query(sqlQuery, sqlParams, function (sqlError, sqlResult) {
            if (sqlError) {
                module.exports.rollbackTransactionPromisified(apiReference)
                    .then(() => {
                        return reject(new Error(JSON.stringify(responses.getErrorResponse())));
                    })
                    .catch(exception => {
                        return reject(new Error(JSON.stringify(responses.getErrorResponse())));
                    });
            }
            else {
                return resolve(sqlResult);
            }

        })
    })
};

exports.authenticateUserAccessTokenPromisified = function (userAccessToken, callback) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT ur.is_admin " +
            " FROM `tb_users` ur " +
            " WHERE ur.access_token =? LIMIT 1";
        connection.query(sql, [userAccessToken], function (err, result) {
            if (result && result.length > 0) {
                return resolve(result);
            } else {
                return reject(err);
            }
        });
    })
};