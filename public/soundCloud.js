function buildSongUrl(id, userName, songName) {
  var basePath = "https://feeds.soundcloud.com/stream/"
  return `${basePath}${id}-${userName}-${songName}.mp3`
}

function getSongs() {
  var songs = [];
  var player = SC.Widget($('iframe.sc-widget')[0]);    
  player.bind(SC.Widget.Events.READY, function() {
    player.getSounds(function(songs) {
      songs.forEach(function(item){
        var id = item["id"];
        var songName = item["permalink"];
        var userName = item["user"]["permalink"];
        var songUrl = buildSongUrl(id, userName, songName);

        var song = {
          id: id, 
          title: item["title"],
          song_url: songUrl, 
          artwork_url: item["artwork_url"],
          waveform_url: item["waveform_url"]
        };
        songs.push(song);
        console.log(song);
      });
    });
  })
  return songs;
}

$(document).ready(function(){  
  var songs = getSongs();
});
