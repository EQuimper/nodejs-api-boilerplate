import faker from 'faker';

class PostFactory {
  generateList(count, attrs = {}) {
    const list = [];
    let numberOfPostsToCreate = count;
    while (numberOfPostsToCreate) {
      list.push(this.generate(attrs));
      numberOfPostsToCreate--;
    }
    return list;
  }

  generate(attrs) {
    return {
      title: faker.lorem.text(),
      text: faker.lorem.sentence(),
      ...attrs,
    };
  }
}

export default new PostFactory();
