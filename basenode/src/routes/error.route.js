const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        throw new Error('error has 500 internal server')
    } catch (err) {
        next(err);
    }
})

module.exports = router