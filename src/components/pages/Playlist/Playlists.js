import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import PlaylistDetails from "./PlaylistDetails";
import "./Playlist.css";
import PlaylistCreator from "./PlaylistCreator";
import { Link } from "react-router-dom";

function Playlists() {
  const { access_token } = useContext(ApiContext);
  const [ playlist, setPlaylist ] = useState({});
  const [ selectedPlaylist, setSelectedPlaylist ] = useState(null);
  const [ showForm, setShowForm ] = useState(false);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        await axios
          .get(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            setPlaylist(response.data);
            if (response.data.items.length > 0) {
              setSelectedPlaylist(response.data.items[ 0 ]);
            }
          });
      } catch (error) {

      }
    };

    getPlaylist();
  }, [ access_token ]);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const showPlaylistCreator = () => {
    setShowForm(!showForm);
  };

  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylist((prevPlaylist) => {
      const updatedPlaylist = { ...prevPlaylist };
      updatedPlaylist.items.push(newPlaylist);
      return updatedPlaylist;
    });
    setShowForm(false);
  };

  if (playlist) {
    return (
      <>

        <div className="playlist-container">

          <section className="playlist-names">
            <Link to={"/search"} className="generalSearch-link">Go to search</Link>
            <div className="list-names">
              <div className="btn-div">
                <button onClick={showPlaylistCreator} className="top-buttons name">
                  New Playlist
                </button>
              </div>
              {playlist?.items?.map((playlist) => {
                return (
                  <div
                    key={playlist.id}
                    onClick={() => handlePlaylistClick(playlist)}
                    style={{ cursor: "pointer" }}
                    className="name btn-div"
                  >
                    <button className="name">{playlist.name}</button>
                  </div>
                );
              })}
            </div>

            {showForm && (
              <PlaylistCreator onPlaylistCreated={handlePlaylistCreated} />
            )}
          </section>
          <section className="playlist-details">
            {selectedPlaylist && (
              <PlaylistDetails selectedPlaylist={selectedPlaylist} />
            )}
          </section>
        </div>
      </>
    );
  } else {
    return "No playlist created";
  }
}

export default Playlists;
