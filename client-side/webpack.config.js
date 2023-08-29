const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // tell webpack the entry point of our app, to create dependency graph
    entry: './src/index.js',
    // tell webpack name and location of bundled file
    output: {
        // __dirname currnetly ../sandigan so when joined to /dist
        // resulting path is ../sandigan/dist
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin({
            // path of our main html file where we render our react code
            template: './public/index.html'
        })
    ],

    resolve: {
        modules: [__dirname, "src", "node_modules"],
        // 
        extensions: [".*", ".js", ".jsx", ".tsx", ".ts"],
    },

    module: {
        rules: [
            {
                // transpiles all our files that end both with .js or .jsx by default, but since
                // extensions array where *, .js, .tsx, and .ts is included aside from
                // .jsx it will compile also files with these extensions
                test: /\.(js|jsx)$/,
                // we want to also exclude folders liek node moduels when babel transpiles them
                exclude: /node_modules/,
                use: {
                    // transpiles our .js, .jsx files with preset-env and preset-react
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                // transpiles all our stylesheet files that have extensions .scss, .sass, or css
                // node this needs style-loader, css-loader, sass-loader, and sass to be installed
                // if css only then only css-loader and style-loader will be needed in devDependencies
                test: /\.(s[ac]ss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // transpiles all our media files that have extensions .png, .jpeg, .jpg, .gif, and .svg
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ]
    }
}