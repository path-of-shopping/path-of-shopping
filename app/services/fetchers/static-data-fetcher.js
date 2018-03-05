import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import Currency from 'pos/models/currency';
import Mod from 'pos/models/mod';
import ItemTerm from 'pos/models/item-term';

export default Service.extend({
  api: service('api'),

  currencies: [],
  itemTerms: [],
  leagues: [],
  mods: [],

  fetch() {
    return this.get('api')
      .httpGet('static')
      .then(({currencies, items, leagues, mods}) => {
        this.set('currencies', currencies.map((rawCurrency) => Currency.create(rawCurrency)));
        this.set('itemTerms', items.map((rawItemTerm) => ItemTerm.create(rawItemTerm)));
        this.set('leagues', leagues);
        this.set('mods', mods.map((rawMod) => Mod.create(rawMod)));
      });
  }
});
