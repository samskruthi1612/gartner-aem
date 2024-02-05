const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "./dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        "esmodules": true,
                                    }
                                }
                            ],
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "./src/index.html"),
                    to: path.resolve(__dirname, "./dist/"),
                },
                { 
                    from: path.resolve(__dirname, "./src/assets"),
                    to: path.resolve(__dirname, "./dist/assets"),
                },
                { 
                    from: path.resolve(__dirname, "./src/pages"),
                    to: path.resolve(__dirname, "./dist/pages"),
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        compress: true,
        port: 4000,
        hot: true,
        liveReload: true,
    }
}
