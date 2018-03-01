import Service from '@ember/service';
import Search from 'pos/models/search';
import Ember from 'ember';

export default Service.extend({
  create({key, itemIds, query, summary: {total}}) {
    return Search.create({
      key,
      itemIds: Ember.A(itemIds),
      query: JSON.parse(query),
      summary: {
        total
      }
    });
  }
});
