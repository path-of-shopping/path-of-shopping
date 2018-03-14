import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {later} from '@ember/runloop';
import safeGet from 'pos/utils/safe-get';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const ANY_OPTION_INDEX = -1;
const MAX_DISPLAY_LENGTH = 25;

export default Component.extend({
  label: '',
  options: [],
  searchableKey: null,
  valueKey: null,
  value: null,
  onSelect: () => {},

  selectedIndex: ANY_OPTION_INDEX,
  prompt: '',
  isOpened: false,

  didReceiveAttrs() {
    const {value, options, valueKey, searchableKey} = this.getProperties('value', 'options', 'valueKey', 'searchableKey');

    if (!value) return;

    const selectedOption = options.find((option) => safeGet(option, valueKey) === value);
    this.set('prompt', safeGet(selectedOption, searchableKey));
  },

  promptKeyPress(_value, event) {
    const keyCode = event.which;

    this.set('isOpened', true);

    if (![KEY_UP, KEY_DOWN, KEY_ENTER].includes(keyCode)) return;

    event.preventDefault();
    event.stopPropagation();

    const {selectedIndex, filteredOptions} = this.getProperties('selectedIndex', 'filteredOptions');

    if (keyCode === KEY_ENTER) return this.select(filteredOptions[selectedIndex] || null);
    if (keyCode === KEY_UP && selectedIndex > ANY_OPTION_INDEX) return this.decrementProperty('selectedIndex');
    if (keyCode === KEY_DOWN && selectedIndex < (filteredOptions.length - 1)) return this.incrementProperty('selectedIndex');
  },

  promptBlur() {
    const {onSelect, prompt} = this.getProperties('onSelect', 'prompt');
    later(() => {
      this.set('isOpened', false);
      if (!prompt) onSelect(null);
    }, 150);
  },

  promptFocus() {
    this.set('isOpened', true);
  },

  select(option) {
    this.set('isOpened', false);
    return this.get('onSelect')(option);
  },

  filteredOptionsObserver: observer('filteredOptions', function() {
    if (this.get('filteredOptions').length) return this.set('selectedIndex', 0);
    this.set('selectedIndex', ANY_OPTION_INDEX);
  }),

  regexPrompt: computed('prompt', function() {
    const {prompt} = this.getProperties('prompt');

    if (!prompt) return null;

    return new RegExp(prompt.split('').map((char) => `(${char})`).join('.*'), 'i');
  }),

  filteredOptions: computed('regexPrompt', function() {
    const {options, regexPrompt, searchableKey} = this.getProperties('options', 'regexPrompt', 'searchableKey');

    if (regexPrompt === null) return options.length <= MAX_DISPLAY_LENGTH ? options : [];

    const filteredOptions = options.filter((option) => regexPrompt.test(safeGet(option, searchableKey).replace(/\(.+\)/g, '')));

    return filteredOptions.length <= MAX_DISPLAY_LENGTH ? filteredOptions : [];
  })
});
