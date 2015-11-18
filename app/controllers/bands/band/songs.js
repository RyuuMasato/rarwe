import Ember from 'ember';

export default Ember.Controller.extend({
  title: '',
  songCreationStarted: false,

  isAddButtonDisabled: Ember.computed('title', function(){
    return Ember.isEmpty(this.get('title'));
  }),

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      "ratingDesc": "rating:desc,title:asc",
      "ratingAsc": "rating:asc,title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc",
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties'),

  actions: {
    updateRating: function(params) {
        var song = params.item,
            rating = params.rating;

        if(song.get('rating') === rating) {
          rating = 0;
        }

        song.set('rating', rating);
        song.save();
    },
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },
    setSorting: function(option) {
      this.set('sortBy', option);
    },
  },
});
