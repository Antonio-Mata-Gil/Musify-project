import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/Api";
import Searcher from "../Searcher/Searcher";
import { Link } from "react-router-dom";

function SearchMusicPlaylist({ handleSongSelected, handleUpdateSong }) {
  const { apiResponse, setEndpoint, search } = useContext(ApiContext);
  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=track`;
  const [track, setTrack] = useState("");

  useEffect(() => {
    setEndpoint(search_URL);
  }, [search_URL]);

  const filteredSong = apiResponse?.tracks?.items?.filter((track) =>
    track.name.toLowerCase().includes(search.toLowerCase())

  );


  const handleTrackSelected = (track) => {
    setTrack(track);
    handleSongSelected(track);
    handleUpdateSong(track);
  };

  return (
    <>
      <Searcher type={"track"} />
      <div className="addSongs">
        <h1>Add a song</h1>
        {apiResponse && apiResponse.tracks && apiResponse.tracks.items && (
          <ul className="song-list-container">
            {filteredSong?.map((song) => {
              return (
                <li key={song.id} className="song-list-item">
                  <Link to={`/track/${song.id}`}>
                    <img
                      src={song.album.images[0].url}
                      alt="song cover"
                      className="list-img"
                    />
                  </Link>
                  <div className="song-name">{song.name}</div>
                  <div className="song-artist">
                    {song.artists.map((artist) => {
                      return <span key={artist.id}>{artist.name}</span>;
                    })}
                  </div>
                  <div className="btn-div">
                    <button
                      className="song-list-btn"
                      onClick={() => handleTrackSelected(song)}
                    >
                      Add
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchMusicPlaylist;
