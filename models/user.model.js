const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: {type: String,
        enum: ['user', 'admin'],
        default: 'user'},
    email: { type: String, required: true },
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
     ],
    isApproved: { type: Boolean },
    isBanned: { type: Boolean },
    banReason: { type: String },
    password: {
        type: String,
        required: true,
    }
});


UserSchema.pre('save', function userPreSave(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        return bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash;
                return next();
            })
            .catch(err => next(err));
    }
    return next();
});


UserSchema.plugin(uniqueValidator);

UserSchema.methods.comparePassword = function userComparePassword(password) {
    return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);