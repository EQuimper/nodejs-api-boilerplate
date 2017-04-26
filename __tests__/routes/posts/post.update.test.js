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

describe(`PUT ${ENDPOINT}/:id`, () => {
  beforeEach(async () => {
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

  describe('Update with status 200', () => {
    it('should update a post with only the field provide', done => {
      server
        .patch(`${ENDPOINT}/${testPost._id}`)
        .set('Authorization', `JWT ${testUser.createToken()}`)
        .send({ title: 'Hello World' })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(200);
          expect(body.title).to.equal('Hello World');
          expect(body.text).to.equal(testPost.text);
          expect(body._id).to.equal(testPost._id.toString());
          expect(body.author).to.equal(testPost.author.toString());
          expect(body).to.haveOwnProperty('createdAt');
          done();
        });
    });
  });

  describe('Unauthorized with a status 401', () => {
    it('should send Unauthorized if token is invalid', done => {
      server
        .patch(`${ENDPOINT}/${testPost2._id}`)
        .set('Authorization', `JWT weigiweg`)
        .send({ title: 'Hello World' })
        .end((err, res) => {
          const { status, text } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });

    it('should send error message if the user is not the author', done => {
      server
        .patch(`${ENDPOINT}/${testPost2._id}`)
        .set('Authorization', `JWT ${testUser2.createToken()}`)
        .send({ title: 'Hello World' })
        .end((err, res) => {
          const { status, text } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });
  });
});
