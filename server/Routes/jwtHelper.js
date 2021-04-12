const JWT = require('jsonwebtoken')
const createError = require('http-errors')


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                iss: 'pickyourpage.com'
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                issuer: 'pickyourpage.com',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                console.log(err.message)
                //resolve(token)
                reject(createError.InternalServerError())
            })
        })
    }
}