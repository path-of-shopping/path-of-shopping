import EmberPowerSelect from 'ember-power-select/components/power-select';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default EmberPowerSelect.extend({
  i18n: service('i18n'),

  allowClear: true,
  renderInPlace: true,

  placeholder: computed('allowClear', 'i18n.locale', function() {
    const {allowClear, i18n} = this.getProperties('allowClear', 'i18n');
    if (!allowClear) return null

    return i18n.t('power_select.any');
  }),

  loadingMessage: computed('i18n.locale', function() {
    return this.get('i18n').t('power_select.loading');
  }),

  noMatchesMessage: computed('i18n.locale', function() {
    return this.get('i18n').t('power_select.empty');
  }),

  searchMessage: computed('i18n.locale', function() {
    return this.get('i18n').t('power_select.prompt');
  })
});
