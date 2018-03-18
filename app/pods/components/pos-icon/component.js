import Component from '@ember/component';
import {computed} from '@ember/object';

const BASE_CLASS = 'fas';
const CLASS_PREFIX = 'fa-';

const SPINNABLE_CLASSES = ['spinner'];

export default Component.extend({
  tagName: 'i',
  classNameBindings: [BASE_CLASS, 'iconClass', 'modifierClass'],

  icon: '',

  iconClass: computed('icon', function() {
    return `${BASE_CLASS} ${CLASS_PREFIX}${this.get('icon')}`;
  }),

  modifierClass: computed('icon', function() {
    const icon = this.get('icon');

    if (SPINNABLE_CLASSES.includes(icon)) return `${CLASS_PREFIX}pulse`;

    return null;
  })
});
