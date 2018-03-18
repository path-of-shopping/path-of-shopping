import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  onLazyLoad: () => {},

  isLoading: false,
  isFinish: false,

  didEnterViewport() {
    const response = this.get('onLazyLoad')();
    if (!response) return;

    this.set('isLoading', true);
    response.then(() => this.set('isLoading', false));
  }
});
