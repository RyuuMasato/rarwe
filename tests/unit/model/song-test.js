import { moduleForModel, test } from 'ember-qunit';

moduleForModel('song' ,'Song', {
  // Specify the other units that are required for this test.
  needs: ['model:band']
});

test('it exists' ,function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
