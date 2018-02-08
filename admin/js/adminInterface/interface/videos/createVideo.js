'use strict'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import {Link, Redirect} from 'react-router-dom'
import LoadingButton from '../loadingButton'
import {highlightNavigation} from '../../helper/wpRouting'
import VideoPart from './videoPart'
import {changeFormat} from '../../helper/format'
import {getDuration} from '../../handler/DaiHandler'


class CreateVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: {
                name: '',
                output_dash_url: '',
                output_hls_url: '',
                duration: 0,
                parts: [
                    {
                        name: '',
                        dash_url: '',
                        hls_url: '',
                        part_nr: 0,
                        duration: 0,
                        durationWithAds: 0,
                        start: 0,
                        end: 0,
                        ad_blocks: [],
                        addAdBlock: false
                    }
                ]
            },
            redirect: false
        }
    }

    handleChangeName(event) {
        let video = this.state.video
        video.name = event.target.value
        this.setState({video: video})
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    handleChangeInVideoPart(index, inputName, value, valid) {
        let video = this.state.video
        switch (inputName) {
            case 'videoPartName' : {
                video.parts[index].name = value
                break
            }
            case 'videoPartDash' : {
                if (valid) {
                    getDuration(value).then( result => {
                        let video = this.state.video
                        video.parts[index].duration = Number(result)
                        video.parts[index].durationWithAds += Number(result)
                        this.setState({video: video})
                    }, error => {
                        if (video.parts[index].duration !== 0) {
                            video.parts[index].durationWithAds -= video.parts[index].duration
                            video.parts[index].duration = 0
                            this.setState({video: video})
                        }
                    })
                } else {
                    if (video.parts[index].duration !== 0) {
                        video.parts[index].durationWithAds -= video.parts[index].duration
                        video.parts[index].duration = 0
                    }
                }
                video.parts[index].dash_url = value
                break
            }
            case 'videoPartHls' : {
                video.parts[index].hls_url = value
                break
            }
            default : break
        }
        this.setState({video: video})
    }

    calculateDurationOfVideo() {
        // console.log(this.state.video.parts.reduce((partA,partB) => {
        //     console.log(partA.durationWithAds)
        //     partA.durationWithAds + partB.durationWithAds
        // }))
        // return this.state.video.parts.reduce((partA,partB) => {
        //     return partA.durationWithAds + partB.durationWithAds
        // })
        return 0
    }

    calculateDurationOfVideoPart() {
        return 0
    }

    handelClickOnNewPart() {
        let newPart = {
            name: '',
            dash_url: '',
            hls_url: '',
            part_nr: this.state.video.parts.length,
            duration: 0,
            durationWithAds: 0,
            start: 0,
            end: 0,
            ad_blocks: [],
            addAdBlock: false
        }
        let video = this.state.video
        video.parts.push(newPart)
        this.setState({video: video})
    }

    handelDeletePart(index) {
        if (this.state.video.parts.length !== 1){
            let video = this.state.video
            video.parts = video.parts.slice(0,index).concat(video.parts.slice(index + 1))
            for (index; index < video.parts.length; index++) {
                video.parts[index].part_nr = index
            }
            this.setState({video: video})
        }
    }

    handelClickOnPartUp(index) {
        if (index > 0) {
            let video = this.state.video
            const tmp = this.state.video.parts[index]
            tmp.part_nr = index-1
            this.state.video.parts[index] = this.state.video.parts[index-1]
            this.state.video.parts[index].part_nr = index
            this.state.video.parts[index-1] = tmp
            this.setState({video: video})
        }
    }

    handelClickOnPartDown(index) {
        if (index < this.state.video.parts.length-1) {
            let video = this.state.video
            const tmp = this.state.video.parts[index]
            tmp.part_nr = index+1
            this.state.video.parts[index] = this.state.video.parts[index+1]
            this.state.video.parts[index].part_nr = index
            this.state.video.parts[index+1] = tmp
            this.setState({video: video})
        }
    }

    handelClickOnPartAddAdBlock(index) {
        let video = this.state.video
        video.parts[index].addAdBlock = !video.parts[index].addAdBlock
        this.setState({video: video})
    }

    handelClickOnPartCreateAdBlock(index,secInPart) {
        let video = this.state.video
        const newAdBlock = {
            sec_in_part: secInPart,
            ads: []
        }
        video.parts[index].ad_blocks.push(newAdBlock)
        if (video.parts[index].ad_blocks.length !== 0) {
            video.parts[index].ad_blocks.sort((blockA, blockB) => {
                return blockA.sec_in_part - blockB.sec_in_part
            })
        }
        video.parts[index].addAdBlock = !video.parts[index].addAdBlock
        this.setState({video: video})
    }

    handelClickOnDeleteAdBlock(partIndex,adBlockIndex) {
        let video = this.state.video
        video.parts = video.parts[partIndex].ad_blocks.slice(0,adBlockIndex).concat(video.parts[partIndex].ad_blocks.slice(adBlockIndex + 1))
        this.setState({video: video})
    }


    render() {
        if (this.state.redirect) {
            return <Redirect push to='/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'/>
        }

        const videoParts = this.state.video.parts.map( (part, index) => {
            return <VideoPart key={'video-part-' + index}
                              part={part}
                              onChange={this.handleChangeInVideoPart.bind(this)}
                              isOnlyPart={this.state.video.parts.length === 1}
                              onDelete={this.handelDeletePart.bind(this)}
                              onClickUp={this.handelClickOnPartUp.bind(this)}
                              onClickDown={this.handelClickOnPartDown.bind(this)}
                              onClickAddAdBlock={this.handelClickOnPartAddAdBlock.bind(this)}
                              onClickCreateAdBlock={this.handelClickOnPartCreateAdBlock.bind(this)}
                              onClickDeleteAdBlock={this.handelClickOnDeleteAdBlock.bind(this)}/>
        })

        return (
            <div>
                <form className='ad-inserter-create-video' onSubmit={this.handleSubmit.bind(this)}>
                    <div className='ad-inserter-video-head'>
                        <p className='ad-inserter-h3-bold'>new video<span className='ad-inserter-h3'>{this.state.video.name}</span></p>
                        <p className='ad-inserter-h3'>duration<span className='ad-inserter-h3'>{changeFormat(this.calculateDurationOfVideo())}</span></p>
                    </div>
                    <div className='ad-inserter-lable-input-row'>
                        <label className='ad-inserter-input-label'
                               htmlFor='videoName'>video name</label>
                        <input className='ad-inserter-input'
                               id='videoName'
                               placeholder='name'
                               title='Insert a name for this video.'
                               type='text'
                               maxLength='2000'
                               required
                               value={this.state.video.name}
                               onChange={this.handleChangeName.bind(this)}/>
                    </div>

                    <div>{videoParts}</div>

                    <div className='ad-inserter-video-right-button'>
                        <button type='button'
                                className='ad-inserter-button-white-blue'
                                onClick={() => this.handelClickOnNewPart()}>
                            <i className="material-icons">add</i>video part
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
                                <LoadingButton icon='add_to_queue' color='green' loadingMessage='create'/>
                                    :
                                <button type='submit'
                                        className='ad-inserter-button-green-white'>
                                    <i className="material-icons">add_to_queue</i>create
                                </button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateVideo