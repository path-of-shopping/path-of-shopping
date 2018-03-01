import Route from '@ember/routing/route';
import Ember from 'ember';
import fetch from 'fetch';

export default Route.extend({
  model(params) {
    return params;
  },

  setupController(controller, {key}) {
    controller.set('key', key);
  }
});
