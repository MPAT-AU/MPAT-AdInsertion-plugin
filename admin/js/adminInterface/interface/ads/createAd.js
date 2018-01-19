'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

import { highlightNavigation } from '../../helper/wpRouting'

class CreateAd extends React.Component {
    render() {
        return (
            <form className='ad-insertion-content-wrapper'>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>ad name</label>
                    <input className='ad-inserter-input' placeholder='name'/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>dash url</label>
                    <input className='ad-inserter-input' placeholder='url (.mpd)'/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>hls url</label>
                    <input className='ad-inserter-input' placeholder='url (.m3u8)'/>
                </div>
                <div className='ad-inserter-right-button-group'>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                        <button className='ad-inserter-button-white-blue'
                                onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                            cancel
                        </button>
                    </Link>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                        <button className='ad-inserter-button-green-white'
                                onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                            create
                        </button>
                    </Link>
                </div>
            </form>
        );
    }
}

export default CreateAd