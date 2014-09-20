var
  gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  path = require('path'),
  fs = require('fs');

var paths = {
  builds : {
    src : './source/app.js',
    dest : './public/javascripts/'
  },

  watch : './source/**/*.js',

  html : {
    src  : './source/templates/',
    dest : './source/templates/index.js'
  }
};


/**
 * Build js files from the source folder
 */
gulp.task('js', function () {
  console.log('Build ' + paths.builds.dest + 'file');

  gulp
    .src(paths.builds.src)
    .pipe(browserify({ debug : true }))
    .pipe(gulp.dest(paths.builds.dest));
});


/**
 * Watch file changes and execute `js` task
 */
gulp.task('watch', ['js'], function () {
  var watcher = gulp.watch(paths.watch, ['js']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', building scripts...');
  });
});

/**
 * Add all html files into one browserifyable
 */
gulp.task('templates', function () {

  var
    source = paths.html.src,
    dest = paths.html.dest;

  fs.readdir(source, function (err, files) {
    if(err) {
      console.log(err);
      return;
    }

    var templates = {},
        dir, val;

    files.forEach(function (filename) {
      if(filename.indexOf('.html') === -1) {
        // work with directory
        return;
      }

      dir = path.normalize(source + filename);
      val = fs.readFileSync(dir, 'utf8');
      templates[filename.slice(0, filename.indexOf('.'))] = val;
    });

    dir = path.normalize(dest);

    fs.writeFileSync(dir, 'module.exports = ' + JSON.stringify(templates) + ';');
    console.log('templates file was built (' + dir +')');
  });

});
