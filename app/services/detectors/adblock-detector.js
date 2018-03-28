import Service from '@ember/service';
import {Promise} from 'rsvp';

const BAIT_FILENAME = '/assets/images/ad-pixel.jpg';

export default Service.extend({
  detect() {
    return new Promise((resolve) => {
      const bait = new Image();

      bait.onload = () => { resolve(false) };
      bait.onerror = () => { resolve(true) };

      bait.src = location.origin + BAIT_FILENAME;
    });
  }
});
