// all routes related to user

const { error } = require('console')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

// POST method for form
router.post('/register', 
    
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }), 

    async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //res.send('Invalid data')
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const { email, username, password } = req.body;
        console.log("📥 Register data:", req.body);


        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            email, 
            username,
            password: hashPassword
        })

        res.send(newUser)

        console.log(errors)
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', 
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min: 5}),

    async (req, res) => {
        
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid data'
            })
        }

        const { username, password } = req.body;
        console.log(req.body)

        const user = await userModel.findOne({
            username: username
        })

        console.log(`User: ${user.username}`);

        if(!user){
            return res.status(400).json({
                message: 'Username is incorrect'
            })
        }

        const isMatch = bcrypt.compare(password, user.password)
        console.log(bcrypt.compare(password, user.password))

        if(!isMatch){
            return res.status(400).json({
                message: 'Username or password is incorrect'
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username,
        }, 
        process.env.JWT_SECRET
    )

    res.cookie('token', token)

    res.send('Logged in')
})

module.exports = router