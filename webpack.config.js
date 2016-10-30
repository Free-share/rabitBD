var webpack = require('webpack');
var glob = require("glob");
var path = require("path");
var config = require('./conf/config.json');
var root = config.staticRoot;
var entry = path.join(config.staticRoot, "**/*.js");
var release = config.release;
var debug = config.debug ? config.debug : false;
var outFilename = debug ? "[name].min.js" : "[name]-[hash:8].js";

function buildEntries(globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }

    return entries;
}

module.exports = {
    //插件项
    plugins: [],
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js'
    },
    //入口文件输出配置
    output: {
        path: release,
        filename: outFilename
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};
