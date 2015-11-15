import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('star-rating', 'StarRatingComponent', {
  integration: true
});

test('Reders the full and empty stars correctly', function(assert) {
  assert.expect(6);

  var song = Ember.Object.create({ rating: 4 });
  this.set('song', song);
  this.set('max-rating', 5);

  this.render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 1, "The right amount of empty stars is rendered");

  this.set('maxRating', 10);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 6, "The right amount of empty stars is rendered");

  this.set('rating', 2);

  assert.equal(this.$('.glyphicon-star').length, 2, "The right amount of stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 8, "The right amount of empty stars is rendered");
});
