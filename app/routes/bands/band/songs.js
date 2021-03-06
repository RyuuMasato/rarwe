import Ember from 'ember';
import wait from '../../../utils/wait';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  model: function() {
    return wait(this.modelFor('bands.band'), 1000);
  },

  actions: {
    didTransition:  function() {
      var band = this.modelFor('bands.band');
      var name = capitalizeWords(band.get('name'));
      Ember.$(document).attr('title', `${name} songs - Rock & Roll`);
    },
    createSong: function() {
      var controller = this.get('controller'),
          band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band,
        rating: 0
      });

      band.get('songs').addObject(song);

      song.save().then(function () {
        controller.set('title', '');
      });
    },
    removeSong: function(song) {
      this.store.find('song', song.id).then(function (song) {
        song.destroyRecord();
      });
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      song.set('rating', rating);
    }
  }
});
