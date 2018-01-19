'use strict'

import React from 'react'

class LoadingButton extends React.Component {

    render() {
        return (
            <div className='ad-inserter-loading-button-container'>
                {this.props.loadingMessage}
            </div>
        );
    }
}

export default LoadingButton