'use strict'

import React from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {highlightNavigation} from '../../helper/wpRouting'
import {createAd} from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'
import {waitTwoSeconds} from '../demoHelper'
import AdBlock from './adBlock'

class CreateVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            createVideo: false,
            name: '',
            dash: '',
            hls: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClickOnAddVideo = this.handleClickOnAddVideo.bind(this)
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'name' : {
                this.setState({name: event.target.value})
                break
            }
            case 'dash' : {
                this.setState({dash: event.target.value})
                break
            }
            case 'hls' : {
                this.setState({hls: event.target.value})
                break
            }
            default :
                break
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({createAd: true})
        const json = this.getJsonForSubmit()
        // createAd(json)
        //     .then(result => {
        //         this.setState({createdAd: false})
        //         if (result) {
        //             this.setState({redirect: true});
        //             highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')
        //         } else {
        //             console.log('Error')
        //         }
        //     })
        // only for demo purposes
        waitTwoSeconds(2000).then(() =>
            createAd(json)
                .then(result => {
                    this.setState({createdAd: false})
                    if (result) {
                        this.setState({redirect: true})
                        highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')
                    } else {
                        console.log('Error')
                    }
                })
        )
        return false
    }

    getJsonForSubmit() {
        return {
            name: this.state.name,
            dash_url: this.state.dash,
            hls_url: this.state.hls
        }
    }

    handleClickOnAddVideo() {

    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'/>
        }
        return (
            <form className='ad-inserter-create-video' onSubmit={this.handleSubmit}>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>video name</label>
                    <input className='ad-inserter-input'
                           id='name'
                           placeholder='name'
                           title='Insert a name for this video.'
                           type='text'
                           maxLength='2000'
                           required
                           value={this.state.name}
                           onChange={this.handleChange}/>
                </div>

                <AdBlock adBlockNumber='1' startTime={20000}/>

                <div className='ad-inserter-right-button-row'>
                    <button type='button'
                            onClick={() => console.log('click')}
                            className='ad-inserter-button-white-blue'>
                        <i className='material-icons'>add</i>new ad block
                    </button>
                </div>
                <div className='ad-inserter-right-button-group'>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'}>
                        <button type='button'
                                className='ad-inserter-button-white-blue'
                                onClick={() => highlightNavigation('mpat-ad-insertion-new-video', 'mpat-ad-insertion-all-ad-inserted-videos')}>
                            <i className="material-icons">clear</i>cancel
                        </button>
                    </Link>
                    {
                        this.state.createVideo ?
                            <LoadingButton icon='add_to_queue' color='green' loadingMessage='create'/> :
                            <button type='submit'
                                    className='ad-inserter-button-green-white'>
                                <i className="material-icons">add_to_queue</i>create
                            </button>
                    }
                </div>
            </form>
        )
    }
}

export default CreateVideo

function AddVideoPartButton(props) {
    return (
        <div className='ad-inserter-right-button-row'>
            <button type='button'
                    onClick={() => console.log('click')}
                    className='ad-inserter-button-white-blue'>
                <i className='material-icons'>add</i>video
            </button>
        </div>
    )
}


