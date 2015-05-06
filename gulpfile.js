/**
 * Required modules
 */
// Gulp to run a gulp task!
var gulp = require('gulp')

// browserify is mainly used to remove the 
// compiled es6 codes need to use require
var browserify = require('browserify')

// the meat of our pudding
var babel = require('babelify')

// gulp pipe logic
var through2 = require('through2')

// simply watch directory/files
var watch = require('gulp-watch')

// uglify js
var uglify = require('gulp-uglify')

// used to created a nice header
var header = require('gulp-header')

// load the package settings
var pkg = require('./package.json')

// create a banner that will be used on the minified file
var banner = [
	' /** <%= pkg.name %> - <%= pkg.description %>',
	' ** @author <%= pkg.author %>',
	' ** @version v<%= pkg.version %> **/',
	''
].join('\n')


/**
 * Build task
 * this passes the main script to browserify and reads it.
 * Then its passed to babelify that converts it to es5
 * Then bundles the require calls to a single file.
 * After that it minifies the code, slaps a banner on it and saves.
 */
gulp.task('build', function() {
	return gulp.src('./js/app.js')
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path, {
					debug: true
				})
				.transform(babel)
				.bundle(function(err, res) {
					if (err) {
						return next(err)
					}
					file.contents = res
					next(null, file)
				})
		}))
		.on('error', function(err) {
			return next(err)
			this.emit('end')
		})
		.pipe(uglify())
		.pipe(require('gulp-rename')('app.min.js'))
		.pipe(header(banner, {
			pkg: pkg
		}))
		.pipe(gulp.dest('./js/'))
})

// watch yoo files man.
gulp.task('watch', function() {
	gulp.watch('./js/*.js', ['build'])
})
