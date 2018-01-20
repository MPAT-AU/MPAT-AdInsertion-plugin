'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

import { highlightNavigation } from '../helper/wpRouting'

import { createTables, getVideos, getVideo, getAds, getAd, createAd, updateAd, deleteAd, createData, getAdsWithCount } from '../handler/DBHandler';


class HomeVideoAdInsertion extends React.Component {
    render() {
        return (
            <div>
                <div className='ad-inserter-headline'>
                    <h2 className='ad-inserter-h2'>MPAT - Video Ad Insertion Plugin</h2>
                </div>
                <div className='ad-insertion-content-wrapper'>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    <div className='ad-inserter-space-around-button-group'>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'}>
                            <button className='ad-inserter-button-white-blue' onClick={() => highlightNavigation('mpat-ad-insertion','mpat-ad-insertion-all-ad-inserted-videos')}>all ad inserded videos</button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-new-video'}>
                            <button className='ad-inserter-button-white-blue' onClick={() => highlightNavigation('mpat-ad-insertion','mpat-ad-insertion-new-video')}>+ new video</button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                            <button className='ad-inserter-button-white-blue' onClick={() => highlightNavigation('mpat-ad-insertion','mpat-ad-insertion-all-ads')}>all videos</button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-new-ad'}>
                            <button className='ad-inserter-button-white-blue' onClick={() => highlightNavigation('mpat-ad-insertion','mpat-ad-insertion-new-ad')}>+ new ad</button>
                        </Link>
                    </div>
                </div>
                {/* only for test purposes*/}
                <div className='ad-inserter-headline'>
                    <h2 className='ad-inserter-h2 db-test-buttons'>Buttons for test purposes</h2>
                </div>
                <div className='ad-inserter-space-around-button-group'>
                    <p>
                    <h2>Tables</h2>
                    <button className='ad-inserter-button-white-blue' onClick={ () => createTables()}>DB create Tables</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => createData()}>DB create Test Data</button>
                    </p>
                    <p>
                    <h2>Videos</h2>
                    <button className='ad-inserter-button-white-blue' onClick={ () => getVideos()}>DB get Videos</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => getVideo(1)}>DB get Video</button>
                    </p>
                    <p>
                    <h2>Ads</h2>
                    <button className='ad-inserter-button-white-blue' onClick={ () => getAds()}>DB getAds</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => getAdsWithCount()}>DB getAdsWithCount</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => getAd(1)}>DB getAd(1)</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => createAd({name: 'test',dash_url: 'ahsgfjahf',hls_url: 'jdhfkjshdkfj'})}>DB create ad</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => updateAd(1,{name: 'test2',dash_url: 'ahsgfjahf',hls_url: 'jdhfkjshdkfj'})}>DB update</button>
                    <button className='ad-inserter-button-white-blue' onClick={ () => deleteAd(1)}>DB delete</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default HomeVideoAdInsertion