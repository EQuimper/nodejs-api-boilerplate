/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import Post from '../models/post.model';

export const validation = {
  create: {
    body: {
      title: Joi.string().min(3).required(),
      text: Joi.string().required(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      text: Joi.string(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    return res
      .status(HTTPStatus.OK)
      .json(await Post.list({ skip: req.query.skip, limit: req.query.limit }));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getById(req, res, next) {
  try {
    return res.status(HTTPStatus.OK).json(await Post.findById(req.params.id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function create(req, res, next) {
  try {
    return res
      .status(HTTPStatus.CREATED)
      .json(await Post.createPost(req.body, req.user._id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await post.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
