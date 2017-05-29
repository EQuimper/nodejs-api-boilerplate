import { expect } from 'chai';

import User from '../../../src/models/user.model';
import Post from '../../../src/models/post.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import PostFactory from '../../../__mocks__/factories/post.factory';
import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/seeds/clear';

describe(`GET ${ENDPOINT}`, () => {
  beforeEach(async () => {
    await User.remove();
    await Post.remove();
    const testUser = await User.create(UserFactory.generate());
    await Post.create(PostFactory.generate({ author: testUser._id }));
  });

  describe('Delete with status 200', () => {
    it('should delete all collections', done => {
      server.get(ENDPOINT).end((err, res) => {
        const { text, status } = res;
        expect(status).to.equal(200);
        expect(text).to.equal('All collections clear');
        done();
      });
    });
  });
});
