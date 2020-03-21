export default function getPlaylist(SoundData) {
  let songs = [];
  let i = 1;

  SoundData.forEach(item => {
    let song = {
      position: i.toString(),
      songName: item["title"],
      songUrl: item["url"]
    };
    songs.push(song);
    i += 1;
  });
  
  console.log(songs);
  return songs;
}