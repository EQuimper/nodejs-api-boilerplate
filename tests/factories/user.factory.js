/**
 * Create fake user for testing
 */

import faker from 'faker';

class UserFactory {
  /**
   * Generate an list of fake user
   *
   * @public
   * @param {Number} number of user want for test
   * @param {Object} other attributes
   * @returns {Array} of fake user
   */
  generateList(count, attrs = {}) {
    const list = [];
    let numberOfUsersToCreate = count;

    while (numberOfUsersToCreate) {
      list.push(this.generate(attrs));
      numberOfUsersToCreate--;
    }

    return list;
  }

  /**
   * Create a user
   *
   * @public
   * @param {Object} attrs of user
   * @returns {Object} a fake user
   */
  generate(attrs) {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password1',
      ...attrs,
    };
  }
}

export default new UserFactory();
