import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import UserFactory from '../../../__mocks__/factories/user.factory';

const ENDPOINT = '/api/users/login';

let testUser;

/**
 * @test {auth.routes.js}
 */
describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('login with a status 200', () => {
    it('should return a token with the user _id', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'password1' })
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body._id).to.equal(testUser._id.toString());
          expect(body).to.haveOwnProperty('token');
          done();
        });
    });
  });

  describe('not login with status 401', () => {
    it('should not allowed user to log with wrong password', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'passwwejnwg3' })
        .end((err, res) => {
          const { text, status } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });
  });
});
