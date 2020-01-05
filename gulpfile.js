var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'); //Подключаем Sass пакет
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', async function(){ // Создаем таск "sass"
    return gulp.src('scss/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
});

gulp.task('watch', async function() {
    gulp.watch('scss/**/*.scss', gulp.parallel('sass'));
});