/**
 * User Model
 */

import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmail } from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

import constants from '../config/constants';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          return isEmail(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{PATH} {VALUE} is already taken!',
});

// Hash the user password on creation

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    return this._hashPassword(
      this.password,
      constants.SALT_ROUND,
      (err, hashPwd) => {
        this.password = hashPwd;
        return next();
      },
    );
  }
  return next();
});

// User methods on each

UserSchema.methods = {
  _hashPassword(password, saltRounds, cb) {
    return hash(password, saltRounds, cb);
  },
};

const User = mongoose.model('User', UserSchema);

export default User;
