'use strict'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import { getVideos, getVideo, deleteVideo } from '../../handler/DBHandler'
import LoadingButton from '../loadingButton'
import { waitTwoSeconds } from '../demoHelper'
import LoadingScreen from '../loadingScreen'
import NoData from '../noData'


class VideoTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            videoDataArray: [],
            loadData: true
        }

        // only for demo purposes
        waitTwoSeconds(1000).then(() =>
            this.getVideoDataArray()
        )
    }

    getVideoDataArray() {
        getVideos().then(result => {
            result = result.map((video) => {
                video.editOpen = false
                video.saveVideo = false
                video.deleteVideo = false
                video.stringDuration = this.changeFormat(video.duration)

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

    changeFormat(duration) {
  
        let h = Math.floor(duration/3600000);
        duration = duration - ( h * 3600000);
        let m = Math.floor(duration/60000);
        duration = duration - ( m * 60000);
        let s = Math.floor(duration/1000);
        duration = duration - ( s * 1000);
        let ms = duration;
        let output = ""

        if(ms == 0){
            output = (h + "h " + m + "min " + s + "s"); 
        }else{
            if (ms >= 100) {
                output = (h + "h " + m + "min " + s + "." + ms + "s"); 
            }else if (ms >= 10){
                output = (h + "h " + m + "min " + s + ".0" + ms + "s"); 
            }else{
                output = (h + "h " + m + "min " + s + ".00" + ms + "s"); 
            }
        }
        return output;
    }

    handleChange(index, event) { //TODO
        // const videoDataArray = this.state.videoDataArray
        // switch (event.target.id) {
        //     case 'name' : {
        //         videoDataArray[index].name = event.target.value
        //         break
        //     }
        //     case 'number_of_video_parts' : {
        //         videoDataArray[index].number_of_video_parts = event.target.value
        //         break
        //     }
        //     case 'number_of_ad_blocks' : {
        //         videoDataArray[index].number_of_ad_blocks = event.target.value
        //         break
        //     }
        //     case 'number_of_ads' : {
        //         videoDataArray[index].number_of_ads = event.target.value
        //         break
        //     }
        //     case 'duration' : {
        //         videoDataArray[index].duration = event.target.value
        //         break
        //     }
        //     default : break
        // }
        // this.setState({adDataArray: adDataArray})
    }

    handleClickOnEditCloseIcon(index) {
        this.setEditOpen(index)
    }

    setEditOpen(index) {

        const videoDataArray = this.state.videoDataArray
        videoDataArray[index].editOpen = !videoDataArray[index].editOpen
        this.setState({videoDataArray: videoDataArray})
    }

    handleSubmit(index, event) {
        // event.preventDefault();
        // this.setSaveAd(index)
        // const json = this.getJsonForSubmit(index)
        // // updateAd(this.state.adDataArray[index].id, json)
        // //     .then(result => {
        // //         this.setSaveAd(index)
        // //         if (result) {
        // //             this.setEditOpen(index)
        // //         } else {
        // //             console.log('Error')
        // //         }
        // //     })

        // // only for demo purposes
        // waitTwoSeconds(2000).then(() =>
        //     updateAd(this.state.adDataArray[index].id, json)
        //         .then(result => {
        //             this.setSaveAd(index)
        //             if (result) {
        //                 this.setEditOpen(index)
        //             } else {
        //                 console.log('Error')
        //             }
        //         })
        // )
        // return false
    }

    setSaveAd(index) {
        // const videoDataArray = this.state.videoDataArray
        // videoDataArray[index].saveAd = !videoDataArray[index].saveAd
        // this.setState({videoDataArray: videoDataArray})
    }

    handleDelete(index) {
        this.setDeleteVideo(index)
        // deleteVideo(this.state.videoDataArray[index].id)
        //     .then(result => {
        //         this.setDeleteVideo(index)
        //         if (result) {
        //             this.removeVideo(index)
        //         } else {
        //             console.log('Error')
        //         }
        //     })

        // only for demo purposes
        waitTwoSeconds(1000).then(() =>
            deleteVideo(this.state.videoDataArray[index].id)
                .then(result => {
                    this.setDeleteVideo(index)
                    if (result) {
                        this.removeVideo(index)
                    } else {
                        console.log('Error')
                    }
                })
        )
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

            let fullDuration = video.duration
            let globalLeft = 0
            let output = []

            //videoPart
            video.video_parts.map((videoPart, p_index) => {
                let partName = videoPart.part_name
                let partFullDuration = videoPart.part_full_duration
                let partDuration = videoPart.part_duration

                let partWidth = Math.floor((partFullDuration / fullDuration) * 100) 

                //output
                let htmlVideoPart = <div key={"timeline-video-part-" + p_index}  className='ad-inserter-timeline-video-block' style={{width: (partWidth + "%")}}></div>
                output.push(htmlVideoPart)
                

                if (videoPart.ad_blocks != undefined) {
                    videoPart.ad_blocks.map((block, b_index) => {
                        let blockDuration = block.block_duration   
                        let blockStart = block.block_start
    
                        let blockWidth = Math.floor((blockDuration  / fullDuration) * 100)
                        let blockLeft = Math.floor(((globalLeft + blockStart) / fullDuration) * 100)
    
                        console.log("debug: " + fullDuration + " blockDuration: " + blockDuration + " width " + blockWidth)


                        //output
                        let htmlBlock = <div key={"timeline-adblock-" + b_index} className='ad-inserter-timeline-ad-block' style={{left: (blockLeft + "%"), width: (blockWidth + "%")}}></div>
                        output.push(htmlBlock)
                        
                        //ads
                        // block.ads.map((ad,ad_index) => {
                        //     let name = ad.ad_name 
                        //     //TODO
                        // })
    
                        globalLeft = globalLeft + blockDuration
                    })
                }

                globalLeft = globalLeft + partFullDuration

            })

            return output
        })    


        const tableContent = this.state.videoDataArray.map((video, index) => {
            return [
                <tr key={index + 'ad-table-view'}
                    className={ this.state.videoDataArray[index].editOpen ? 'active-row' : null}>
                    <td className='ad-inserter-td ad-inserter-table-cell-left ad-inserter-bold'>{video.name}</td>
                    <td className='ad-inserter-td ad-inserter-table-cell-left ad-inserter-bold ad-inserter-table-data-fixed-width-number'>{video.number_of_video_parts}</td>
                    <td className='ad-inserter-td ad-inserter-table-cell-left ad-inserter-bold ad-inserter-table-data-fixed-width-number'>{video.number_of_ad_blocks}</td>
                    <td className='ad-inserter-td ad-inserter-table-cell-left ad-inserter-bold ad-inserter-table-data-fixed-width-number'>{video.number_of_ads}</td>
                    <td className='ad-inserter-td ad-inserter-table-cell-left ad-inserter-bold ad-inserter-table-data-fixed-width-number'>{video.stringDuration}</td>
                    {
                        !this.state.videoDataArray[index].editOpen ?
                        <td className='ad-inserter-table-data-fixed-width-icon'><i className="material-icons material-icon-as-button" onClick={this.handleClickOnEditCloseIcon.bind(this, index)}>mode_edit</i></td>
                            :
                        <td className='ad-inserter-table-data-fixed-width-icon'><i className="material-icons material-icon-as-button key-down" onClick={this.handleClickOnEditCloseIcon.bind(this, index)}>expand_more</i></td>
                    }
                    <td className='ad-inserter-table-data-fixed-width-icon'><i className="material-icons material-icon-as-button" onClick={this.handleVideoPreviewInNewTab.bind(this,index)} >video_label</i></td>
                    <td className='ad-inserter-table-data-fixed-width-icon'><i className="material-icons material-icon-as-button" onClick={this.handleDelete.bind(this,index)}>delete</i></td>
                </tr>,
                <tr>
                    <td colSpan='8' className={ this.state.videoDataArray[index].editOpen ? 'ad-inserter-table-edit-ad-view active' : 'ad-inserter-table-edit-ad-view' }>
                        {
                            this.state.videoDataArray[index].editOpen ?
                            <div className='ad-inserter-timeline'>
                                {/* {timelineContent[index]} */}

                                <div className='ad-inserter-timeline-video-block' style={{width: "25%"}}></div>
                                <div className='ad-inserter-timeline-video-block' style={{width: "75%"}}></div>

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
                <NoData datatype='ads' //TODO auf Video anpassen
                        linkToNew='/wp/wp-admin/admin.php?page=mpat-ad-insertion-new-ad'
                        from='mpat-ad-insertion-all-ads'
                        to='mpat-ad-insertion-new-ad'
                        buttonText='new Video'/>
                :
                <table className='ad-inserter-table'>
                    <thead className='ad-inserter-thead'>
                    <tr>
                        <th className='ad-inserter-th ad-inserter-table-cell-left'>name</th>
                        <th className='ad-inserter-th ad-inserter-table-cell-left'>videos</th>
                        <th className='ad-inserter-th ad-inserter-table-cell-left'>blocks</th>
                        <th className='ad-inserter-th ad-inserter-table-cell-left'>Ads</th>
                        <th className='ad-inserter-th ad-inserter-table-cell-left'>duration</th>
                        <th></th>
                        <th></th>
                        <th></th>
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