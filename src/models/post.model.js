/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title must be longer!'],
      unique: true,
    },
    text: {
      type: String,
      required: [true, 'Some text are required!'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required!'],
    },
  },
  { timestamps: true },
);

PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

/**
 * Slugify the text on validation hook
 */
PostSchema.pre('validate', function(next) {
  this.slugify();

  next();
});

PostSchema.statics = {
  /**
   * Create a post
   *
   * @param {Object} args - Object contains title and text
   * @param {String} authorId - the author id
   * @returns {Post} Post Object - new post create
   */
  createPost(args, authorId) {
    return this.create({
      ...args,
      author: authorId,
    });
  },

  list({ skip = 0, limit = 10 }) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author');
  },
};

PostSchema.methods = {
  /**
   * Slug the title and add this to the slug prop
   */
  slugify() {
    this.slug = slug(this.title);
  },

  /**
   * Parse the post in format we want to send.
   *
   * @returns {Post} Post Object
   */
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      author: this.author,
      createdAt: this.createdAt,
    };
  },
};

let Post;

try {
  Post = mongoose.model('Post');
} catch (e) {
  Post = mongoose.model('Post', PostSchema);
}

export default Post;
