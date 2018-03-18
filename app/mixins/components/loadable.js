import Mixin from '@ember/object/mixin';
import {later, cancel} from '@ember/runloop';

const LOAD_THRESHOLD = 100;

export default Mixin.create({
  isLoading: false,

  loadWhile(promise) {
    const loadingId = later(this, () => this.set('isLoading', true), LOAD_THRESHOLD);

    promise.finally(() => {
      cancel(loadingId);
      this.set('isLoading', false);
    });

    return promise;
  }
});
