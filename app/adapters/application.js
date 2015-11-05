import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.apiHost,

  shouldBackgroundReloadRecord: function() {
    return false;
  }
});
