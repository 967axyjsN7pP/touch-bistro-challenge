const path = require('path');

module.exports = {
    mode: "development",
    entry: "./frontend/src/App.jsx",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
