import {changeFormat} from '../../helper/format'
import React from 'react'
import {getDuration} from '../../handler/DaiHandler'
import {createAd, getAds} from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'

class AdBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sec_in_part: null,
            ads: [],
            addAd: false,
            addAdName: '',
            addAdDash: '',
            addAdHls: '',
            createAd: false,
            chooseAd: true,
            chosenAd: null,
            allAdsArray: []
        }
        this.getAdArray()

        this.handleChange = this.handleChange.bind(this);
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

    handelClickOnAddAdToAdBlock(event) {
        if (this.state.chooseAd && this.state.allAdsArray.length !== 0) {
            let moreAds = this.state.ads
            moreAds.push(this.state.chosenAd)
            this.setState({
                addAd: false,
                ads: moreAds,
                chosenAd: this.state.allAdsArray[0]
            })
        } else {
            if (this.checkAddAdValidation(event)) {
                this.setState({createAd: true})
                getDuration(this.state.addAdDash).then( result => {
                    return {
                        name: this.state.addAdName,
                        duration: Number(result),
                        dash_url: this.state.addAdDash,
                        hls_url: this.state.addAdHls
                    }
                }, error => {
                    return {
                        name: this.state.addAdName,
                        duration: 0,
                        dash_url: this.state.addAdDash,
                        hls_url: this.state.addAdHls
                    }
                }).then( json =>
                    createAd(json)
                        .then(ad => {
                            let moreAds = this.state.ads
                            moreAds.push(ad)
                            this.setState({
                                createAd: false,
                                addAd: false,
                                ads: moreAds,
                                addAdName: '',
                                addAdDash: '',
                                addAdHls: '',
                                chooseAd: true
                            })

                            this.getAdArray()
                        })
                )
            }
        }
    }

    checkAddAdValidation(e) {
        const parentDiv = e.target.parentElement.parentElement
        const name = parentDiv.querySelector('#name')
        const dash = parentDiv.querySelector('#dash')
        if (!name.checkValidity()) {
            name.reportValidity()
            return false
        } else if (!dash.checkValidity()) {
            dash.reportValidity()
            return false
        }
        return true
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'name' : {
                this.setState({addAdName: event.target.value})
                break
            }
            case 'dash' : {
                this.setState({addAdDash: event.target.value})
                break
            }
            case 'hls' : {
                this.setState({addAdHls: event.target.value});
                break
            }
            default : break
        }
    }

    handleRemoveAdd(index) {
        const adsArray = this.state.ads
        const newAdsArray = adsArray.slice(0,index).concat(adsArray.slice(index + 1))
        this.setState({ads: newAdsArray})
    }

    handleClickOnUpButton(index) {
        if (index > 0) {
            const adsArray = this.state.ads
            const tmp = adsArray[index-1]
            adsArray[index-1] = adsArray[index]
            adsArray[index] = tmp
            this.setState({ads: adsArray})
        }
    }

    handleClickOnDownButton(index) {
        const adsArray = this.state.ads
        if (index < adsArray.length - 1) {
            const tmp = adsArray[index+1]
            adsArray[index+1] = adsArray[index]
            adsArray[index] = tmp
            this.setState({ads: adsArray})
        }
    }

    calculateEndTimeOfAdBlock(startTime) {
        let endTime = startTime
        const ads = this.state.ads
        for (let i = 0; i < ads.length; i++) {
            endTime += Number(ads[i].duration)
        }
        return endTime
    }

    calculateDurationOfAdBlock() {
        let duration = 0
        const ads = this.state.ads
        for (let i = 0; i < ads.length; i++) {
            duration += Number(ads[i].duration)
        }
        return duration
    }

    handelCLickOnDeleteAdBlockButton() {
        this.props.onClickDeleteAdBlock()
    }

    render() {

        const adOptions = this.state.allAdsArray.map((ad, index) => {
            return (<option key={'ad-' + ad.id + 'adBlock-' + this.props.adBlockNumber} value={index}>{ad.name}</option>)
        })

        const buttonOrAddAd = this.state.addAd ?
            <div className='ad-inserter-add-ad-to-ad-block-container'>
                {this.state.allAdsArray.length !== 0 ?
                    <div>
                        <div className='ad-inserter-ad-block-selector-container'>
                            <input type='radio'
                                   id='chooseAd'
                                   name='addAd'
                                   value='chooseAd'
                                   defaultChecked={this.state.chooseAd}
                                   onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}/>
                            <label htmlFor='chooseAd'
                                   id='labelChooseAd'
                                   onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}>choose ad</label>
                            {
                                this.state.chooseAd ?
                                    <select onChange={this.handleOnChangeSelect.bind(this)}>
                                        {adOptions}
                                    </select>
                                    :
                                    null
                            }
                        </div>
                        <div>
                            <input type='radio'
                                   id='createAd'
                                   name='addAd'
                                   value='createAd'
                                   defaultChecked={!this.state.chooseAd}
                                   onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}/>
                            <label htmlFor='createAd'
                                   id='labelCreateAd'
                                   onClick={this.handleClickOnRadioButtonOrLabel.bind(this)}>add new ad</label>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    !this.state.chooseAd || this.state.allAdsArray.length === 0 ?
                        <div className='ad-inserter-ad-block-create-ad-container'>
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
                                           value={this.state.addAdName}
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
                                           value={this.state.addAdDash}
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
                                           value={this.state.addAdHls}
                                           onChange={this.handleChange}/>
                                </div>
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
                            <LoadingButton icon='add_to_queue' color='green' loadingMessage={this.state.chooseAd && this.state.allAdsArray.length !== 0 ? 'add' : 'add new ad'}/>
                            :
                            <button type='button'
                                    className='ad-inserter-button-green-white'
                                    onClick={this.handelClickOnAddAdToAdBlock.bind(this)}>
                                <i className="material-icons">add_to_queue</i>{this.state.chooseAd && this.state.allAdsArray.length !== 0 ? 'add' : 'add new ad'}
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
                <div key={'adInBlock-' + index + '-adBlock-' + this.props.adBlockNumber}
                     className='ad-inserter-ad-in-ad-block'>
                    <div>
                        <div className='ad-inserter-up-down-keys'>
                            <i className="material-icons up-button"
                               onClick={this.handleClickOnUpButton.bind(this, index)}>
                                keyboard_arrow_up
                            </i>
                            <i className="material-icons down-button"
                               onClick={this.handleClickOnDownButton.bind(this, index)}>
                                keyboard_arrow_down
                            </i>
                        </div>
                        <span>{ad.name}</span>
                    </div>
                    <div>
                        <span>{changeFormat(ad.duration)}</span>
                        <i className="material-icons"
                           onClick={this.handleRemoveAdd.bind(this, index)}>
                            delete
                        </i>
                    </div>
                </div>
            )
        })

        return (
            <div className='ad-inserter-ad-block-container'>
                <div className='ad-inserter-ad-block-header'>
                    <p className='ad-inserter-h3-bold'>{this.props.adBlockNumber + '. ad block'}</p>
                    <i className="material-icons"
                       onClick={this.handelCLickOnDeleteAdBlockButton.bind(this)}>
                        delete
                    </i>
                </div>
                <div className='ad-inserter-ad-block-time-subheader'>
                    <p className='ad-inserter-h3'>start<span>{changeFormat(this.props.startTime)}</span></p>
                    <p className='ad-inserter-h3'>ad block duration<span>{changeFormat(this.calculateDurationOfAdBlock(this.props.startTime))}</span></p>
                </div>
                <div className='ad-inserter-ads-in-ad-block'>
                    { ads }
                </div>
                { buttonOrAddAd }
            </div>
        )
    }
}

export default AdBlock