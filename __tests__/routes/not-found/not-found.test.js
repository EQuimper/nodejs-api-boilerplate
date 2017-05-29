import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/wrong/path';

/**
 * @test {not-found.test.js}
 */
describe(`ALL ${ENDPOINT}`, () => {
  it('should return Not Found message when POST', done => {
    server.post(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).to.equal(404);
      expect(body.message).to.equal('Not Found!');
      done();
    });
  });

  it('should return Not Found message when GET', done => {
    server.get(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).to.equal(404);
      expect(body.message).to.equal('Not Found!');
      done();
    });
  });

  it('should return Not Found message when PUT', done => {
    server.put(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).to.equal(404);
      expect(body.message).to.equal('Not Found!');
      done();
    });
  });

  it('should return Not Found message when DELETE', done => {
    server.delete(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).to.equal(404);
      expect(body.message).to.equal('Not Found!');
      done();
    });
  });
});
