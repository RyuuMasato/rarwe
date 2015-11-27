import DS from 'ember-data';
import ENV from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

let applicationAdapter;

if (ENV.environment === "test") {
  applicationAdapter = DS.RESTAdapter.extend({
    host: ENV.apiHost,

    shouldBackgroundReloadRecord() {
      return false;
    }
  });
} else {
  applicationAdapter = FirebaseAdapter.extend({
    firebase: new Firebase(ENV.firebase),

    shouldBackgroundReloadRecord() {
      return false;
    }
  });
}

export default applicationAdapter;
