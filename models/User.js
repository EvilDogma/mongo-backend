const { model, Schema } = require('mongoose')
const { hash, compare } = require('bcrypt')

function validateEmail(email) {
    return value.test(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
}
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minLength: [6, 'at least 6 chars'],
        require: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        validate: [
            validateEmail,
            'Email must be properly formatted'
        ],
        require: [true, 'Email is required']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

userSchema.set('toJSON', { virtuals: true });




// userSchema.methods.validatePass = async function (formPassword) {

//     const valid = compare(formPassword, this.password)

//     return valid

// }

// userSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         this.password = await hash(this.password, 10)
//     }
//     next()
// })
const User = model('User', userSchema)

module.exports = User