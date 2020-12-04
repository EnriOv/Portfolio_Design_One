const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

/* Paths to destination directories */
const dir_dist    = "../../dist";
const dir_imgs    = dir_dist + "/img"
const dir_css     = dir_dist + "/css"
const dir_css_dev = "../css";
const dir_js      = dir_dist + "/js"
const dir_js_dev  = "../js"

const folders_css = [dir_css, dir_css_dev];
const folders_js  = [dir_js, dir_js_dev];

/* Logs message */
gulp.task('message', function(done){
  console.log('Gulp is running...');
  done();
});

/* Copy all HTML files */
gulp.task('copyHtml', function(){
  return gulp.src('../*.html')
      .pipe(gulp.dest(dir_dist));
});

/* Optimize images */
gulp.task('imageMin', () =>
	gulp.src('../img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dir_imgs))
);

/* Compile SASS release */
gulp.task('sass', function(){
  var tasks = folders_css.map(function(element){
    return gulp.src('../scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat("mainStyles.css"))
      .pipe(gulp.dest(element));
  });

  return merge(tasks);
});

/* Compile SASS development */
gulp.task('sass_dev', function(){
  return gulp.src('../scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat("mainStyles.css"))
      .pipe(gulp.dest(dir_css_dev));
});

/* Scripts release */
gulp.task('scripts', function(){
  var tasks = folders_js.map(function(element){
    return gulp.src(['../js/*.js', '!../js/mainFunctions.js'])
      .pipe(concat('mainFunctions.js'))
      .pipe(uglify())
      .pipe(gulp.dest(element));
  });

  return merge(tasks);
});

/* Scripts development */
gulp.task('scripts_dev', function(){
  return gulp.src(['../js/*.js', '!../js/mainFunctions.js'])
      .pipe(concat('mainFunctions.js'))
      .pipe(uglify())
      .pipe(gulp.dest(dir_js_dev));
});

gulp.task('default', gulp.parallel(['message', 'sass_dev', 'scripts_dev']));
gulp.task('release', gulp.parallel(['message', 'copyHtml', 'imageMin', 'sass', 'scripts']));

gulp.task('watch_dev', function(){
  gulp.watch(['../js/*.js', '!../js/mainFunctions.js'], gulp.series('scripts_dev'));
  gulp.watch('../sass/*.scss', gulp.series('sass_dev'));
});