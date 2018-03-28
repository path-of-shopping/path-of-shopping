import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return params;
  },

  setupController(controller, {key}) {
    controller.set('key', key);
  }
});
