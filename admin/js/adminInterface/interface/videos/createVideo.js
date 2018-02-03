'use strict'

import React from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {highlightNavigation} from '../../helper/wpRouting'
import {createAd, getAds} from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'
import {waitTwoSeconds} from '../demoHelper'

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

                <AdBlock/>


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


class AdBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sec_in_part: null,
            ads: [],
            addAd: false,
            chooseAd: true,
            chosenAd: null,
            allAdsArray: [],
            adsAvailable: false

        }
        this.getAdArray()
    }

    getAdArray() {
        getAds().then(result => {
            if(result.length === 0) return
            const sortedAds = result.sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
            })
            this.setState({
                allAdsArray: sortedAds,
                chosenAd: sortedAds[0],
                adsAvailable: true
            })
        }, err => {
            console.log('Error ', err)
        })
    }

    handleClickOnAddAdOrCancel() {
        this.setState({addAd: !this.state.addAd})
    }

    handleClickOnRadioButtonOrLabel(event) {
        const targetId = event.target.id
        if ( (!this.state.chooseAd && targetId === 'chooseAd') || (!this.state.chooseAd && targetId === 'labelChooseAd') || (this.state.chooseAd && targetId === 'createAd') || (this.state.chooseAd && targetId === 'labelCreateAd') ) {
            this.setState({chooseAd: !this.state.chooseAd})
        }
    }

    handleOnChangeSelect(event) {
        const index = event.target.value
        this.setState({chosenAd: this.state.allAdsArray[index]})
    }

    render() {

        const adOptions = this.state.allAdsArray.map((ad, index) => {
            return (<option key={'ad' + ad.id} value={index}>{ad.name}</option>)
        })

        const buttonOrAddAd = this.state.addAd ?
            <div>
                <div>
                    <input type='radio'
                           id='chooseAd'
                           name='addAd'
                           value='chooseAd'
                           defaultChecked
                           onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}/>
                    <label htmlFor='chooseAd'
                           id='labelChooseAd'
                           onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}>choose ad</label>
                </div>
                {
                    this.state.chooseAd ?
                        <select onChange={this.handleOnChangeSelect.bind(this)}>
                            {adOptions}
                        </select>
                        :
                        null
                }
                <div>
                    <input type='radio'
                           id='createAd'
                           name='addAd'
                           value='createAd'
                           onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}/>
                    <label htmlFor='createAd'
                           id='labelCreateAd'
                           onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}>add new ad</label>
                </div>
                {
                    !this.state.chooseAd ?
                        <div className='ad-inserter-create-ad'>
                            <div className='ad-inserter-lable-input-row'>
                                <label className='ad-inserter-input-label'>ad name</label>
                                <input className='ad-inserter-input'
                                       id='name'
                                       placeholder='name'
                                       title='Insert a name for this ad.'
                                       type='text'
                                       maxLength='2000'
                                       required
                                       value={this.state.name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='ad-inserter-lable-input-row'>
                                <label className='ad-inserter-input-label'>dash url</label>
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
                                <label className='ad-inserter-input-label'>hls url</label>
                                <input className='ad-inserter-input'
                                       id='hls'
                                       placeholder='url (.m3u8)'
                                       title='Insert url which links to a HLS file (.m3u8).'
                                       type='url'
                                       pattern='.*\.m3u8$'
                                       value={this.state.hls}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        :
                        null
                }
                <div className='ad-inserter-right-button-group'>
                    <button type='button'
                            className='ad-inserter-button-white-blue'
                            onClick={this.handleClickOnAddAdOrCancel.bind(this)}>
                        <i className="material-icons">clear</i>cancel
                    </button>
                    {
                        this.state.createAd ?
                            <LoadingButton icon='add_to_queue' color='green' loadingMessage={this.state.chooseAd ? 'add' : 'create and add'}/> :
                            <button type='button'
                                    className='ad-inserter-button-green-white'>
                                <i className="material-icons">add_to_queue</i>{this.state.chooseAd ? 'add' : 'create and add'}
                            </button>
                    }
                </div>
            </div>
                :
            <div className='ad-inserter-right-button-row'>
                <button type='button'
                        onClick={this.handleClickOnAddAdOrCancel.bind(this)}
                        className='ad-inserter-button-white-blue'>
                    <i className='material-icons'>add</i>ad
                </button>
            </div>

        const ads = this.state.ads.map((ad, index) => {
            return (
                <div key={'ad-number-' + index}>Ad {index}</div>
            )
        })

        return (
            <div>
                { ads }
                { buttonOrAddAd }
            </div>
        )
    }
}

// class VideoPart extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             createVideoPart: false
//         }
//     }
//
//     render() {
//
//         const createVideoPart = (
//             <div>
//                 <AddVideoPartButton/>
//                 <div className='ad-inserter-lable-input-row'>
//                     <label className='ad-inserter-input-label'>dash url</label>
//                     <input className='ad-inserter-input'
//                            id='dash'
//                            placeholder='url (.mpd)'
//                            title='Insert url which links to a DASH file (.mpd).'
//                            type='url'
//                            pattern='.*\.mpd$'
//                            required
//                            value={this.state.dash}
//                            onChange={this.handleChange}/>
//                 </div>
//                 <div className='ad-inserter-lable-input-row'>
//                     <label className='ad-inserter-input-label'> hls url</label>
//                     <input className='ad-inserter-input'
//                            id='hls'
//                            placeholder='url (.m3u8)'
//                            title='Insert url which links to a HLS file (.m3u8).'
//                            type='url'
//                            pattern='.*\.m3u8$'
//                            value={this.state.hls}
//                            onChange={this.handleChange}/>
//                 </div>
//             </div>
//         )
//
//         return (
//             this.props.buttomButton ?
//                 this.state.createVideoPart ?
//
//         )
//     }
// }