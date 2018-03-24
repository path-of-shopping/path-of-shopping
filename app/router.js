import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('search', {path: '/'}, function() {
    this.route('results', {path: '/search/:key'});
  });

  this.route('maintenance');

  this.route('not-found', {path: '*path'});
});

export default Router;
