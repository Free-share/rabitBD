/**
 * Created by wuao on 16/10/30.
 */

var fs = require("fs");
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var cssversion = require('gulp-make-css-url-version');
var rev = require("gulp-rev");
var path = require("path");
var config = require("./conf/config.json");
var root = config.staticRoot;
var cssGlob = path.join(root, "**/*.css");
var release = config.release;

gulp.task('css-build', function() {

    if (config.manifestFile && !fs.existsSync(config.manifestFile)) {
        fs.appendFileSync(config.manifestFile, "");
    }

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
        .pipe(rev.manifest(manifest))
        .pipe(gulp.dest(release));

});
