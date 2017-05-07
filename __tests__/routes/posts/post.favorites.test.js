import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import Post from '../../../src/models/post.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import PostFactory from '../../../__mocks__/factories/post.factory';

const ENDPOINT = '/api/posts';

let testUser;
let testPost;

describe(`POST ${ENDPOINT}/:id/favorite`, () => {
  before(async () => {
    await User.remove();
    await Post.remove();
    testUser = await User.create(UserFactory.generate());
    testPost = await Post.create(
      PostFactory.generate({ author: testUser._id }),
    );
  });
  describe('Favorites a post with a 200', () => {
    it('should return OK and status of 200', done => {
      server
        .post(`${ENDPOINT}/${testPost._id}/favorite`)
        .set('Authorization', `JWT ${testUser.createToken()}`)
        .end(async (err, res) => {
          const { status } = res;
          expect(status).to.equal(200);
          const user = await User.findById(testUser._id);
          expect(user.favorites.posts.length).to.equal(1);
          const post = await Post.findById(testPost._id);
          expect(post.favoriteCount).to.equal(1);
          done();
        });
    });
  });
  describe('401', () => {
    it('should return Unauthorized and status of 401 if no token valid', done => {
      server
        .post(`${ENDPOINT}/${testPost._id}/favorite`)
        .set('Authorization', `JWT 123`)
        .end((err, res) => {
          const { status } = res;
          expect(status).to.equal(401);
          done();
        });
    });
  });
});
