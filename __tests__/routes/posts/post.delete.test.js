import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import Post from '../../../src/models/post.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import PostFactory from '../../../__mocks__/factories/post.factory';

const ENDPOINT = '/api/posts';

let testUser;
let testUser2;
let testPost;
let testPost2;

describe(`DELETE ${ENDPOINT}/:id`, () => {
  before(async () => {
    await User.remove();
    await Post.remove();
    testUser = await User.create(UserFactory.generate());
    testUser2 = await User.create(UserFactory.generate());
    testPost = await Post.create(
      PostFactory.generate({ author: testUser._id }),
    );
    testPost2 = await Post.create(
      PostFactory.generate({ author: testUser._id }),
    );
  });

  describe('Delete with status 200', () => {
    it('should delete a post', done => {
      server
        .delete(`${ENDPOINT}/${testPost._id}`)
        .set('Authorization', `JWT ${testUser.createToken()}`)
        .end((err, res) => {
          const { status } = res;
          expect(status).to.equal(200);
          done();
        });
    });
  });

  describe('Unauthorized with a status 401', () => {
    it('should send Unauthorized if token is invalid', done => {
      server
        .delete(`${ENDPOINT}/${testPost2._id}`)
        .set('Authorization', `JWT weigiweg`)
        .end((err, res) => {
          const { status, text } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });

    it('should send error message if the user is not the author', done => {
      server
        .delete(`${ENDPOINT}/${testPost2._id}`)
        .set('Authorization', `JWT ${testUser2.createToken()}`)
        .end((err, res) => {
          const { status, text } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });
  });
});
