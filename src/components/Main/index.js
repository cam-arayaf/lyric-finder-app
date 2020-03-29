import React, { Fragment, useState, useEffect } from 'react';
import SearchTracks from './SearchTracks';
import Tracks from './Tracks';
import ProgressBar from './../Common/ProgressBar';
import Message from './../Common/Message';
import { chartTracksGet, trackSearch } from './../../constants';

const Main = () => {
    const [doneFetch, setDoneFetch] = useState();
    const [currentQTrack, setCurrentQTrack] = useState('');
    const [text, setText] = useState('Top Songs In US');
    const [tracks, setTracks] = useState([]);

    useEffect(() => getTopTracks(), []);

    const getTopTracks = () => {
		fetch(chartTracksGet())
			.then(res => res.json())
            .then(data => {
                setDoneFetch(true);
                setTracks(data.message.body.track_list);
            })
			.catch(err => console.log(err));
    }

    const getTracks = q_track => {
        fetch(trackSearch(q_track))
			.then(res => res.json())
			.then(data => {
                const { track_list } = data.message.body;
                setDoneFetch(true);
                setText(track_list.length? 'Results' : 'No Results');
                setTracks(track_list);
            })
			.catch(err => console.log(err));
    }

    const validateQTrack = (e, q_track = document.querySelector('#q_track').value.toLowerCase().trim()) => {
        if (e.type === 'keypress' && e.key !== 'Enter') return;
        const words = q_track.match(/\w+/g);
        q_track = words && words.join(' ');
        if (q_track && q_track !== currentQTrack) {
            setCurrentQTrack(q_track);
            setDoneFetch(false);
            getTracks(q_track);
        }
    }

    return (
        <Fragment>
            <SearchTracks validateQTrack={ validateQTrack } />
            {
                doneFetch ?
                    (tracks.length ? <Tracks text={ text } tracks={ tracks } /> : <Message text={ text } />)
                :
                    <ProgressBar />
            }
        </Fragment>
    );
}

Main.displayName = 'Main';

export default Main;