import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import moment from 'moment';

const CACHE_DURATION = 5000;

export default Service.extend({
  api: service('api'),
  searchFactory: service('factories/search-factory'),

  _cache: {},

  fetch(key) {
    const cache = this.get('_cache');

    if (cache[key] && cache[key].expireAt > moment().unix()) return cache[key].promise;

    const searchFactory = this.get('searchFactory');

    return this.cache(this.get('api').httpGet(`search/${key}`).then((rawSearch) => searchFactory.create(rawSearch)), key);
  },

  cache(promise, key) {
    this.set(`_cache.${key}`, {
      expireAt: moment().unix() + CACHE_DURATION,
      promise
    });

    return promise;
  }
});
