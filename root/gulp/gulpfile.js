const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

/* Path to destination directories */
const dir_dist = "../../dist";
const dir_imgs = dir_dist + "/img"
const dir_css  = dir_dist + "/css"
const dir_js   = dir_dist + "/js"

/* Logs message */
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

/* Copy all HTML files */
gulp.task('copyHtml', function(){
  gulp.src('../*.html')
      .pipe(gulp.dest(dir_dist));
});

/* Optimize images */
gulp.task('imageMin', () =>
	gulp.src('../img/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dir_imgs))
);

/* Compile SASS */
gulp.task('sass', function(){
  gulp.src('../scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(dir_css));
});

/* Scripts */
gulp.task('scripts', function(){
  gulp.src('../js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(dir_js));
});

gulp.task('default', gulp.parallel(['message', 'copyHtml', 'imageMin', 'sass', 'scripts']));

gulp.task('watch', function(){
  gulp.watch('../js/*.js', ['scripts']);
  gulp.watch('../images/*', ['imageMin']);
  gulp.watch('../sass/*.scss', ['sass']);
  gulp.watch('../*.html', ['copyHtml']);
});