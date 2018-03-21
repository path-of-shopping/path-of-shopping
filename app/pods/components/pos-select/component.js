import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {later} from '@ember/runloop';
import safeGet from 'pos/utils/safe-get';
import {task, timeout} from 'ember-concurrency';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const ANY_OPTION_INDEX = -1;
const DEFAULT_VISIBLE_OPTIONS_LIMIT = 25;
const PROMPT_DEBOUNCE = 200;
const RESULTS_COLLAPSE_DELAY = 150;

export default Component.extend({
  label: '',
  options: [],
  searchableKey: null,
  valueKey: null,
  value: null,
  onSelect: () => {},
  visibleOptionsLimit: DEFAULT_VISIBLE_OPTIONS_LIMIT,

  selectedIndex: ANY_OPTION_INDEX,
  prompt: '',
  isOpened: false,
  regexPrompt: null,
  filteredOptions: [],

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
    this.get('closeResults').perform();
  },

  promptFocus() {
    this.set('isOpened', true);
  },

  select(option) {
    this.set('isOpened', false);
    return this.get('onSelect')(option);
  },

  closeResults: task(function *() {
    const {onSelect, prompt} = this.getProperties('onSelect', 'prompt');
    if (!prompt) onSelect(null);

    yield timeout(RESULTS_COLLAPSE_DELAY);

    this.set('isOpened', false);
  }).drop(),

  updateFilteredOptions: task(function *(prompt) {
    yield timeout(PROMPT_DEBOUNCE);

    const {options, searchableKey, visibleOptionsLimit} = this.getProperties('options', 'searchableKey', 'visibleOptionsLimit');

    if (!prompt) return this.set('filteredOptions', options.length <= visibleOptionsLimit ? options : []);
    const regexPrompt = new RegExp(prompt.replace(/[^\w ]/g).split(' ').map((word) => `(${word})`).join('.*'), 'i');

    const filteredOptions = options.filter((option) => regexPrompt.test(safeGet(option, searchableKey).replace(/\(.+\)/g, '')));
    this.setProperties({
      regexPrompt,
      filteredOptions: filteredOptions.length <= visibleOptionsLimit ? filteredOptions : []
    });
  }).restartable(),

  promptObserver: observer('prompt', function() {
    this.get('updateFilteredOptions').perform(this.get('prompt'));
  }),

  filteredOptionsObserver: observer('filteredOptions', function() {
    if (this.get('filteredOptions').length) return this.set('selectedIndex', 0);
    this.set('selectedIndex', ANY_OPTION_INDEX);
  })
});
