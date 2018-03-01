import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Loadable from 'pos/mixins/components/loadable';

export default Component.extend(Loadable, {
  searchFetcher: service('fetchers/search-fetcher'),
  itemsFetcher: service('fetchers/items-fetcher'),

  key: null,

  search: null,
  items: [],

  willInsertElement() {
    const {key, searchFetcher, itemsFetcher} = this.getProperties('key', 'searchFetcher', 'itemsFetcher');

    this.loadWhile(searchFetcher.fetch(key).then((search) => {
      this.set('search', search);
      const nextItemIds = search.getNextItemIds();
      if (nextItemIds.length === 0) return;
      return itemsFetcher.fetch(search.get('key'), nextItemIds).then((items) => this.set('items', items));
    }));
  }
});
