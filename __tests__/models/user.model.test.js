import { expect } from 'chai';

import User from '../../src/models/user.model';

let testUser;
let defaultUser;

const masterUser = {
  email: 'test@gmail.com',
  username: 'test!',
  password: 'password1',
};

describe('Model: User', () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(masterUser);
  });

  beforeEach(() => {
    defaultUser = {
      ...masterUser,
    };
  });

  describe('#save()', () => {
    it('should required email and password', () => {
      const user = new User();
      const { errors } = user.validateSync();
      expect(errors.email.message).to.equal('Email is required!');
      expect(errors.password.message).to.equal('Password is required!');
    });

    it('should required a valid email', () => {
      defaultUser.email = 'notgoodemail';
      const user = new User(defaultUser);
      let validation = user.validateSync();
      expect(validation.errors.email.message).to.equal(
        `${defaultUser.email} is not a valid email!`,
      );
      user.email = 'test@gmail.com';
      validation = user.validateSync();
      expect(validation).to.equal(undefined);
    });

    it('should required a strong password', () => {
      defaultUser.password = 'not';
      const user = new User(defaultUser);
      let validation = user.validateSync();
      expect(validation.errors.password.message).to.equal(
        'Password need to be longer!',
      );
      user.password = 'password';
      validation = user.validateSync();
      expect(validation.errors).to.haveOwnProperty('password');
      user.password = 'password1';
      validation = user.validateSync();
      expect(validation).to.equal(undefined);
    });
  });

  describe('#authenticateUser()', () => {
    it('should be authenticated if good password', () => {
      expect(testUser.authenticateUser(masterUser.password)).to.equal(true);
    });

    it('should return an error if no good password', () => {
      expect(testUser.authenticateUser('notgoodpassword')).to.equal(false);
    });
  });

  describe('#toJSON()', () => {
    it('should return _id', () => {
      const jsonUser = testUser.toJSON();
      expect(jsonUser).to.haveOwnProperty('_id');
    });

    it('should return username', () => {
      const jsonUser = testUser.toJSON();
      expect(jsonUser).to.haveOwnProperty('username');
    });

    it('should not return password', () => {
      const jsonUser = testUser.toJSON();
      expect(jsonUser).to.not.haveOwnProperty('password');
    });
  });

  describe('#toAuthJSON()', () => {
    it('should return _id', () => {
      const jsonUser = testUser.toAuthJSON();
      expect(jsonUser).to.haveOwnProperty('_id');
    });

    it('should return token', () => {
      const jsonUser = testUser.toAuthJSON();
      expect(jsonUser).to.haveOwnProperty('token');
    });

    it('should not return password', () => {
      const jsonUser = testUser.toAuthJSON();
      expect(jsonUser).to.not.haveOwnProperty('password');
    });
  });
});
