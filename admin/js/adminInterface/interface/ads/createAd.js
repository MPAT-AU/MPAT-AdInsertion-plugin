'use strict'

import React from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { highlightNavigation } from '../../helper/wpRouting'
import { createAd } from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'
import { waitTwoSeconds } from '../demoHelper'
import { getDuration } from '../../handler/DaiHandler'

class CreateAd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            createAd: false,
            name: '',
            dash: '',
            hls: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                this.setState({hls: event.target.value});
                break
            }
            default : break
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({createAd: true})
        getDuration(this.state.dash).then( result => {
            return {
                name: this.state.name,
                duration: Number(result),
                dash_url: this.state.dash,
                hls_url: this.state.hls
            }
        }, error => {
            return {
                name: this.state.name,
                duration: 0,
                dash_url: this.state.dash,
                hls_url: this.state.hls
            }
        })
        // .then( json => {
        //     createAd(json)
        //             .then(result => {
        //                 this.setState({createdAd: false})
        //                 if (result) {
        //                     this.setState({redirect: true});
        //                     highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')
        //                 } else {
        //                     console.log('Error')
        //                 }
        //             })
        // })
        // only for demo purposes
            .then( json => {
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
            })
        return false
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'/>
        }
        return (
            <form className='ad-inserter-create-ad' onSubmit={this.handleSubmit}>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'
                           htmlFor='name'>ad name</label>
                    <input className='ad-inserter-input'
                           id='name'
                           placeholder='name'
                           title='Insert a name for this ad.'
                           type='text'
                           maxLength='1000'
                           required
                           value={this.state.name}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'
                           htmlFor='dash'>dash url</label>
                    <input className='ad-inserter-input'
                           id='dash'
                           placeholder='url (.mpd)'
                           title='Insert url which links to a DASH file (.mpd).'
                           type='url'
                           pattern='.*\.mpd$'
                           required
                           value={this.state.dash}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'
                           htmlFor='hls'>hls url</label>
                    <input className='ad-inserter-input'
                           id='hls'
                           placeholder='url (.m3u8)'
                           title='Insert url which links to a HLS file (.m3u8).'
                           type='url'
                           pattern='.*\.m3u8$'
                           value={this.state.hls}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-right-button-group'>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                        <button type='button'
                                className='ad-inserter-button-white-blue'
                                onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                            <i className="material-icons">clear</i>cancel
                        </button>
                    </Link>
                    {
                        this.state.createAd ?
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

export default CreateAd