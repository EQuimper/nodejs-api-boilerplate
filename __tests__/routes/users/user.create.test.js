import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import UserFactory from '../../../__mocks__/factories/user.factory';

const ENDPOINT = '/api/users/signup';

let testUser;

describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('Create with status 201', () => {
    it('should return the _id of the user and a token', done => {
      server.post(ENDPOINT).send(UserFactory.generate()).end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.haveOwnProperty('_id');
        expect(body).to.haveOwnProperty('token');
        done();
      });
    });
  });

  describe('Error with status 404', () => {
    it('should return an error if email or username are already take', done => {
      server
        .post(ENDPOINT)
        .send({
          username: testUser.username,
          email: testUser.email,
          password: 'password1',
        })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('User validation failed');
          expect(body.errors.username).to.equal(
            `${testUser.username} already taken!`,
          );
          expect(body.errors.email).to.equal(
            `${testUser.email} already taken!`,
          );
          done();
        });
    });

    it('should return an error if email is not provided', done => {
      server
        .post(ENDPOINT)
        .send({ username: 'username', password: 'password1' })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('validation error');
          expect(body.errors.email).to.equal('email is required');
          done();
        });
    });

    it('should return an error if password is not provided', done => {
      server
        .post(ENDPOINT)
        .send({ username: 'username', email: 'user@gmail.com' })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('validation error');
          expect(body.errors.password).to.equal('password is required');
          done();
        });
    });

    it('should return an error if email is not a valid email', done => {
      server
        .post(ENDPOINT)
        .send({
          username: 'username',
          email: 'user@gmai',
          password: 'password1',
        })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('User validation failed');
          expect(body.errors.email).to.equal('user@gmai is not a valid email!');
          done();
        });
    });

    it('should return an error if password is not a good enough', done => {
      server
        .post(ENDPOINT)
        .send({
          username: 'username',
          email: 'user@gmail.com',
          password: 'pass',
        })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('validation error');
          expect(body.errors.password).to.equal(
            'password length must be at least 6 characters long',
          );
          done();
        });
    });
  });
});
