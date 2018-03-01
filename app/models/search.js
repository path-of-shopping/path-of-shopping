import EmberObject from '@ember/object';

const ITEMS_PER_CHUNK = 10;

export default EmberObject.extend({
  _currentPosition: 0,

  key: null,
  itemIds: null,
  query: null,
  summary: {
    total: null
  },

  getNextItemIds() {
    const currentPosition = this.get('_currentPosition');

    this.set('_currentPosition', currentPosition + ITEMS_PER_CHUNK);
    return this.get('itemIds').slice(currentPosition, currentPosition + ITEMS_PER_CHUNK);
  }
});
