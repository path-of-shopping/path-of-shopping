import Component from '@ember/component';
import {computed} from '@ember/object';
import {equal} from '@ember/object/computed';

const YES_VALUE = 'true';
const NO_VALUE = 'false';

export default Component.extend({
  label: null,
  value: '',

  isYesSelected: equal('value', YES_VALUE),
  isNoSelected: equal('value', NO_VALUE),
  isAnySelected: computed('isYesSelected', 'isNoSelected', function() {
    return !this.get('isYesSelected') && !this.get('isNoSelected');
  }),

  selectYes() {
    this.set('value', YES_VALUE);
  },
  selectNo() {
    this.set('value', NO_VALUE);
  },
  selectAny() {
    this.set('value', '');
  }
});
