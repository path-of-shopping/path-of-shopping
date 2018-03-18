import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  item: null,
  onModUpdate: () => {},

  mods: readOnly('staticDataFetcher.mods'),

  modSelect(mod) {
    this.set('item.mod', mod ? mod.get('id') : null);
    this.get('onModUpdate')(mod);
  }
});
