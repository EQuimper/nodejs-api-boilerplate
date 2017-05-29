import { expect } from 'chai';

import User from '../../../src/models/user.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/seeds/users/clear';

describe(`GET ${ENDPOINT}`, () => {
  beforeEach(async () => {
    await User.remove();
    await User.create(UserFactory.generate());
  });

  describe('Delete with status 200', () => {
    it('should delete all users', done => {
      server.get(ENDPOINT).end((err, res) => {
        const { text, status } = res;
        expect(status).to.equal(200);
        expect(text).to.equal('User collection empty');
        done();
      });
    });
  });
});
