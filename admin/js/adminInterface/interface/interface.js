'use strict'

import React from 'react';

class Interface extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}

export default Interface