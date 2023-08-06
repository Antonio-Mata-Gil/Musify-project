import React, { useState, useEffect, useContext } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { ApiContext } from '../../../services/Api';
import { Link } from 'react-router-dom';

const SavedTracks = () => {
  const [ savedTracks, setSavedTracks ] = useState([]);
  const [ visibleTracks, setVisibleTracks ] = useState(5);
  const [ totalSavedTracks, setTotalSavedTracks ] = useState(0);
  const { access_token } = useContext(ApiContext)

  useEffect(() => {
    const fetchSavedTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/tracks', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
          },
        });
        const data = await response.json();

        setSavedTracks(data.items);
        setTotalSavedTracks(data.total);
      } catch (error) {
      }
    };
    fetchSavedTracks();
  }, [ access_token ]);

  const handleShowMore = () => {
    setVisibleTracks(totalSavedTracks);
  };

  const handleShowLess = () => {
    setVisibleTracks(5);
  };

  return (
    <div>
      <div className='title-and-button-div'>
        <h1 className='title'>
          Saved Tracks
        </h1>
        <div className='btn-div'>
          {visibleTracks < totalSavedTracks && (
            <button onClick={handleShowMore}>
              See more <IoMdArrowDropdown />
            </button>
          )}

          {visibleTracks > 5 && (
            <button onClick={handleShowLess}>
              See less <IoMdArrowDropup />
            </button>
          )}
        </div>
      </div>

      <div className='tracks-container'>

        {savedTracks?.slice(0, visibleTracks).map((track) => (
          <div className='track-card' key={track.track.id}>
            <p className='track-artist-name'>{track.track.artists[ 0 ].name}</p>

            <Link to={`/track/${track.track.id}`}>
              <img
                className='track-card-image'
                src={track.track.album.images[ 0 ].url}
                alt={track.track.name}
              />
            </Link>
            <p className='track-name'>{track.track.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTracks;