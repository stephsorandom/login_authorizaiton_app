const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('./Models/User')


router.post('/register', async (req, res, next) => {
    console.log(req.body)
    // res.send('register route')
    try {
        const {email, password} = req.body
        if (!email || !password) throw createError.BadRequest() //validating email/password

       const doesExist = await User.findOne({email : email})
       if (doesExist) 
        throw createError.Confict(`${email} already has account.`)

       const user = new User({email, password})
       const savedUser = await user.save()

       res.send(savedUser)
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    res.send('login route')
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})



module.exports = router