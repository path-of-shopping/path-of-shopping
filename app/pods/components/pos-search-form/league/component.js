import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  leagueFilter: null,

  leagues: readOnly('staticDataFetcher.leagues'),

  leagueSelect(league) {
    this.set('leagueFilter', league);
  }
});
