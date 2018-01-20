'use strict'

import React from 'react'

import { getAdsWithCount } from '../../handler/DBHandler'

class AdTable extends React.Component {

    getAds(){
        getAdsWithCount().then(result => {
        })
    }

    render() {
        const data = this.getAds()
        // const columns = [
        //     {
        //
        //     }
        // ]
        return (
            <h2>Table</h2>
        );
    }
}

export default AdTable