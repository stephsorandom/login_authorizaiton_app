const crypto = require('crypto')

const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')
console.log({key1, key2})

//generates new keys for access and refresh token. 