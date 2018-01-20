'use strict'

import React from 'react'

class AdTable extends React.Component {

    getAds(){
        return null
    }

    render() {
        const data = this.getAds()
        const columns = [
            {

            }
        ]
        return (
            <ReactTable
                date={data}
                columns={columns}>
            </ReactTable>
        );
    }
}

export default AdTable