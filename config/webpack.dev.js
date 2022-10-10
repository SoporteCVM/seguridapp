const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const devConfig = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};

module.exports = merge(common, devConfig);
