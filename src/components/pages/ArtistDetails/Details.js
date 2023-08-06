import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../../../services/Api";
import "./ArtistDetails.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Details = () => {
  const { apiResponse, artistAlbums, topTracks } = useContext(ApiContext);
  const { id } = useParams();
  const [ visibleAlbums, setVisibleAlbums ] = useState(5);


  const artistDetails = apiResponse?.artists?.items?.find(
    (artist) => artist.id === id
  );

  const handleShowMore = () => {
    setVisibleAlbums(artistAlbums.length);
  }

  const handleShowLess = () => {
    setVisibleAlbums(5);
  }

  if (artistDetails) {
    return (
      <div className="center">
        <div className="artist-primary-container">
          <div className="img-container-artist">
            {artistDetails.images && artistDetails.images.length > 0 && (
              <img src={artistDetails.images[ 0 ].url} alt={artistDetails.name} />
            )}
          </div>
          <div className="artist-container">
            <div className="artist-info-container">
              <h2 className="name-artist">{artistDetails.name}</h2>
              {artistDetails.genres && (
                <p className="genres-container">{artistDetails.genres[ 0 ]}</p>
              )}
            </div>

            <ul className="tracks-artist-container">

              {topTracks.slice(0, 6).map((track, index) => (
                <li className="li-container-tracks" key={track.id}>

                  <div className="id-tracks">
                    <p>{`0${index + 1} `}</p>
                  </div>
                  <div className="tracks-artist-data">
                    <Link className="link-tracks-artist" to={`/track/${track.id}`}>
                      <p className="name-class">{` ${track.name}`}</p>
                    </Link>
                    <div className="album-times-container">
                      <p className="name-tracks"> {track.album.name}</p>
                    </div>
                  </div>

                </li>
              ))}


            </ul>
          </div>
        </div>

        <div className='title-and-button-div'>
          <h1 className="title">
            Albums
          </h1>
          <div className="btn-div">
            {visibleAlbums < artistAlbums.length && (
              <button onClick={handleShowMore}>
                See More <IoMdArrowDropdown />
              </button>
            )}

            {visibleAlbums > 5 && (
              <button onClick={handleShowLess}>
                See Less <IoMdArrowDropup />
              </button>
            )}
          </div>
        </div>

        <div className="container-albums-artist-data">
          {artistAlbums &&
            artistAlbums.slice(0, visibleAlbums).map((album) => (
              <div className="albums-artists-conainer" key={album.id}>
                <Link to={`/album/${album.id}`}>
                  <img
                    className="img-album-artist track-card-image"
                    src={album.images[ 0 ].url}
                    alt={album.name}
                  />
                  <div className="data-album-container">
                    <p className="album-name">{album.name}</p>
                    <p className="album-tracks-number">
                      {" "}
                      {album.total_tracks} Songs
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Details;

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
