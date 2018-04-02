import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  type: 'button',

  classNameBindings: ['isLoading:button--loading'],
  attributeBindings: ['type'],

  isLoading: false,
  onClick: () => {},

  click() {
    this.get('onClick')();
  }
});
