import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Loadable from 'pos/mixins/components/loadable';
import Ember from 'ember';

export default Component.extend(Loadable, {
  searchFetcher: service('fetchers/search-fetcher'),
  itemsFetcher: service('fetchers/items-fetcher'),

  key: null,

  search: null,
  items: Ember.A([]),

  willInsertElement() {
    const {key, items, searchFetcher, itemsFetcher} = this.getProperties('key', 'items', 'searchFetcher', 'itemsFetcher');

    this.loadWhile(searchFetcher.fetch(key).then((search) => {
      this.set('search', search);
      const nextItemIds = search.getNextItemIds();
      if (nextItemIds.length === 0) return;
      return itemsFetcher.fetch(search.get('key'), nextItemIds).then((loadedItems) => items.addObjects(loadedItems));
    }));
  },

  lazyLoad() {
    const {search, items, itemsFetcher} = this.getProperties('search', 'items', 'itemsFetcher');
    if (!search) return;

    const nextItemIds = search.getNextItemIds();
    if (nextItemIds.length === 0) return null;

    const itemsPromise = itemsFetcher.fetch(search.get('key'), nextItemIds);
    itemsPromise.then((loadedItems) => items.addObjects(loadedItems));

    return itemsPromise;
  }
});
