var webpack = require('webpack');
var glob = require("glob");
var path = require("path");
var config = require('./conf/config.json');
var root = config.staticRoot;
var globPath = path.join(config.staticRoot + "/index/", "**/*.js");
var release = config.release;
var debug = config.debug ? config.debug : false;
var outFilename = debug ? "[name].min.js" : "[name]-[hash:8].js";
var rootAssetPath = path.join(config.staticRoot, "index");

// plugins
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var manifestPlugin = new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    });

function buildEntries(globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, relative;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        relative = path.relative(config.staticRoot, entry).replace('.js', '');
        entries[relative] = entry;
    }

    return entries;
}

buildEntries(globPath);

module.exports = {
    //插件项
    plugins: [manifestPlugin],
    //页面入口文件配置
    entry: buildEntries(globPath),
    //入口文件输出配置
    output: {
        path: release,
        filename: outFilename,
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};
