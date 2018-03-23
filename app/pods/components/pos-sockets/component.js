import Component from '@ember/component';
import {computed} from '@ember/object';
import {lte, equal} from '@ember/object/computed';

const COLORS_MAP = {
  R: 'red',
  G: 'green',
  B: 'blue'
};

export default Component.extend({
  tagName: 'ul',
  classNameBindings: ['socketsModifier'],

  sockets: [],

  displaySockets: computed('sockets', function() {
    const sockets = this.get('sockets');

    if (!sockets) return [];

    return sockets.map(({group, color}, index) => ({
      color: COLORS_MAP[color],
      isLinked: (index + 1) < sockets.length && sockets[index + 1].group === group
    }));
  }),

  socketsModifier: computed('displaySockets.length', function() {
    const socketsCount = this.get('displaySockets.length');

    if (socketsCount === 1) return 'sockets--one';
    if (socketsCount <= 4) return 'sockets--four';
    return null;
  })
});
