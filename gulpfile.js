const fsx = require('fs-extra')
const gulp = require('gulp')
const exec = require('child_process').exec
const sequence = require('gulp-sequence')

const dest = 'build'
const env = process.env.NODE_ENV || 'local'

console.log(`============= ${env} =============\n`)
gulp.task('clean', function () {
  fsx.emptyDirSync(dest)
  fsx.ensureDirSync(dest)
})

gulp.task('build:apidoc', function (cb) {
  return exec('npm run apidoc', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('build:server', function (cb) {
  return gulp.src(['*src/**/*.js']).pipe(gulp.dest(dest))
})

gulp.task('copy:others', function () {
  return gulp.src([
    'package.json',
    'Dockerfile',
    '*logger/**/*',
    '*assets/**/*',
    '*node_modules/**/*'
  ]).pipe(gulp.dest(dest))
})
gulp.task('default', sequence('clean', 'build:apidoc', 'build:server', ['copy:others']))
