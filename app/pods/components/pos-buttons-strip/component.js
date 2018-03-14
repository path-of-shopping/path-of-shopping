import Component from '@ember/component';

export default Component.extend({
  options: [],
  value: null,
  onSelect: () => {},

  select(option) {
    this.get('onSelect')(option);
  }
});
