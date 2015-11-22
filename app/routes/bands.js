import Ember from 'ember';
import wait from '../utils/wait';

export default Ember.Route.extend({
  model: function() {
    return wait(this.store.findAll('band'), 1000);
  },

  actions: {
    didTransition: function() {
      Ember.$(document).attr('title', 'Bands - Rock & Roll');
    },
    createBand: function () {
      var route = this,
          controller = this.get('controller');

      var band = this.store.createRecord('band' ,controller.getProperties('name'));
      band.save().then( function () {
        controller.set('name', '');
        route.transitionTo('bands.band.songs' ,band);
      });
    },
    removeBand: function (band) {
      this.store.find('band', band.id).then(function (band) {
        band.destroyRecord();
      });
    }
  }
});
