/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import Post from './post.model';
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
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password) {
          return password.length >= 6 && password.match(/\d+/g);
        },
      },
    },
    favorites: {
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Hash the user password on creation
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  /**
   * Favorites actions
   *
   * @public
   */
  _favorites: {
    /**
     * Favorite a post or unfavorite if already here
     *
     * @param {String} postId - _id of the post like
     * @returns {Promise}
     */
    async posts(postId) {
      try {
        if (this.favorites.posts.indexOf(postId) >= 0) {
          this.favorites.posts.remove(postId);
          await Post.decFavoriteCount(postId);
        } else {
          await Post.incFavoriteCount(postId);
          this.favorites.posts.push(postId);
        }

        return this.save();
      } catch (err) {
        return err;
      }
    },

    /**
     * Check if post is favorite by current user.
     *
     * @param {String} postId - _id of the post
     * @returns {Boolean} isFavorite - post is favorite by current user
     */
    isPostIsFavorite(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        return true;
      }

      return false;
    },
  },
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  /**
   * Hash the user password
   *
   * @private
   * @param {String} password - user password choose
   * @returns {String} password - hash password
   */
  _hashPassword(password) {
    return hashSync(password);
  },

  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },

  /**
   * Parse the user object in data we wanted to send when is auth
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`,
    };
  },

  /**
   * Parse the user object in data we wanted to send
   *
   * @public
   * @returns {Object} User - ready for populate
   */
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
    };
  },
};

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User;
