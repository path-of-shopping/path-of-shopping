import Component from '@ember/component';
import {computed} from '@ember/object';
import {lte} from '@ember/object/computed';

const COLORS_MAP = {
  R: 'red',
  G: 'green',
  B: 'blue'
};

export default Component.extend({
  tagName: 'ul',
  classNameBindings: ['isFourSockets:sockets--four'],

  sockets: [],

  displaySockets: computed('sockets', function() {
    const sockets = this.get('sockets');

    if (!sockets) return [];

    return sockets.map(({group, color}, index) => ({
      color: COLORS_MAP[color],
      isLinked: (index + 1) < sockets.length && sockets[index + 1].group === group
    }));
  }),

  isFourSockets: lte('displaySockets.length', 4)
});
