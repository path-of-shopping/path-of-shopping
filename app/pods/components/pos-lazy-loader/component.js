import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import {task} from 'ember-concurrency';

export default Component.extend(InViewportMixin, {
  lazyLoadableTask: null,

  didEnterViewport() {
    this.get('lazyLoadableTask').perform();
  }
});
