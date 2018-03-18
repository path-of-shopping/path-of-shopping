import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNameBindings: ['isLoading:button--loading'],

  isLoading: false
});
