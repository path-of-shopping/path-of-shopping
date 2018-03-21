import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Ember from 'ember';
import {task} from 'ember-concurrency';

export default Component.extend({
  searchFetcher: service('fetchers/search-fetcher'),
  itemsFetcher: service('fetchers/items-fetcher'),

  key: null,

  search: null,
  items: Ember.A([]),

  didReceiveAttrs() {
    this._clear();
    this.get('initialLoad').perform();
  },

  initialLoad: task(function *() {
    const {key, items, searchFetcher, itemsFetcher} = this.getProperties('key', 'items', 'searchFetcher', 'itemsFetcher');

    const search = yield searchFetcher.fetch(key);
    this.set('search', search);
    const nextItemIds = search.getNextItemIds();

    const loadedItems = yield itemsFetcher.fetch(key, nextItemIds);
    items.addObjects(loadedItems);
    window.scrollTo(0,0);
  }).drop(),

  lazyLoad() {
    const {search, items, itemsFetcher} = this.getProperties('search', 'items', 'itemsFetcher');
    if (!search) return null;

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
