import mongoose from 'mongoose';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import jwt from 'jsonwebtoken';
import config from 'config';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    savedChats: {
        type: Array
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, username: this.username }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
};

function validatePassword(password) {
    const complexityOptions = {
      min: 10,
      max: 30,
      lowercase: 1,
      uppercase: 1,
      numberic: 1,
      requirementCount: 2
    };
  
    return passwordComplexity(complexityOptions).validate(password);
}

export { User, validateUser, validatePassword };