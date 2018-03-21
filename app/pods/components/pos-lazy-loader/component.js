import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import {task} from 'ember-concurrency';

export default Component.extend(InViewportMixin, {
  onLazyLoad: () => {},

  isLoading: false,
  isFinish: false,

  lazyLoad: task(function *() {
    yield this.get('onLazyLoad')();
  }).drop(),

  didEnterViewport() {
    this.get('lazyLoad').perform();
  }
});
