import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  analytics: service('analytics'),
  adblockDetector: service('detectors/adblock-detector'),

  activate() {
    const {analytics, adblockDetector} = this.getProperties('analytics', 'adblockDetector');

    adblockDetector.detect().then((adblockDetected) => {
      if (adblockDetected) return analytics.track.adblockDetected();
      analytics.track.adblockUndetected();
    });
  }
});
