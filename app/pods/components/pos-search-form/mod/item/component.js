import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly, equal} from '@ember/object/computed';
import ModFilterTypes from 'pos/constants/mod-filter-types';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  item: null,
  filterType: null,
  onModUpdate: () => {},

  mods: readOnly('staticDataFetcher.mods'),
  isWeightRequired: equal('filterType', ModFilterTypes.WEIGHT),

  modSelect(mod) {
    this.set('item.mod', mod ? mod.get('id') : null);
    this.get('onModUpdate')(mod);
  }
});
