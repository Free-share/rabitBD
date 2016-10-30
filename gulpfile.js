/**
 * Created by wuao on 16/10/30.
 */

var fs = require("fs");
var gulp = require("gulp");
var webpack = require("webpack");
var cleanCSS = require("gulp-clean-css");
var cssversion = require('gulp-make-css-url-version');
var rev = require("gulp-rev");
var path = require("path");
var config = require("./conf/config.json");
var root = config.staticRoot;
var cssGlob = path.join(root, "**/*.css");
var jsGlob = path.join(root, "**/*.js");
var release = config.release;

// var webpackConfig = Object.create(require("./conf/webpack.config.js"));

// gulp.task('js-build', function() {
//     webpack(
// 		webpackConfig
// 	, function(err, stats) {
// 		console.log(stats);
// 	});
// });

gulp.task('css-build', function() {

    // clean-css 配置
    var cssOptions = {
        keepSpecialComments: "*",
        compatibility: 'ie6'
    };

    var manifest = {
        "path": config.manifestFile
    };

    return gulp.src(cssGlob)
        .pipe(cleanCSS(cssOptions))
        .pipe(cssversion())
        .pipe(rev())
        .pipe(gulp.dest(release))
        .pipe(rev.manifest(manifest))
        .pipe(gulp.dest(config.manifeseRoot));

});

gulp.task('watch', ['css-build'], function() {
    gulp.watch(cssGlob, ['css-build']);
});
