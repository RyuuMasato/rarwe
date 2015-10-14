import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('bands', function() {
    this.route('band', { path: ':slug', resetNamespace: true }, function() {
      this.route('songs');
      this.route('albums');
    });
  });
});

export default Router;
