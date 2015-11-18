import DS from 'ember-data';
import ENV from '../config/environment';

let applicationAdapter;

if (ENV.environment === "test") {
  applicationAdapter = DS.RESTAdapter;
} else {
  applicationAdapter = DS.JSONAPIAdapter;
}

export default applicationAdapter.extend({
  host: ENV.apiHost,

  shouldBackgroundReloadRecord() {
    return false;
  },
});
