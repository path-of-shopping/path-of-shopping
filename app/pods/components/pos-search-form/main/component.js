import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';
import ItemCategories from 'pos/constants/item-categories';
import ItemRarities from 'pos/constants/item-rarities';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  nameFilter: null,
  typeFilter: null,

  selectedTermName: '',

  itemTerms: readOnly('staticDataFetcher.itemTerms'),
  itemCategories: ItemCategories,
  itemRarities: ItemRarities,

  itemTermSelect(itemTerm) {
    if (!itemTerm) return this.set('nameFilter', {
      id: null,
      name: null,
      base: null
    });

    const {id, name, base} = itemTerm.getProperties('id', 'name', 'base');

    this.set('nameFilter', {
      id,
      name: name || '',
      base: base || ''
    });
  },

  itemCategorySelect(itemCategory) {
    this.set('typeFilter.category', itemCategory ? itemCategory.id : '');
  },

  itemRaritySelect(itemRarity) {
    this.set('typeFilter.rarity', itemRarity ? itemRarity.id : '');
  }
});
