import React from 'react';
import '../../../App.css';
import './Recommendations.css';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Recommendations = () => {
  const { recApiResponse } = useContext(ApiContext);
  const { seeds } = recApiResponse;
  const [ visibleTracks, setVisibleTracks ] = useState(5);

  if (recApiResponse && recApiResponse.tracks && recApiResponse.seeds) {
    const allTracks = recApiResponse.tracks;

    const handleShowMore = () => {
      setVisibleTracks(allTracks.length);
    }

    const handleShowLess = () => {
      setVisibleTracks(5);
    }

    return (
      <div>
        <div className='title-and-button-div'>
          <h1 className='title'>
            Specially For You
          </h1>
          <div className='btn-div'>
            {visibleTracks < allTracks.length && (
              <button onClick={handleShowMore}>See more <IoMdArrowDropdown className='icon' /></button>
            )}
            {visibleTracks > 5 && (
              <button onClick={handleShowLess}>See less <IoMdArrowDropup className='icon' /></button>
            )}
          </div>
        </div>
        <h5 className='title-preferences'>*based on your preferences</h5>
        <ul className='genres-ul'>
          {seeds.map((seed) => (
            <li key={seed.id}>{seed.id}</li>
          ))}
        </ul>

        <div className='tracks-container'>

          {allTracks.slice(0, visibleTracks).map((track) => (
            <div className='track-card' key={track.id}>
              <p className='track-artist-name'>{track?.artists[ 0 ]?.name}</p>

              <Link to={`/track/${track.id}`}>
                <img
                  className='track-card-image'
                  src={track?.album.images[ 0 ].url}
                  alt={track.name}
                />
              </Link>
              <p className='track-name'>{track.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Recommendations;