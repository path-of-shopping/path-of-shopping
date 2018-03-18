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

  didReceiveAttrs() {
    const {key, items, searchFetcher, itemsFetcher} = this.getProperties('key', 'items', 'searchFetcher', 'itemsFetcher');

    this._clear();

    this.loadWhile(searchFetcher.fetch(key).then((search) => {
      this.set('search', search);
      const nextItemIds = search.getNextItemIds();
      if (nextItemIds.length === 0) return;
      return itemsFetcher.fetch(search.get('key'), nextItemIds).then((loadedItems) => {
        items.addObjects(loadedItems);
        window.scrollTo(0,0);
      });
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
  },

  _clear() {
    this.set('search', null);
    this.get('items').clear();
  }
});
