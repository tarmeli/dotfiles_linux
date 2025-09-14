//playerctl -f '{{artist}} - {{title}}' -p spotify metadata
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec)

const getSpotifyCurrentArtist = async () => {
  const { stdout: artist, stderr } = await execAsync("playerctl -f '{{artist}}' -p spotify metadata")

  if (stderr) {
    console.error(stderr)

    return 'artist error'
  }

  return artist.replace("\n", "")
}

const getSpotifyCurrentSong = async () => {
  const { stdout: song, stderr } = await execAsync("playerctl -f '{{title}}' -p spotify metadata")

  if (stderr) {
    console.log(stderr)

    return 'song error'
  }

  return song.replace("\n", "")
}

const getCurrentArtistAndSongJSON = async () => {
  const artist = await getSpotifyCurrentArtist()
  const song = await getSpotifyCurrentSong()

  console.log(JSON.stringify({ artist, song }))
}

getCurrentArtistAndSongJSON()
