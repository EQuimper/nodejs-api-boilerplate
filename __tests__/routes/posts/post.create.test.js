import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import Post from '../../../src/models/post.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import PostFactory from '../../../__mocks__/factories/post.factory';

const ENDPOINT = '/api/posts';

let testUser;
let testPost;

describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    await Post.remove();
    testUser = await User.create(UserFactory.generate());
  });

  beforeEach(() => {
    testPost = PostFactory.generate();
  });

  describe('Create with status 201', () => {
    it('should create a post', done => {
      server
        .post(ENDPOINT)
        .set('Authorization', `JWT ${testUser.createToken()}`)
        .send(testPost)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(201);
          expect(body.text).to.equal(testPost.text);
          expect(body.title).to.equal(testPost.title);
          expect(body.favoriteCount).to.equal(0);
          expect(body.author.toString()).to.equal(testUser._id.toString());
          expect(body).to.haveOwnProperty('_id');
          expect(body).to.haveOwnProperty('createdAt');
          done();
        });
    });
  });

  describe('Unauthorized with a status 401', () => {
    it('should send Unauthorized if token is invalid', done => {
      server
        .post(ENDPOINT)
        .set('Authorization', `JWT weigiweg`)
        .send(testPost)
        .end((err, res) => {
          const { status, text } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });
  });
});
