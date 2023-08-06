import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './AlbumDetails.css'
import { Link } from "react-router-dom";

const AlbumsDetails = () => {
  const { albumId } = useParams();
  const [ albumDetails, setAlbumDetails ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}?market=ES`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.access_token,
            },
          }
        );
        const data = await response.json();

        setAlbumDetails(data);
      } catch (error) {

      }
    };

    fetchData();
  }, [ albumId ]);

  if (!albumDetails) {
    return (
      <div>
        <p>Loading Details</p>
      </div>
    );
  }

  const { images, name, tracks } = albumDetails;

  return (
    <div className="center">
      <div className="img-album-details-container">
        <div className="album-img">
          <img src={images[ 0 ].url} alt={name} />
        </div>

        <div className="data-album">
          <p>Album</p>
          <h1>{name}</h1>
          <p>{tracks.total} Songs</p>
        </div>
      </div>
      <div className="tracks-album-container">
        {tracks.items.map((track, index) => (
          <div className="tracks-data" key={track.id}>
            <div className="track-number">{track.track_number}</div>
            <div className="track-info">
              <Link className="link-tracks-artist" to={`/track/${track.id}`}>
                <p className="title-track-album">{track.name}</p>
                <p className="name-artist-album">{track.artists[ 0 ].name}</p>
              </Link>
            </div>
            <div className="track-time">{msToTime(track.duration_ms)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsDetails;

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
