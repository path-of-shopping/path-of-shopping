import Component from '@ember/component';
import {computed} from '@ember/object';

const COLORS_MAP = {
  R: 'red',
  G: 'green',
  B: 'blue'
};

export default Component.extend({
  tagName: 'ul',

  sockets: [],

  displaySockets: computed('sockets', function() {
    const sockets = this.get('sockets');

    return sockets.map(({group, color}, index) => ({
      color: COLORS_MAP[color],
      isLinked: (index + 1) < sockets.length && sockets[index + 1].group === group
    }));
  })
});
