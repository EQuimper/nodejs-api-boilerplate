/**
 * BaseFatory
 */

class BaseFactory {
  /**
   * Return a list
   *
   * @public
   * @param {Number} count
   * @param {Object} If add more attributes
   * @returns {Array} List
   */
  generateList(count, attrs = {}) {
    const list = [];
    let numberOfItemsToCreate = count;

    while (numberOfItemsToCreate) {
      list.push(this.generate(attrs));
      numberOfItemsToCreate--;
    }
    return list;
  }
}

export default BaseFactory;
