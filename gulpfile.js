var { src, dest, series , parallel, watch } = require("gulp");
var markdown = require("gulp-markdown");
var inject = require("gulp-inject-string");
var concat = require("gulp-concat");

var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');

var del = require("del");

function clean(){
    return del(["./dist/"]);
}
function md(){
    return src("./*.md")
    .pipe(markdown())
    .pipe(inject.prepend("<html><head></head><body>"))
    .pipe(inject.append("</body></html>"))
    .pipe(dest("./dist/") );
}

function js(){
    return src("./src/*.js")
    .pipe(concat("bundle.js"))
    .pipe(dest("./dist/"));
}

function html(){
    return src("./src/*.html")
    .pipe(dest("./dist/"));
}

function sassf(){
    return src('./src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css/'));
}
function watchAll(){
    watch("./*.md", md);
    watch("./src/*.js", js);
    watch("./src/*.html", html);
    watch('./src/sass/**/*.scss',sassf);
}
exports.clean = series([clean]);
exports.default = parallel([watchAll,series([md,sassf,js,html])]);
