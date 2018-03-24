import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import fetch from 'fetch';
import ENV from 'pos/config/environment';

const {APP: {API_URL}} = ENV;

export default Service.extend({
  router: service('router'),

  httpGet(endpoint) {
    return this._fetch('GET', endpoint);
  },

  httpPost(endpoint, data) {
    return this._fetch('POST', endpoint, data);
  },

  _fetch(method, endpoint, data) {
    const params = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) params.body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/${endpoint}`, params).then((response) => {
        if (response.status >= 500) return this.get('router').transitionTo('maintenance');
        if (response.status >= 400) return response.json().then(reject);
        return response.json().then(resolve);
      });
    });
  }
});
