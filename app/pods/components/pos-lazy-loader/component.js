import Component from '@ember/component';
import Loadable from 'pos/mixins/components/loadable';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, Loadable, {
  onLazyLoad: () => {},

  isLoading: false,
  isFinish: false,

  didEnterViewport() {
    const responsePromise = this.get('onLazyLoad')();
    if (!responsePromise) return;

    this.loadWhile(responsePromise);
  }
});
