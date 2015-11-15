export default {
  stubBands: function(pretender, data) {
    this.bandCount = data.bands ? data.bands.length : 0;
    this.songCount = data.songs ? data.songs.length : 0;
    pretender.get('/bands', function(){
      return [200, {"Content-Type": "application/json"}, JSON.stringify(data)];
    });
  },

  stubCreateBand: function(pretender) {
    var stubs = this;
    pretender.post('/bands', function(request) {
      var payload = JSON.parse(request.requestBody);
      payload.band.id = stubs.bandCount + 1;
      stubs.bandCount += 1;
      return [200, {"Content-Type": "application/json"}, JSON.stringify(payload)];
    });
  },

  stubCreateSong: function(pretender) {
    var stubs = this;
    pretender.post('/songs', function(request) {
      var payload = JSON.parse(request.requestBody);
      payload.song.id = stubs.songCount + 1;
      stubs.songCount += 1;
      return [200, {"Content-Type": "application/json"}, JSON.stringify(payload)];
    });
  }
};
