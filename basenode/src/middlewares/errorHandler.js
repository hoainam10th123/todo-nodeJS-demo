
const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Hadnling");

    // err.status
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({
            statusCode: 401,
            message: "The user is not authorized"
        })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(400).json({statusCode: 400, message: err})
    }
    
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || '500 internal server';

    res.status(errStatus).json({
        statusCode: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : ''
    })
}

module.exports = ErrorHandler;