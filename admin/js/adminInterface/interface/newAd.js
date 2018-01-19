'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

import { highlightNavigation } from '../helper/wpRouting'

class NewAd extends React.Component {
    render() {
        return (
            <div>
                <div className='ad-inserter-headline'>
                    <h2 className='ad-inserter-h2'>Create New Ad</h2>
                </div>
                <form className='ad-insertion-content-wrapper'>
                    <p>Insert form to create a new ad!</p>
                    <div className='ad-inserter-right-button-group'>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                            <button className='white_blue'
                                    onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                                cancel
                            </button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                            <button type='submit'
                                    className='green_white'
                                    onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                                save
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewAd