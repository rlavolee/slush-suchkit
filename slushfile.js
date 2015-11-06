var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    inquirer = require('inquirer');

gulp.task('default', function (done) {
    inquirer.prompt([
            {type: 'input', name: 'name', message: 'Give your app a name', default: gulp.args.join(' ')},
            {type: 'confirm', name: 'moveon', message: 'Continue?'}
        ],
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                })
                .resume();
        });
});