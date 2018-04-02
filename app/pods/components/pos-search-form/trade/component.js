import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  tradeFilter: null,
  selectedCurrency: null,

  currencies: readOnly('staticDataFetcher.currencies'),

  didReceiveAttrs() {
    const selectedCurrencyId = this.get('tradeFilter.price.currency');
    this.set('selectedCurrency', this.get('currencies').find((currency) => currency.id === selectedCurrencyId));
  },

  currencySelect(currency) {
    this.set('selectedCurrency', currency);
    this.set('tradeFilter.price.currency', currency ? currency.id : '');
  }
});
