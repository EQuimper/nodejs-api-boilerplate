import { expect } from 'chai';

import { filteredBody } from '../../src/utils/filteredBody';

describe('#filteredBody()', () => {
  it('should filter the object given with the list provided', () => {
    const body = {
      title: 'Hello World',
      text: 'Hello World',
      image: 'url',
      logo: 'hello',
    };
    const whitelist = ['title', 'text'];
    expect(filteredBody(body, whitelist).title).to.equal('Hello World');
    expect(filteredBody(body, whitelist).text).to.equal('Hello World');
    expect(filteredBody(body, whitelist).image).to.equal(undefined);
    expect(filteredBody(body, whitelist).logo).to.equal(undefined);
  });
});
