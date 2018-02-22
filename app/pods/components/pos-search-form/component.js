import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  searchQueryManager: service('managers/search-query-manager'),

  typeFilters: null,
  weaponFilters: null,
  armourFilters: null,
  socketFilters: null,
  requirementFilters: null,
  mapFilters: null,
  miscellaneousFilters: null,
  tradeFilters: null,

  willInsertElement() {
    this.setProperties(this.get('searchQueryManager').initializeFilters())
  }
});
