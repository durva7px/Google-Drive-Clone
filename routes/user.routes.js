// all routes related to user

const { error } = require('console')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

router.get('/register', (req, res) => {
    res.render('register')
})

// POST method for form
router.post('/register', 
    
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }), 

    (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //res.send('Invalid data')
            res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        console.log(errors)
})

module.exports = router