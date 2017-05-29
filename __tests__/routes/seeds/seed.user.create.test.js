import { expect } from 'chai';

import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/seeds/users';

describe(`GET ${ENDPOINT}/:count`, () => {
  beforeEach(async () => {
    await User.remove();
  });

  describe('Create with status 200', () => {
    it('should create 10 users by default', done => {
      server.get(ENDPOINT).end((err, res) => {
        const { text, status } = res;
        expect(status).to.equal(200);
        expect(text).to.equal('User seed success! Created 10 users!');
        done();
      });
    });

    it('should create a given count of users', done => {
      server.get(`${ENDPOINT}/5`).end((err, res) => {
        const { text, status } = res;
        expect(status).to.equal(200);
        expect(text).to.equal('User seed success! Created 5 users!');
        done();
      });
    });
  });
});
