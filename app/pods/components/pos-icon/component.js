import Component from '@ember/component';
import {computed} from '@ember/object';
import {bool} from '@ember/object/computed';

const BASE_CLASS = 'fas';
const CLASS_PREFIX = 'fa-';

const SPINNABLE_CLASSES = ['spinner'];

export default Component.extend({
  tagName: 'i',
  classNameBindings: ['iconClass', 'modifierClass', 'isClickable:icon--clickable'],

  icon: '',
  onClick: null,

  iconClass: computed('icon', function() {
    return `${BASE_CLASS} ${CLASS_PREFIX}${this.get('icon')}`;
  }),

  modifierClass: computed('icon', function() {
    const icon = this.get('icon');

    if (SPINNABLE_CLASSES.includes(icon)) return `${CLASS_PREFIX}pulse`;

    return null;
  }),

  isClickable: bool('onClick'),

  click() {
    const onClick = this.get('onClick');
    if (!onClick) return;

    onClick();
  }
});
