import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  tradeFilter: null,

  currencies: readOnly('staticDataFetcher.currencies'),

  currencySelect(currency) {
    this.set('tradeFilter.price.currency', currency ? currency.id : '');
  }
});
