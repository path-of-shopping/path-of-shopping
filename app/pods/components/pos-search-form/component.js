import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default Component.extend({
  searchQueryManager: service('managers/search-query-manager'),
  searchPersister: service('persisters/search-persister'),
  searchFetcher: service('fetchers/search-fetcher'),

  key: null,
  onSearched: () => {},

  filters: {
    league: null,
    name: null,
    type: null,
    weapon: null,
    armour: null,
    socket: null,
    requirement: null,
    map: null,
    miscellaneous: null,
    trade: null
  },

  willInsertElement() {
    const {searchQueryManager, searchFetcher, key} = this.getProperties('searchQueryManager', 'searchFetcher', 'key');

    if (!key) return this.set('filters', searchQueryManager.hydrateFilters());

    searchFetcher.fetch(key).then((search) => this.set('filters', searchQueryManager.hydrateFilters(search.get('query'))));
  },

  searchSubmission: task(function *(sanitizedFilters) {
    const persistedSearch = yield this.get('searchPersister').persist(sanitizedFilters);
    this.get('onSearched')(persistedSearch);
  }).drop(),

  triggerSearch() {
    const sanitizedFilters = this.get('searchQueryManager').sanitize(this.get('filters'));
    this.get('searchSubmission').perform(sanitizedFilters);
  }
});
