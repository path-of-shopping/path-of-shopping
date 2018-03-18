import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {gt} from '@ember/object/computed';

export default Component.extend({
  searchQueryManager: service('managers/search-query-manager'),

  modFilter: [],

  canRemoveBlock: gt('modFilter.length', 1),

  addBlock() {
    this.get('modFilter').pushObject(this.get('searchQueryManager').initModFilterBlock());
  },

  removeBlock(modBlock) {
    this.get('modFilter').removeObject(modBlock);
  }
});
