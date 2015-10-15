var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	gulpMocha = require('gulp-mocha');

gulp.task('default', function(){
	nodemon({
		script: 'src/server/app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['node_modules']

	})
	.on('restart', function(){
		console.log('Restarting');
	});

});

gulp.task('test', function(){
	gulp.src('src/server/tests/*.js', {read: false})
	.pipe(gulpMocha({reporter: 'nyan'}));
});