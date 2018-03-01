import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';

export default Service.extend({
  api: service('api'),
  itemFactory: service('factories/item-factory'),

  fetch(key, itemIds) {
    const itemFactory = this.get('itemFactory');

    return this.get('api')
      .httpGet(`search/${key}/items/${itemIds.join(',')}`)
      .then(({items}) => items.map(itemFactory.create));
  }
});
