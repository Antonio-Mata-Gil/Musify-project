import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import "./Playlist.css";

function PlaylistCreator({ onPlaylistCreated }) {
  const [ inputValue, setInputValue ] = useState("");
  const [ createdPlaylist, setCreatedPlaylist ] = useState(null);
  const { apiResponse, setEndpoint, profile_URL, access_token } = useContext(ApiContext);
  const user_id = apiResponse.id;


  useEffect(() => {
    setEndpoint(profile_URL);
  }, [ profile_URL ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const createPlaylist = async () => {
  
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const requestBody = {
      name: inputValue,
      description: "New playlist description",
      public: false,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      });
      setCreatedPlaylist(response.data);
      setInputValue("");
      onPlaylistCreated(createdPlaylist);


    } catch (error) {

    }
  };


  return (
    <>
      <form className="playlist-creator-form">
        <label className="title">New Playlist</label>
        <input
          type="text"
          placeholder="Playlist name"
          required
          onChange={handleInputChange}
        />

        <div className="btn-div">
          <button type="submit" onClick={createPlaylist} >
            Create
          </button>
        </div>

      </form>

    </>
  );
}

export default PlaylistCreator;