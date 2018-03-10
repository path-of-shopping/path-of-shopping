import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Loadable from 'pos/mixins/components/loadable';

export default Component.extend(Loadable, {
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

    if (!key) return this.set('filters', searchQueryManager.initializeFilters());

    searchFetcher.fetch(key).then((search) => this.set('filters', searchQueryManager.hydrate(search.get('query'))));
  },

  triggerSearch() {
    const sanitizedFilters = this.get('searchQueryManager').sanitize(this.get('filters'));

    this.loadWhile(this.get('searchPersister').persist(sanitizedFilters))
      .then((search) => this.get('onSearched')(search));
  }
});
