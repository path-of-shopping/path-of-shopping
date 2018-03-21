import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import {and} from '@ember/object/computed'

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  item: null,

  isCopied: false,

  hasPrice: and('item.trade.priceCurrency', 'item.trade.priceAmount'),

  priceCurrencyImage: computed('item.trade.priceCurrency', function() {
    const {item, staticDataFetcher} = this.getProperties('item', 'staticDataFetcher');
    const priceCurrency = item.get('trade.priceCurrency');
    if (!priceCurrency) return null;

    const selectedCurrency = staticDataFetcher.get('currencies').find((currency) => currency.get('id') === priceCurrency);
    if (!selectedCurrency) return null;

    return selectedCurrency.get('image');
  }),

  copyWhisperToClipboard() {
    this.toggleProperty('isCopied');

    try {
      this.$('input').select();
      document.execCommand('copy');
    } catch (_error) {
      prompt('Copy whisper', this.get('item.trade.whisper'));
    }
  }
});
