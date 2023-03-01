const router = require('express').Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// register
router.post('/register', async (req, res) => {
    const newUser = new User({
        // username: req.body.username,
        // email: req.body.email,
        ...req.body,
        
        // seperate password and encrypt it
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    })

    try {
        const savedUser = await newUser.save()
        // return res.status(200).send(savedUser)
        return res.status(200).json(savedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// login
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) { 
            return res.status(401).json("Wrong credentials")
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const realPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(realPassword !== req.body.password) {
            return res.status(401).json('Wrong credentials')
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin, 
        }, 
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1d"} 
        )

        // separate password from being leaked
        const {password, ...others} = user._doc

        return res.status(200).json({...others, accessToken})
    } catch (err) {
        return res.status(500).json(err) 
    }
})

module.exports = router