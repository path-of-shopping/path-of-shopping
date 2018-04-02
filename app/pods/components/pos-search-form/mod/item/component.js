import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly, equal} from '@ember/object/computed';
import ModFilterTypes from 'pos/constants/mod-filter-types';
import {task, timeout} from 'ember-concurrency';
import limitedFilter from 'pos/utils/limited-filter';
import searchTermToRegex from 'pos/utils/search-term-to-regex';

const SEARCH_DEBOUNCE = 500;

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  item: null,
  filterType: null,
  onModUpdate: () => {},
  onModRemove: () => {},

  selectedMod: null,
  mods: readOnly('staticDataFetcher.mods'),

  isWeightRequired: equal('filterType', ModFilterTypes.WEIGHT),

  searchModsTask: task(function *(term) {
    yield timeout(SEARCH_DEBOUNCE);

    const regexTerm = searchTermToRegex(term);
    return limitedFilter(this.get('mods'), (mod) => regexTerm.test(mod.get('name')));
  }),

  didReceiveAttrs() {
    const selectedModId = this.get('item.mod');
    this.set('selectedMod', this.get('mods').find((mod) => mod.id === selectedModId));
  },

  modSelect(mod) {
    this.set('selectedMod', mod);
    this.set('item.mod', mod ? mod.get('id') : null);
    this.get('onModUpdate')(mod);
  },

  remove() {
    const {onModRemove, item} = this.getProperties('onModRemove', 'item');
    onModRemove(item);
  }
});
