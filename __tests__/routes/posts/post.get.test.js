import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import Post from '../../../src/models/post.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import PostFactory from '../../../__mocks__/factories/post.factory';

const ENDPOINT = '/api/posts';

let testUser;
let testPost;
let testPost2;

describe(`GET ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    await Post.remove();
    testUser = await User.create(UserFactory.generate());
    testPost = await Post.create(
      PostFactory.generate({ author: testUser._id }),
    );
    testPost2 = await Post.create(
      PostFactory.generate({ author: testUser._id }),
    );
  });

  describe('GetByID ${ENDPOINT}/id', () => {
    describe('Get one post by his id with a status of 200', () => {
      it('should return the post ask for', done => {
        server
          .get(`${ENDPOINT}/${testPost._id}`)
          .set('Authorization', `JWT ${testUser.createToken()}`)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(200);
            expect(body.title).to.equal(testPost.title);
            expect(body.text).to.equal(testPost.text);
            expect(body.author._id).to.equal(testUser._id.toString());
            expect(body.author.username).to.equal(testUser.username);
            expect(body.author).to.not.haveOwnProperty('password');
            expect(body._id).to.equal(testPost._id.toString());
            expect(body).to.haveOwnProperty('createdAt');
            done();
          });
      });
    });

    describe('Unauthorized with a status 401', () => {
      it('should send Unauthorized if token is invalid', done => {
        server
          .get(`${ENDPOINT}/${testPost2._id}`)
          .set('Authorization', `JWT weigiweg`)
          .end((err, res) => {
            const { status, text } = res;
            expect(status).to.equal(401);
            expect(text).to.equal('Unauthorized');
            done();
          });
      });
    });
  });

  describe(`GetList ${ENDPOINT}`, () => {
    describe('Get posts with a status of 200', () => {
      it('should return a list of posts', done => {
        server
          .get(ENDPOINT)
          .set('Authorization', `JWT ${testUser.createToken()}`)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(200);
            expect(body.length).to.equal(2);
            expect(body[0].text).to.equal(testPost2.text);
            expect(body[0].author).to.haveOwnProperty('username');
            expect(body[0].author).to.not.haveOwnProperty('password');
            expect(body[0].author).to.haveOwnProperty('_id');
            expect(body[0]._id).to.equal(testPost2._id.toString());
            expect(body[0]).to.haveOwnProperty('createdAt');
            expect(body[1].text).to.equal(testPost.text);
            expect(body[1].author).to.haveOwnProperty('username');
            expect(body[1].author).to.not.haveOwnProperty('password');
            expect(body[1].author).to.haveOwnProperty('_id');
            expect(body[1]._id).to.equal(testPost._id.toString());
            expect(body[1]).to.haveOwnProperty('createdAt');
            done();
          });
      });
      describe('Unauthorized with a status 401', () => {
        it('should send Unauthorized if token is invalid', done => {
          server
            .get(`${ENDPOINT}/${testPost2._id}`)
            .set('Authorization', `JWT weigiweg`)
            .end((err, res) => {
              const { status, text } = res;
              expect(status).to.equal(401);
              expect(text).to.equal('Unauthorized');
              done();
            });
        });
      });
    });
  });
});
