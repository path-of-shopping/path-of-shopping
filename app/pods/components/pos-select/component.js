import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {later} from '@ember/runloop';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const ANY_OPTION_INDEX = -1;

export default Component.extend({
  options: [],
  searchableKey: null,
  valueKey: null,
  value: null,
  onSelect: () => {},

  selectedIndex: ANY_OPTION_INDEX,
  prompt: '',
  isOpened: false,

  didReceiveAttrs(attrs) {
    const {value, options, valueKey, searchableKey} = this.getProperties('value', 'options', 'valueKey', 'searchableKey');

    console.log(attrs);
    if (!value) return;

    const selectedOption = options.find((option) => option.get(valueKey) === value);
    this.set('prompt', selectedOption.get(searchableKey));
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
    const {onSelect, searchableKey} = this.getProperties('onSelect', 'searchableKey');
    this.set('prompt', option ? option.get(searchableKey) : '');
    this.set('isOpened', false);
    return onSelect(option);
  },

  filteredOptionsObserver: observer('filteredOptions', function() {
    this.set('selectedIndex', ANY_OPTION_INDEX);
  }),

  regexPrompt: computed('prompt', function() {
    const prompt = this.get('prompt');

    if (!prompt) return null;

    return new RegExp(prompt.split('').map((char) => `(${char})`).join('.*'), 'i');
  }),

  filteredOptions: computed('regexPrompt', function() {
    const {options, regexPrompt, searchableKey} = this.getProperties('options', 'regexPrompt', 'searchableKey');

    if (regexPrompt === null) return options;

    return options.filter((option) => regexPrompt.test(option.get(searchableKey)));
  })
});
