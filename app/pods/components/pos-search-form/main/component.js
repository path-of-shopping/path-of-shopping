import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';
import ItemCategories from 'pos/constants/item-categories';
import ItemRarities from 'pos/constants/item-rarities';
import {task, timeout} from 'ember-concurrency';
import limitedFilter from 'pos/utils/limited-filter';
import searchTermToRegex from 'pos/utils/search-term-to-regex';

const SEARCH_DEBOUNCE = 500;

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  nameFilter: null,
  typeFilter: null,

  selectedItemTerm: '',
  selectedItemCategory: null,
  selectedItemRarity: null,

  itemTerms: readOnly('staticDataFetcher.itemTerms'),
  itemCategories: ItemCategories,
  itemRarities: ItemRarities,

  didReceiveAttrs() {
    const {nameFilter, typeFilter} = this.getProperties('nameFilter', 'typeFilter');

    if (nameFilter) {
      this.set('selectedItemTerm', this.get('itemTerms').find((itemTerm) => itemTerm.id === nameFilter.id));
    }

    if (typeFilter) {
      this.set('selectedItemCategory', ItemCategories.find((itemCategory) => itemCategory.id === typeFilter.category));
      this.set('selectedItemRarity', ItemCategories.find((itemRarity) => itemRarity.id === typeFilter.rarity));
    }
  },

  searchItemTermsTask: task(function *(term) {
    yield timeout(SEARCH_DEBOUNCE);

    const regexTerm = searchTermToRegex(term);

    return limitedFilter(this.get('itemTerms'), (itemTerm) => {
      const {name, base} = itemTerm.getProperties('name', 'base');

      if (name) return regexTerm.test(name);
      return regexTerm.test(base);
    });
  }),

  itemTermSelect(itemTerm) {
    this.set('selectedItemTerm', itemTerm);

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
    this.set('selectedItemCategory', itemCategory);
    this.set('typeFilter.category', itemCategory ? itemCategory.id : '');
  },

  itemRaritySelect(itemRarity) {
    this.set('selectedItemRarity', itemRarity);
    this.set('typeFilter.rarity', itemRarity ? itemRarity.id : '');
  }
});
