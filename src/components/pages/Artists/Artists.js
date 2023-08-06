import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../../services/Api";
import Searcher from "../Searcher/Searcher";
import './Artists.css'

const Artists = () => {
  const { apiResponse, search } = useContext(ApiContext);
  const filteredArtists = apiResponse?.artists?.items?.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="artists center">
      <Searcher type={"artist"} />
      <div className="artists-title">
        <h1 className="title">Artists</h1>
      </div>
      <div className="artists-container">
        {filteredArtists?.map((artist) => (
          <Link to={`/artists/${artist.id}`} key={artist.id} className="artist-card-link">
            <div className="artist-card">
              {artist.images && artist.images.length > 0 && (
                <img
                  src={artist.images[ 0 ].url}
                  alt={artist.name}
                  className="artist-img" />
              )}
              <h2 className="name">{artist.name}</h2>
              {artist.genres && <p className="artist-card genres">{artist.genres.join(", ")}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;