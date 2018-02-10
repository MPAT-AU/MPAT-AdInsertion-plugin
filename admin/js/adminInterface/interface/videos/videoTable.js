'use strict'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import { getVideos, deleteVideo } from '../../handler/DBHandler'
import LoadingScreen from '../loadingScreen'
import NoData from '../noData'
import {changeFormat} from '../../helper/format'


class VideoTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            videoDataArray: [],
            loadData: true
        }

        this.getVideoDataArray()
    }

    getVideoDataArray() {
        getVideos().then(result => {
            result = result.sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
            }).map((video) => {
                video.showTimeline = false
                video.deleteVideo = false
                video.stringDuration = changeFormat(video.duration)

                return video
            })
            this.setState({
                videoDataArray: result,
                loadData: false
            })
        }, err => {
            console.log('Error ', err)
        })
    }

    handleClickOnEdit(index) {
        console.log('goto edit')
    }

    handleClickOnShowHideTimeline(index) {
        const videoDataArray = this.state.videoDataArray
        videoDataArray[index].showTimeline = !videoDataArray[index].showTimeline
        this.setState({videoDataArray: videoDataArray})
    }

    handleDelete(index) {
        this.setDeleteVideo(index)
        deleteVideo(this.state.videoDataArray[index].id)
            .then(result => {
                this.setDeleteVideo(index)
                if (result) {
                    this.removeVideo(index)
                } else {
                    console.log('Error')
                }
            })
    }

    removeVideo(index) {
        const videoDataArray = this.state.videoDataArray
        const newVideoDataArray = videoDataArray.slice(0,index).concat(videoDataArray.slice(index + 1))
        this.setState({videoDataArray: newVideoDataArray})
    }

    setDeleteVideo(index) {
        const videoDataArray = this.state.videoDataArray
        videoDataArray[index].deleteVideo = !videoDataArray[index].deleteVideo
        this.setState({videoDataArray: videoDataArray})
    }


    handleVideoPreviewInNewTab(index) {
        var win = window.open(this.state.videoDataArray[index].output_dash_url, '_blank');
        win.focus();
    }


    render() {

        const timelineContent = this.state.videoDataArray.map((video, index) => {

            console.log(video)

            let fullDuration = video.duration
            let globalLeft = 0
            let output = []

            //videoPart
            video.video_parts.map((videoPart, p_index) => {
                let partName = videoPart.part_name
                let partFullDuration = parseInt(videoPart.part_full_duration)
                let partDuration = parseInt(videoPart.part_duration)

                let partWidth = Number((Math.floor((partFullDuration / fullDuration) * 100)).toFixed(1)) 

                //output
                let htmlVideoPart = <div key={"timeline-video-part-" + Math.floor((Math.random() * 100000) + 1)}  className='ad-inserter-timeline-video-block' style={{width: (partWidth + "%")}}></div>
                output.push(htmlVideoPart)
                

                if (videoPart.ad_blocks != undefined) {
                    videoPart.ad_blocks.map((block, b_index) => {
                        let blockDuration = parseInt(block.block_duration)   
                        let blockStart = parseInt(block.block_start)
    
                        let blockWidth = Number((Math.floor((blockDuration  / fullDuration) * 100)).toFixed(1)) 
                        let blockLeft = Number((Math.floor(((parseInt(globalLeft) + blockStart) / fullDuration) * 100)).toFixed(1))
    
                        //output
                        let htmlBlock = <div key={"timeline-adblock-" + Math.floor((Math.random() * 100000) + 1)} className='ad-inserter-timeline-ad-block' style={{left: (blockLeft + "%"), width: (blockWidth + "%")}}></div>
                        output.push(htmlBlock)
                        
                        //ads
                        // block.ads.map((ad,ad_index) => {
                        //     let name = ad.ad_name 
                        //     //TODO
                        // })
    
                        globalLeft = globalLeft + parseInt(blockDuration)
                    })
                }
                globalLeft = globalLeft + parseInt(partFullDuration)
            })

            return output
        })    


        const tableContent = this.state.videoDataArray.map((video, index) => {
            return [
                <tr key={index + 'ad-table-view'}
                    className={ this.state.videoDataArray[index].showTimeline ? 'active-row' : null}>
                    {
                        this.state.videoDataArray[index].showTimeline ?
                            <td className='ad-inserter-video-table-row-item ad-inserter-video-table-fixed-size-of-material-icon'>
                                <i className='material-icons material-icon-as-button'
                                   data-tip='React-tooltip'
                                   data-delay-show='500'
                                   data-for={'timeline-' + index}
                                   onClick={this.handleClickOnShowHideTimeline.bind(this,index)}>
                                    expand_more
                                </i>
                                <ReactTooltip place='top'
                                              type='dark'
                                              effect='solid'
                                              className='ad-inserter-react-tooltip'
                                              id={'timeline-' + index}
                                              delayShow={500}>
                                    <span>hide video timeline</span>
                                </ReactTooltip>
                            </td>
                                :
                            <td className='ad-inserter-video-table-row-item ad-inserter-video-table-fixed-size-of-material-icon'>
                                <i className='material-icons material-icon-as-button'
                                   data-tip='React-tooltip'
                                   data-delay-show='500'
                                   data-for={'timeline-' + index}
                                   onClick={this.handleClickOnShowHideTimeline.bind(this,index)}>
                                    theaters
                                </i>
                                <ReactTooltip place='top'
                                              type='dark'
                                              effect='solid'
                                              className='ad-inserter-react-tooltip'
                                              id={'timeline-' + index}
                                              delayShow={500}>
                                    <span>show video timeline</span>
                                </ReactTooltip>
                            </td>
                    }
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-text-left'>{video.name}</td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-parts'>{video.number_of_video_parts}</td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-ad-blocks'>{video.number_of_ad_blocks}</td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-ads'>{video.number_of_ads}</td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-text-right ad-inserter-video-table-fixed-width-duration'>{video.stringDuration}</td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-fixed-size-of-material-icon'>
                        <i className='material-icons material-icon-as-button'
                           data-tip='React-tooltip'
                           data-delay-show='500'
                           data-for={'preview-' + index}
                           onClick={this.handleVideoPreviewInNewTab.bind(this,index)}>
                            ondemand_video
                        </i>
                        <ReactTooltip place='top'
                                      type='dark'
                                      effect='solid'
                                      className='ad-inserter-react-tooltip'
                                      id={'preview-' + index}
                                      delayShow={500}>
                            <span>show video preview</span>
                        </ReactTooltip>
                    </td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-fixed-size-of-material-icon'>
                        <i className="material-icons material-icon-as-button"
                           data-tip="React-tooltip"
                           data-delay-show='500'
                           data-for={'edit-' + index}
                           onClick={this.handleClickOnEdit.bind(this, index)}>
                            mode_edit
                        </i>
                        <ReactTooltip place='top'
                                      type='dark'
                                      effect='solid'
                                      className='ad-inserter-react-tooltip'
                                      id={'edit-' + index}
                                      delayShow={500}>
                            <span>edit video</span>
                        </ReactTooltip>
                    </td>
                    <td className='ad-inserter-video-table-row-item ad-inserter-video-table-fixed-size-of-material-icon'>
                        <i className="material-icons material-icon-as-button"
                           data-tip="React-tooltip"
                           data-delay-show='500'
                           data-for={'delete-' + index}
                           onClick={this.handleDelete.bind(this,index)}>
                            delete
                        </i>
                        <ReactTooltip place='top'
                                      type='dark'
                                      effect='solid'
                                      className='ad-inserter-react-tooltip'
                                      id={'delete-' + index}
                                      delayShow={500}>
                            <span>delete video</span>
                        </ReactTooltip>
                    </td>
                </tr>,
                <tr>
                    <td colSpan='9' className={ this.state.videoDataArray[index].showTimeline ? 'ad-inserter-table-edit-ad-view active' : 'ad-inserter-table-edit-ad-view' }>
                        {
                            this.state.videoDataArray[index].showTimeline ?
                            <div className='ad-inserter-timeline'>
                                {timelineContent[index]}

                            
                                {/* <div data-tip data-for='video' className='ad-inserter-timeline-video-block' style={{width: '100%'}}></div>
                                <div data-tip data-for='adBlock' className='ad-inserter-timeline-ad-block' style={{left: '50%', width: '25%'}}></div>
                                <ReactTooltip id='video' place="top" type="dark" effect="float">
                                    <span>Video name</span>
                                </ReactTooltip>
                                <ReactTooltip id='adBlock' place="top" type="dark" effect="float">
                                    <span>Ad name</span>
                                </ReactTooltip> */}

                            </div>        
                                :
                            null
                        }
                    </td>
                </tr> 
            ]
        })

        const loadingScreenOrTable = this.state.loadData ?
            <LoadingScreen/>
                :
            (
                this.state.videoDataArray.length === 0 ?
                <NoData datatype='videos'
                        linkToNew='/wp/wp-admin/admin.php?page=mpat-ad-insertion-new-video'
                        from='mpat-ad-insertion-all-ad-inserted-videos'
                        to='mpat-ad-insertion-new-video'
                        buttonText='new Video'/>
                :
                <table className='ad-inserter-table'>
                    <thead className='ad-inserter-thead'>
                        <tr>
                            <th></th>
                            <th className='ad-inserter-video-table-row-item ad-inserter-video-table-text-left'>name</th>
                            <th className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-parts'>parts</th>
                            <th className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-ad-blocks'>ad blocks</th>
                            <th className='ad-inserter-video-table-row-item ad-inserter-video-table-text-center ad-inserter-video-table-fixed-width-ads'>ads</th>
                            <th className='ad-inserter-video-table-row-item ad-inserter-video-table-text-right ad-inserter-video-table-fixed-width-duration'>duration</th>
                            <th colSpan='3' className='ad-inserter-video-table-row-item'>actions</th>
                        </tr>
                        </thead>
                    <tbody>
                       {tableContent}
                    </tbody>
                </table>
                
            )

        return (<div>{loadingScreenOrTable}</div>)
    }

}

export default VideoTable