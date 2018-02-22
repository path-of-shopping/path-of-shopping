import Component from '@ember/component';
import {alias} from '@ember/object/computed';

export default Component.extend({
  label: null,
  values: {},

  minValue: alias('values.min'),
  maxValue: alias('values.max')
});
