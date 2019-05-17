const path = require("path");

const {VueLoaderPlugin} = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jp&g)$/,
                loaders: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                        }
                    },
                    "img-loader",
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            {
                from: "./src/assets/img",
                to: "./img",
            }
        ]),
    ]
};