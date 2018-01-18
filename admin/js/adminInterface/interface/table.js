'use strict'

import React from 'react'
import { Link } from 'react-router-dom'
import { highlightNavigation } from '../helper/wpRouting'

class Table extends React.Component {
    render() {
        return (
            <div>
                <div className='ad-inserter-flex-container'>
                    <h3 className='ad-inserter-h3'>All created Videos</h3>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-new-video'}>
                        <button className='white_blue' onClick={() => highlightNavigation('mpat-ad-insertion','mpat-ad-insertion-new-video')}>+ new video</button>
                    </Link>
                </div>
                <h3 className='ad-inserter-h3'>Hier bitte eine Tabelle einfügen!</h3>
            </div>
        );
    }
}

export default Table