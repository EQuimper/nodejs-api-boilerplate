/**
 * Create fake user for testing
 */

import faker from 'faker';

class UserFactory {
  generateList(count, attrs = {}) {
    const list = [];
    let numberOfUsersToCreate = count;

    while (numberOfUsersToCreate) {
      list.push(this.generate(attrs));
      numberOfUsersToCreate--;
    }

    return list;
  }

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
