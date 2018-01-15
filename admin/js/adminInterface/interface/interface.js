'use strict'

import React from 'react';
import { createTables } from '../handler/DBHandler';

class Interface extends React.Component {
    render() {
        return (
            <div>
                <h1>MPAT Ad Inserter</h1>
                <button className='white_blue'>add new video with ad's</button>
                <button className='white_blue' onClick={ () => createTables()}>db test</button>
            </div>
        );
    }
}

export default Interface