import EmberObject from '@ember/object';
import {computed} from '@ember/object';

export default EmberObject.extend({
  id: null,
  name: null,
  base: null,
  isUnique: false
});
