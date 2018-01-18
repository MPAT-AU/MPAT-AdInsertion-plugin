'use strict'

import { Link } from 'react-router-dom'

import React from 'react'
import Video from './video'
import { highlightNavigation } from '../helper/wpRouting'

class NewVideo extends React.Component {
    render() {
        return (
            <div className='content-editor-container'>
                <h3>create new Video</h3>
                <form>
                    <label>
                        new video with ad's:
                        <input
                            type='text'
                            placeholder='NAME'/>
                    </label>
                    <Video/>

                    <div className='ad-inserter-right-button-group'>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion'}>
                            <button className='white_blue' onClick={() => highlightNavigation('mpat-ad-insertion-new-video', 'mpat-ad-insertion')}>cancel</button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion/video'}> //TODO
                            <button
                                type='submit'
                                className='green_white'>
                                save
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewVideo