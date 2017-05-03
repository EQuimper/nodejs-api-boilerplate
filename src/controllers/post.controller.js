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

/**
 * @api {get} /posts Get posts
 * @apiDescription Get a list of posts
 * @apiName getListOfPost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam (query) {Int} skip Number of skip posts
 * @apiParam (query) {Int} limit Maximum number of posts
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object[]} post Post list.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *    _id: '123',
 *    title: 'New title 1',
 *    text: 'New text 1',
 *    createdAt: '2017-05-03',
 *    author: '123312'
 *  },
 *  {
 *    _id: '12234',
 *    title: 'New title 2',
 *    text: 'New text 2',
 *    createdAt: '2017-05-03',
 *    author: '123312234'
 *  }
 * ]
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
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

/**
 * @api {get} /posts/:id Get a single post
 * @apiDescription Get a single post
 * @apiName getPost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post created.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'a title',
 *  text: 'a text',
 *  createdAt: '2017-05-03',
 *  author: '123312'
 * }
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
export async function getById(req, res, next) {
  try {
    return res.status(HTTPStatus.OK).json(await Post.findById(req.params.id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

/**
 * @api {post} /posts Create a post
 * @apiDescription Create a post
 * @apiName createPost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post created.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'a title',
 *  text: 'a text',
 *  createdAt: '2017-05-03',
 *  author: '123312'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
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

/**
 * @api {delete} /posts/:id Delete a post
 * @apiDescription Delete a post if the author it's the right one
 * @apiName deletePost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam {String} id Post unique ID.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiSuccess {Number} status Status of the Request.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * 200
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 */
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

/**
 * @api {patch} /posts/:id Update a post
 * @apiDescription Update a post if the author it's the right one
 * @apiName updatePost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam {String} id Post unique ID.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post updated.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'New title',
 *  text: 'New text',
 *  createdAt: '2017-05-03',
 *  author: '123312'
 * }
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
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
