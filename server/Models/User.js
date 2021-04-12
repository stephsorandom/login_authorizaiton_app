const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true, 
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

//MiddleWare
UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

//Password Validation
UserSchema.methods.isValidPassword = async function(password) {
    try {
       return await bcrypt.compare(password, this.password) //compares password given to password from signup
    } catch(error) {
        throw(error)
    }
}




const User = mongoose.model('user', UserSchema)
module.exports = User