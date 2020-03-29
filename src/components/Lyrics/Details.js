import React from 'react';
import Paper from '@material-ui/core/Paper';

const Details = ({ track, lyrics }) => {
    const { track_name, artist_name, album_id, primary_genres, explicit, updated_time } = track;
    const { music_genre_list } = primary_genres;
    const unknown_music_genre = { music_genre_name: 'Unknown' };
    const { music_genre_name } = music_genre_list.length ? music_genre_list[0].music_genre : unknown_music_genre;
    
    const lyricsParagraphs = lyrics.split('\n');
    lyricsParagraphs.splice(lyricsParagraphs.length - 3, 3);

    return (
        <Paper className="paper defaultPaper">
            <strong className="title">{`${ track_name } - ${ artist_name }`}</strong><br/><br/>
            {
                lyricsParagraphs.map((lyricsParagraph, index) =>
                    lyricsParagraph === '' || lyricsParagraph === '...' ?
                        <br key={ index } />
                    :
                        <p key={ index }>{ lyricsParagraph }</p>)
            }
            <ul>
                <li>
                    <strong>Album ID: </strong>
                    <span>{ album_id }</span>
                </li>
                <li>
                    <strong>Song Genre: </strong>
                    <span>{ music_genre_name }</span>
                </li>
                <li>
                    <strong>Explicit Words: </strong>
                    <span>{ explicit === 0 ? 'Yes' : 'No' }</span>
                </li>
                <li>
                    <strong>Release Date: </strong>
                    <span>{ updated_time }</span>
                </li>
            </ul>
        </Paper>
    );
}

Details.displayName = 'Details';

export default Details;