var gulp = require('gulp'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    uglify = require('gulp-uglify'),
    uglifyCSS = require('gulp-uglifycss'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream');

const files = [
    'table.jsx'
];

const public = './Public/';
const rootJS = public + 'js/src/';
const outputJS = public + 'js/dist/';
const rootCSS = public + 'css/src/*.css';
const outputCSS = public + 'css/dist/';

gulp.task('dev', () => {
    const tasks = files.map((file) => {
        const filePath = rootJS + file;
        return browserify({
            entries: filePath,
            extensions: ['.js', '.jsx'],
            debug: true
        })
            .transform('babelify', { presets: ['es2015', 'stage-3', 'react'] })
            .transform('brfs')
            .bundle()
            .pipe(source(file))
            .pipe(rename((path) => {
                path.basename += '.bundle.min';
                path.extname = '.js'
            }))
            .pipe(gulp.dest(outputJS));
    });
    return es.merge.apply(null, tasks);

});

gulp.task('prod', () => {
    const tasks = files.map((file) => {
        const filePath = rootJS + file;
        return browserify({
            entries: filePath,
            extensions: ['.js', '.jsx'],
            debug: false
        })
            .transform('babelify', { presets: ['es2015', 'stage-3', 'react'] })
            .transform('brfs')
            .bundle()
            .pipe(source(file))
            .pipe(rename((path) => {
                path.basename += '.bundle.min';
                path.extname = '.js'
            }))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest(outputJS));
    });

    return es.merge.apply(null, tasks);

});

gulp.task('css', function () {
    return gulp.src(rootCSS)
        .pipe(uglifyCSS())
        .pipe(rename(function (path) {
            path.basename += '.min';
            path.extname = '.css'
        }))
        .pipe(gulp.dest(outputCSS));
});

//gulp.task('enviroment', () => {
//    process.env.NODE_ENV = env === 'rbcDev' ? 'development' : 'production'; // for react enviroment
//});

const watchJS = rootJS + '**/**';

gulp.task('watchDev', () => {
    process.env.NODE_ENV = 'development';
    gulp.watch([watchJS + '.js', watchJS + '.jsx'], ['dev']);
});

gulp.task('watchProd', () => {
    process.env.NODE_ENV = 'production'
    gulp.watch([watchJS + '.js', watchJS + '.jsx'], ['prod']);
});

gulp.task('watchCSS', () => {
    gulp.watch([rootCSS], ['css']);
});

gulp.task('develop', ['watchDev', 'watchCSS']);

gulp.task('production', ['watchProd', 'watchCSS']);
