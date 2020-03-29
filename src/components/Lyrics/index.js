import React, { Fragment, useEffect, useState } from 'react';
import ProgressBar from './../Common/ProgressBar';
import Message from './../Common/Message';
import ButtonPrimary from './../Common/ButtonPrimary';
import Details from './Details';
import { trackLyricsGet, trackGet } from './../../constants';

const Lyrics = (props) => {
    const { id } = props.match.params;
    const [doneFetchTrack, setDoneFetchTrack] = useState(false);
    const [doneFetchLyrics, setDoneFetchLyrics] = useState(false);
    const [track, setTrack] = useState([]);
    const [lyrics, setLyrics] = useState([]);
    
    useEffect(() => getTrack(id), [id]);
    useEffect(() => getLyrics(id), [id]);

    const getTrack = id => {
        fetch(trackGet(id))
			.then(res => res.json())
			.then(data => {
                const { body } = data.message;
                setDoneFetchTrack(true);
                !Array.isArray(body) && setTrack(body.track);
            })
			.catch(err => console.log(err));
    }

    const getLyrics = id => {
        fetch(trackLyricsGet(id))
			.then(res => res.json())
			.then(data => {
                const { body } = data.message;
                setDoneFetchLyrics(true);
                !Array.isArray(body) && setLyrics(body.lyrics.lyrics_body);
            })
			.catch(err => console.log(err));
    }

    return (
        <Fragment>
            {
                doneFetchLyrics && doneFetchTrack ?
                    (!Array.isArray(lyrics) && !Array.isArray(track) ?
                        <Details track={ track } lyrics={ lyrics } />
                    :
                        <Message text="No Results" />)
                :
                    <ProgressBar />
            }
            <ButtonPrimary type="back" to="/" />
        </Fragment>
    );
}

Lyrics.displayName = 'Lyrics';

export default Lyrics;