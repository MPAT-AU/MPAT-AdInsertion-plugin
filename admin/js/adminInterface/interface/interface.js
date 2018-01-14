'use strict'

import React from 'react';
import { createTables, getVideos } from '../handler/DBHandler';

class Interface extends React.Component {
    render() {
        return (
            <div>
                <h1>MPAT Ad Inserter</h1>
                <button className='white_blue'>add new video with ad's</button>
                <button className='white_blue' onClick={ () => createTables()}>DB create Tables</button>
                <button className='white_blue' onClick={ () => getVideos()}>DB get Videos</button>
            </div>
        );
    }
}

export default Interface