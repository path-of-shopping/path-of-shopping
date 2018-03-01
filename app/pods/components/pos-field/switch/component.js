import Component from '@ember/component';
import {computed} from '@ember/object';
import {equal} from '@ember/object/computed';

const OFF_VALUE = '';

export default Component.extend({
  label: null,
  value: OFF_VALUE,
  toggleableValue: '1',
  toggleableValueLabel: null,

  isOff: equal('value', OFF_VALUE),

  toggleValue() {
    const {isOff, toggleableValue} = this.getProperties('isOff', 'toggleableValue');
    this.set('value', isOff ? toggleableValue : OFF_VALUE);
  }
});
