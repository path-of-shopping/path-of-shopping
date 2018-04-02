import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {equal, or} from '@ember/object/computed';
import ModFilterTypes from 'pos/constants/mod-filter-types';

export default Component.extend({
  searchQueryManager: service('managers/search-query-manager'),

  block: null,
  typeOptions: Object.values(ModFilterTypes),

  isWeightType: equal('block.type', ModFilterTypes.WEIGHT),
  isCountType: equal('block.type', ModFilterTypes.COUNT),
  isMinMaxRequired: or('isWeightType', 'isCountType'),

  didReceiveAttrs() {
    this.ensureEmptyMod();
  },

  typeSelect(type) {
    this.set('block.type', type);
  },

  ensureEmptyMod() {
    const hasEmptyMods = this.get('block.mods').some((modItem) => !modItem.get('mod'));

    if (hasEmptyMods) return;

    this.get('block.mods').pushObject(this.get('searchQueryManager').initModFilterItem());
  },

  removeMod(mod) {
    this.get('block.mods').removeObject(mod);
    this.ensureEmptyMod();
  }
});
