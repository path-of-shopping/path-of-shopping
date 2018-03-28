import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Ember from 'ember';
import {task} from 'ember-concurrency';

export default Component.extend({
  analytics: service('analytics'),
  searchFetcher: service('fetchers/search-fetcher'),
  itemsFetcher: service('fetchers/items-fetcher'),

  key: null,

  search: null,
  items: Ember.A([]),

  pageIndex: 0,

  didReceiveAttrs() {
    this._clear();
    this.get('initialLoadTask').perform();
  },

  initialLoadTask: task(function *() {
    const {key, items, searchFetcher, itemsFetcher} = this.getProperties('key', 'items', 'searchFetcher', 'itemsFetcher');

    const search = yield searchFetcher.fetch(key);
    this.set('search', search);
    const nextItemIds = search.getNextItemIds();

    const loadedItems = yield itemsFetcher.fetch(key, nextItemIds);
    items.addObjects(loadedItems);
    window.scrollTo(0,0);
  }).drop(),

  lazyLoadTask: task(function *() {
    const {search, items, itemsFetcher, analytics, pageIndex} = this.getProperties('search', 'items', 'itemsFetcher', 'analytics', 'pageIndex');
    if (!search) return null;

    const nextItemIds = search.getNextItemIds();
    if (nextItemIds.length === 0) return null;

    analytics.track.searchLazyLoad(pageIndex);
    this.incrementProperty('pageIndex');

    const newItems = yield itemsFetcher.fetch(search.get('key'), nextItemIds);
    items.addObjects(newItems);
  }).drop(),

  _clear() {
    this.set('search', null);
    this.get('items').clear();
  }
});
