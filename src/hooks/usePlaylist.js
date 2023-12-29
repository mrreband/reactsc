/**
 * Custom hook to manage the list of tracks to render for playback.
 *
 * @param {Array} soundData - An array of sound objects, each with an id and url.
 * @param {String} playlistSlug - the playlist slug url param, if any
 *
 * @returns {Object} An object containing:
 * state:
 * - `playlists` and `setPlaylists` to store the list of available playlists
 * - `currentPlaylist` and `setCurrentPlaylist` to store the current playlist object
 * auxiliary:
 * - `playlistTitle` returns the title of the current playlist, fallback on "Piano Podcast"
 * - `playlistTracks` returns the tracks in the current playlist, fallback on all tracks
 */

import { useState, useEffect } from 'react';

export default function usePlaylist(soundData, playlistSlug) {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({});

  useEffect(() => {
    if (playlistSlug !== undefined) {
      setCurrentPlaylist(playlists.find((pl) => pl.slug === playlistSlug) || {});
    }
  }, [playlistSlug, playlists]);

  const playlistTitle = () => {
    return currentPlaylist.title || "Piano Podcast";
  };

  const playlistTracks = () => {
    if (currentPlaylist.tracks) {
      const tracks = soundData.filter((s) => currentPlaylist.tracks.includes(s.slug))
      return tracks;
    }
    return soundData;
  }

  return { playlistTitle, playlistTracks, playlists, setPlaylists, currentPlaylist, setCurrentPlaylist };
}