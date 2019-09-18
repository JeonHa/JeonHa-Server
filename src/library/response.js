const response = (res, status, message, data) => {
    res
        .status(200)
        .json({
            'success': true,
            'status': status,
            'resMessage': message,
            'data': data
        });
};

const errResponse = (res, status, message) => {
    res
        .status(200)
        .json({
            'success': false,
            'status': status,
            'message': message
        });
}

module.exports = {
    response,
    errResponse
}