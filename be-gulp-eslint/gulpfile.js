'use strinct';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const reporter = require('eslint-html-reporter');
const path = require('path');
const fs = require('fs');

gulp.task('check-code', function() {
    return gulp.src(['./App/**/**/*.js', './App/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format(reporter, function(results) {
          fs.writeFileSync(path.join(__dirname, 'reporter-result.html'), results);
        }))
});