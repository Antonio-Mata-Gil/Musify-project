import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './TrackDetail.css';
import '../../../App.css';
import { CgPlayTrackNext } from 'react-icons/cg';
import { LuMousePointerClick } from 'react-icons/lu';

const TrackDetail = () => {
    const { trackId } = useParams();
    const [ trackDetails, setTrackDetails ] = useState(null);

    const navigate = useNavigate();

    const redirectToSearch = () => {
        navigate("/search");
    }

    const redirectToArtists = () => {
        navigate("/artists");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + window.localStorage.access_token,
                    },
                });
                const data = await response.json();

                setTrackDetails(data);
            } catch (error) {
            }
        }

        fetchData();
    }, [ trackId ]);

    if (!trackDetails) return null;


    return (
        <div className='track-details center'>
            <div className='details-img-div'>
                <img
                    src={trackDetails.album.images[ 0 ].url}
                    alt={trackDetails.album.name}
                    className='track-details-image'
                />
            </div>

            <div className='track-details-container'>
                <div className='detail-names'>
                    <h1 className='details-trackname'>{trackDetails.name} <CgPlayTrackNext /></h1>
                    <h3 className='details-artistname'>Artist: {trackDetails.artists[ 0 ].name}</h3>
                </div>

                <div className='details-info-container'>

                    <div className='each-div-detail'>
                        <div className='div-one'><p>Popularity Track Ranking</p></div>
                        <div className='div-two'><p>{trackDetails.popularity}</p></div>
                    </div>

                    <div className='each-div-detail'>
                        <div className='div-one'><p>Release Date</p></div>
                        <div className='div-two'><p>{trackDetails.album.release_date}</p></div>
                    </div>

                    <div className='each-div-detail'>
                        <div className='div-one'><p>Track Number</p></div>
                        <div className='div-two'><p>{trackDetails.track_number}</p></div>
                    </div>

                    <div className='each-div-detail'>
                        <div className='div-one album'><p>{trackDetails.album.name}</p></div>
                        <div className='div-two text-link' onClick={redirectToSearch}><p>{trackDetails.album.album_type} <LuMousePointerClick /></p></div>
                    </div>

                    <div className='each-div-detail'>
                        <div className='div-one'><p>Track Duration</p></div>
                        <div className='div-two'><p>{trackDetails.duration_ms} ms</p></div>
                    </div>
                    <p className='text-link more' onClick={redirectToArtists}>More Artists</p>

                </div>
            </div>
        </div>
    )
}

export default TrackDetail;