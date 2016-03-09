var gulp = require('gulp');
var util = require('util');
var gulpLess = require('gulp-less');
var path = require('path');

gulp.task('test',function(){
	Array.prototype.foreach
})

gulp.task('default',function(){
	util.log('====================');
	util.log('可单独使用命令"gulp less"编译less文件，输出到"public/stylesheets/"目录。');
	util.log('====================');
})

gulp.task('less',function(){
	util.log('====================');
	util.log('start');
	gulp.src('assets/stylesheets/*.less')
		.pipe(gulpLess())
		.pipe(gulp.dest(path.join(__dirname, 'public', 'stylesheets')))
	util.log('end');
	util.log('====================');
})

var watcher = gulp.watch('assets/stylesheets/*.less', ['less']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});