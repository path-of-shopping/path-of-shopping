import Service from '@ember/service';
import Item from 'pos/models/item';

export default Service.extend({
  create(rawItem) {
    return Item.create(rawItem);
  }
});
