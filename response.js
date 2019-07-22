exports.actionCompleteResponse = function (res, data, msg) {
    var response = {
        "message": msg ,
        "status": 200,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};

exports.authenticationErrorResponse = function (res, data) {
    var response = {
        "message":"Invalid Credentials",
        "status": 101,
        "data": data || {}
    };
    res.send(JSON.stringify(response));
};