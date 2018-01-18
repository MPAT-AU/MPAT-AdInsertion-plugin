'use strict'

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { parse } from 'query-string'

import NewVideo from './newVideo'
import Table from './table'
import { createTables, getVideos, getVideo } from '../handler/DBHandler';

class InterfaceRoot extends React.Component {
    render() {
        return (
            <Router>
                <Route component={Interface}/>
            </Router>
        );
    }
}

class Interface extends React.Component {
    render() {
        return (
            <div>
                <h2 className='ad-inserter-h2'>MPAT Ad Inserter</h2>
                { parse(location.search).page === 'mpat-ad-insertion' ? <Table/> : null }
                { parse(location.search).page === 'mpat-ad-insertion-new-video' ? <NewVideo/> : null }
                <button className='white_blue' onClick={ () => createTables()}>DB create Tables</button>
                <button className='white_blue' onClick={ () => getVideos()}>DB get Videos</button>
                <button className='white_blue' onClick={ () => getVideo(1)}>DB get Video</button>
            </div>
        );
    }
}

export { Interface, InterfaceRoot }