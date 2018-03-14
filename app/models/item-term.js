import EmberObject from '@ember/object';
import {computed} from '@ember/object';

export default EmberObject.extend({
  id: null,
  name: null,
  base: null,
  isUnique: false,

  searchableName: computed('name', 'base', function() {
    const {name, base} = this.getProperties('name', 'base');

    if (name) return `${name} (${base})`;
    return base;
  })
});
