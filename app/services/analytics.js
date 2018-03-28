import Service from '@ember/service';
import {Promise} from 'rsvp';
import ENV from 'pos/config/environment';

const {APP: {GOOGLE_ANALYTICS_ID}} = ENV;

export default Service.extend({
  init() {
    this.set('track', {
      _track: this._track,

      whisperToClipboardSuccess: () => { this._track('Search', 'Copy whisper to clipboard', 'Success') },
      whisperToClipboardFailure: () => { this._track('Search', 'Copy whisper to clipboard', 'Failure') },

      searchCreation: () => { this._track('Search', 'Create query') },
      searchReload: () => { this._track('Search', 'Reload query') },
      searchLazyLoad: (index) => { this._track('Search', `Lazy load query - ${index}`) },

      adblockDetected: () => { this._track('Advertisement', 'Adblock detection', 'Positive') },
      adblockUndetected: () => { this._track('Advertisement', 'Adblock detection', 'Negative') }
    });
  },

  load() {
    if (!GOOGLE_ANALYTICS_ID) return this._log('Skipped analytics loading');

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    this._ga('create', GOOGLE_ANALYTICS_ID, 'auto');
    this._ga('send', 'pageview');
  },

  _track(category, action, label = null, value = null) {
    if (!GOOGLE_ANALYTICS_ID) return this._log(`Category: ${category}; Action: ${action}; Label: ${label || '- '}; Value: ${value || '- '}.`);

    this._ga('send', 'event', category, action, label, value)
  },

  _ga() {
    if (!window.ga) return;
    window.ga(...arguments);
  },

  _log() {
    console.info('Analytics : ', ...arguments);
  }
});
