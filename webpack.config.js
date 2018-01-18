var path = require('path');

module.exports = {
    entry: [
            path.resolve(__dirname, 'admin/js/adminInterface/adminInterface.js')
    ],
    output: {
        path: path.resolve(__dirname, 'admin/js/build'),
        filename: 'adminInterface.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
