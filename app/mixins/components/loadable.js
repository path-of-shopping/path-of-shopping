import Mixin from '@ember/object/mixin';

export default Mixin.create({
  isLoading: false,

  loadWhile(promise) {
    this.set('isLoading', true);
    promise.finally(() => this.set('isLoading', false));
    return promise;
  }
});
