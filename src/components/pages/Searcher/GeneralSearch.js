import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/Api";
import Searcher from "../Searcher/Searcher";
import "./GeneralSearch.css";
import { Link } from "react-router-dom";

function GeneralSearch() {
  const { apiResponse, setEndpoint, search } = useContext(ApiContext);
  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=track,album,artist&limit=30`;

  useEffect(() => {
    setEndpoint(search_URL);
  }, [ search_URL ]);


  const filteredSong = apiResponse?.tracks?.items?.filter((track) =>
    track.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAlbum = apiResponse?.albums?.items?.filter((track) =>
    track.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredArtist = apiResponse?.artists?.items?.filter((track) =>
    track.name.toLowerCase().includes(search.toLowerCase())
  );

  if (apiResponse) {
    return (
      <>
        <div className="searchGeneral">
          <ul className="search-list-container">
            <Searcher type={"track,album,artist"} />
            {filteredSong
              ? filteredSong?.map((song) => {
                return (
                  <>
                    <li key={song.id} className="search-list-item">
                      {song?.album?.images[ 0 ]?.url ? (
                        <Link to={`/track/${song.id}`}>
                          <img
                            src={song?.album?.images[ 0 ]?.url}
                            alt="song cover"
                            className="search-list-img"
                          />
                        </Link>
                      ) : (
                        <Link to={`/track/${song.id}`}>
                          <span className="material-symbols-outlined">
                            music_note
                          </span>
                        </Link>
                      )}
                      <div className="track-info">
                        <div className="track-name">{song.name}</div>

                        <div className="track-artist">
                          {song.artists.map((artist) => {
                            return <span key={artist.id}>{artist.name}</span>;
                          })}
                        </div>
                      </div>
                      <div className="search-type">{song.type}</div>
                    </li>
                  </>
                );
              })
              : null}

            {filteredAlbum
              ? filteredAlbum?.map((album) => {
                return (
                  <>
                    <li key={album.id} className="search-list-item">
                      <Link to={`/album/${album.id}`} key={album.id}>
                        <img
                          src={album.images[ 0 ].url}
                          alt="album cover"
                          className="search-list-img"
                        />
                      </Link>
                      <div className="search-album-info">
                        <div className="search-album-name">{album.name}</div>

                        <div className="search-artist">
                          {album.artists.map((artist) => {
                            return <span key={artist.id}>{artist.name}</span>;
                          })}
                        </div>
                      </div>
                      <div className="search-type">{album.type}</div>
                    </li>
                  </>
                );
              })
              : null}
            {filteredArtist
              ? filteredArtist?.map((artist) => {
                return (
                  <>
                    <li key={artist.id} className="search-list-item">
                      {artist?.images[ 0 ]?.url ? (
                        <Link to={`/artists/${artist.id}`} key={artist.id}>
                          <img
                            src={artist?.images[ 0 ]?.url}
                            alt="artist cover"
                            className="search-list-img"
                          />
                        </Link>
                      ) : (
                        <Link to={`/artists/${artist.id}`}>
                          <span className="material-symbols-outlined">
                            music_note
                          </span>
                        </Link>
                      )}
                      <div className="search-artist-name">{artist.name}</div>
                      <div className="search-type">{artist.type}</div>
                    </li>
                  </>
                );
              })
              : null}
          </ul>
        </div>
      </>
    );
  }
  return null;
}
export default GeneralSearch;
