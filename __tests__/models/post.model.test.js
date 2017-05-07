import { expect } from 'chai';

import Post from '../../src/models/post.model';
import User from '../../src/models/user.model';
import UserFactory from '../../__mocks__/factories/user.factory';

const masterPost = {
  title: 'This is a title',
  text: 'This is a text',
};

let testUser;
let testPost;

describe('Model: Post', () => {
  before(async () => {
    await Post.remove();
    testUser = await User.create(UserFactory.generate());
    testPost = await Post.create({ ...masterPost, author: testUser._id });
  });

  describe('#save()', () => {
    it('should required a title and some text', () => {
      const post = new Post();
      const { errors } = post.validateSync();
      expect(errors.title.message).to.equal('Title is required!');
      expect(errors.author.message).to.equal('Author is required!');
      expect(errors.text.message).to.equal('Some text are required!');
    });

    it('should required title to have a length of 3 minimun', () => {
      masterPost.title = 'ti';
      const post = new Post({ ...masterPost, author: testUser._id });
      const { errors } = post.validateSync();
      expect(errors.title.message).to.equal('Title must be longer!');
    });

    it('should have a slug after been created', () => {
      expect(testPost.toObject()).to.haveOwnProperty('slug');
    });
  });

  describe('#toJSON()', () => {
    it('should return _it, title, text, favoriteCount,author and createdAt', () => {
      const jsonPost = testPost.toJSON();
      expect(jsonPost).to.haveOwnProperty('_id');
      expect(jsonPost).to.haveOwnProperty('title');
      expect(jsonPost).to.haveOwnProperty('text');
      expect(jsonPost).to.haveOwnProperty('author');
      expect(jsonPost).to.haveOwnProperty('createdAt');
      expect(jsonPost).to.haveOwnProperty('favoriteCount');
      expect(jsonPost).to.not.haveOwnProperty('updatedAt');
      expect(jsonPost).to.not.haveOwnProperty('__v');
      expect(jsonPost).to.not.haveOwnProperty('slug');
    });
  });

  describe('#incFavoriteCount()', () => {
    it('should increment the favorite count property by 1', async () => {
      await Post.incFavoriteCount(testPost._id);
      const post = await Post.findById(testPost);
      const jsonPost = post.toJSON();
      expect(jsonPost.favoriteCount).to.equal(1);
    });
  });

  describe('#decFavoriteCount()', () => {
    it('should decrement the favorite count property by 1', async () => {
      await Post.decFavoriteCount(testPost._id);
      const post = await Post.findById(testPost);
      const jsonPost = post.toJSON();
      expect(jsonPost.favoriteCount).to.equal(0);
    });
  });
});
