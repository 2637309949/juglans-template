const fsx = require('fs-extra')
const gulp = require('gulp')
const exec = require('child_process').exec
const sequence = require('gulp-sequence')
const path = require('path')

const dest = 'build'
const loggerDir = path.join(dest, 'logger')
const assetsDir = path.join(dest, 'assets')

gulp.task('clean', function () {
  fsx.emptyDirSync(dest)
  fsx.ensureDirSync(dest)
  fsx.emptyDirSync(dest)
  fsx.ensureDirSync(dest)
})

gulp.task('build:apidoc', function (cb) {
  return exec('npm run doc', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('build:server', function (cb) {
  return gulp.src(['*src/**/*.js']).pipe(gulp.dest(dest))
})

gulp.task('copy:others', function () {
  fsx.ensureDirSync(loggerDir)
  fsx.ensureDirSync(assetsDir)
  return gulp.src([
    'package.json',
    'Dockerfile',
    '*doc/api_data.js',
    '*doc/api_project.js',
    '*logger/**/*',
    '*assets/**/*'
  ]).pipe(gulp.dest(dest))
})

gulp.task('default', sequence('clean', 'build:apidoc', 'build:server', ['copy:others']))
