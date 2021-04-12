const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.js')
const {authSchema} = require('../Routes/ValidationSchema')
const {signAccessToken} = require('../Routes/jwtHelper')

router.post('/register', async (req, res, next) => {
    console.log(req.body)
    // res.send('register route')
    try {
        // const {email, password} = req.body
       // if (!email || !password) throw createError.BadRequest() //validating email/password
       const result = await authSchema.validateAsync(req.body)
        console.log(req.body)

       const doesExist = await User.findOne({email: result.email})
       if (doesExist) 
        throw createError.Conflict(`${result.email} already has account.`)

       const user = new User({result})
       const savedUser = await user.save()
       const accessToken = await signAccessToken(savedUser.id)

       res.send(accessToken)

    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try{
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: res.email}) //validating if account has been made
        if(!user) throw createError.NotFound('User not registered.') //Error if not made

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Username/Password not valid.')

        const accessToken = await signAccessToken(user.id)
        res.send({accessToken})
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest('Invalid Username/Password')) //Error if wrong info
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})



module.exports = router