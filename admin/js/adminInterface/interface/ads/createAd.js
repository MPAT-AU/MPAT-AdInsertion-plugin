'use strict'

import React from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { highlightNavigation } from '../../helper/wpRouting'
import { createAd } from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'

class CreateAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            createAd: false,
            name: '',
            dash: '',
            hls: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    // only for demo purposes
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // only for demo purposes
    async waitTwoSeconds() {
        console.log('Taking a break...');
        await this.sleep(2000);
        console.log('Two second later');
    }

    handleSubmit(event) {
        event.preventDefault();
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
        this.waitTwoSeconds().then(() =>
            createAd(json)
                .then(result => {
                    this.setState({createdAd: false})
                    if (result) {
                        this.setState({redirect: true});
                        highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')
                    } else {
                        console.log('Error')
                    }
                })
        )
    }

    getJsonForSubmit() {
        return {
            name: this.state.name,
            dash_url: this.state.dash,
            hls_url: this.state.hls
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'/>
        }
        return (
            <form className='ad-insertion-content-wrapper' >
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>ad name</label>
                    <input className='ad-inserter-input'
                           id='name'
                           placeholder='name'
                           title='Insert a name for this ad.'
                           type='text'
                           required
                           value={this.state.name}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>dash url</label>
                    <input className='ad-inserter-input'
                           id='dash'
                           placeholder='url (.mpd)'
                           title='Insert url which links to an DASH file (.mpd).'
                           type='url'
                           pattern='.*\.mpd$'
                           required
                           value={this.state.dash}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-lable-input-row'>
                    <label className='ad-inserter-input-label'>hls url</label>
                    <input className='ad-inserter-input'
                           id='hls'
                           placeholder='url (.m3u8)'
                           title='Insert url which links to an HLS file (.m3u8).'
                           type='url'
                           pattern='.*\.m3u8$'
                           required
                           value={this.state.hls}
                           onChange={this.handleChange}/>
                </div>
                <div className='ad-inserter-right-button-group'>
                    <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ads'}>
                        <button type='button'
                                className='ad-inserter-button-white-blue'
                                onClick={() => highlightNavigation('mpat-ad-insertion-new-ad', 'mpat-ad-insertion-all-ads')}>
                            cancel
                        </button>
                    </Link>
                    {
                        this.state.createAd ?
                            <LoadingButton loadingMessage='create'/> :
                            <button onClick={this.handleSubmit}
                                    className='ad-inserter-button-green-white'>
                                create
                            </button>
                    }
                </div>
            </form>
        );
    }
}

export default CreateAd