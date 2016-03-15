'use strict'

let gulp = require('gulp');
let gulpLess = require('gulp-less');
let util = require('util');
let path = require('path');

gulp.task('less',()=>{
	util.log('====================');
	util.log('start compile');
	gulp.src('./src/*.less')
		.pipe(gulpLess())
		.pipe(gulp.dest(path.join(__dirname)));
	util.log('====================');
});

gulp.watch(['./src/*.less','./src/less_partials/*.less'],['less']);