import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import "./Playlist.css";
import SearchMusicPlaylist from "./SearchMusicPlaylist";
import { Link } from "react-router-dom";

function PlaylistDetails({ selectedPlaylist }) {
  const [ playlist, setPlaylist ] = useState(selectedPlaylist);
  const [ newSong, setNewSong ] = useState("");
  const { access_token } = useContext(ApiContext);
  const id = selectedPlaylist.id;

  useEffect(() => {
    const getPlaylistById = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setPlaylist(response.data);
      } catch (error) {

      }
    };

    getPlaylistById(id);
  }, [ id, access_token ]);


  const handleSongSelected = async (track) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
    const requestBody = {
      uris: [ `${track.uri}` ],
      position: 0,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      });

      setNewSong(response.data);
    } catch (error) {

    }
  };

  const removeSelectedSong = async (track) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;

    const requestBody = {
      tracks: [
        {
          uri: `${track.track.uri}`,
        },
      ],
      snapshot_id: `${selectedPlaylist.snapshot_id}`,
    };

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
        data: requestBody,
      });


    } catch (error) {

    }
  };


  const handleRemoveSong = async (track) => {
    await removeSelectedSong(track);
    const updatedPlaylist = { ...playlist };
    updatedPlaylist.tracks.items = updatedPlaylist.tracks.items.filter(
      (item) => item.track.id !== track.track.id
    );
    setPlaylist(updatedPlaylist);
  };

  const handleUpdateSong = (song) => {
    const updatedPlaylist = { ...playlist };
    updatedPlaylist.tracks.items.push({ track: song });
    setPlaylist(updatedPlaylist);
  };

  if (playlist) {
    return (
      <>
        <div className="header-playlist">
          {playlist.images[ 0 ] ? (
            <img
              src={playlist.images[ 0 ].url}
              alt={playlist.name}
              className="track-card-image"
            />
          ) : (
            <span className="material-symbols-outlined">music_note</span>
          )}
          <div className="title-playlist">
            <p>Playlist</p>
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p>
            <p>{playlist.owner.display_name}</p>
          </div>
        </div>
        <div className="content-playlist">
          <ul className="track-list">
            <li className="track-item hide" style={{ fontStyle: "italic", justifyContent: "space-around" }}>
              <div className="album-image">
                <div> </div>
              </div>

              <p className="track-name" style={{ textAlign: "center" }}>
              </p>
              <div>
                <p className="track-name track-name-album">Album</p>
              </div>
              <div className="btn-div">
                <button className="remove-btn"> </button>
              </div>
            </li>

            {playlist.tracks.items
              ? playlist.tracks.items.map((track, index) => {
                return (
                  <li key={track.track.id} className="track-item ">
                    {track.track.album ? (
                      <Link to={`/track/${track.track.id}`}>
                        <div className="album-image">
                          <span>{index + 1}. </span>
                          <img
                            className="track-card-image"
                            src={track.track.album.images[ 0 ].url}
                            alt="cover album"
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link to={`/track/${track.track.id}`}>
                        <span className="material-symbols-outlined">
                          music_note
                        </span>
                      </Link>
                    )}

                    <p className="track-name-playlist">{track.track.name}</p>
                    <div>
                      <p className="track-name-playlist track-name-album">
                        {track.track.album.name}
                      </p>
                    </div>

                    <div className="btn-div">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveSong(track)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })
              : null}
          </ul>
          <SearchMusicPlaylist
            handleSongSelected={handleSongSelected}
            handleUpdateSong={handleUpdateSong}
          />
        </div>
      </>
    );
  }

  return <p>Carregando detalhes da playlist...</p>;
}

export default PlaylistDetails;