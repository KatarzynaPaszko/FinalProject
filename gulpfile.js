var gulp = require("gulp"); //za pomoca tej linjijki wywolujemy zainstalowana przez nas paczke
                            //jest ta paczka dostepne teraz pod zmienna o nazwie gulp

var sass = require("gulp-sass") // p[aczka gulp-sass bedzie dostepna pod zmienna sass

var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();


//pierwszy argument nazwa zadania, drugi - funkcja ktora sie uruchomi w momencie wywolania tego zadania
// gulp.task("pranie", function(){
//   console.log("robie pranie");
// })

gulp.task("sass", function(){
  //1. wez pliki z koncowka scss
  //zainicjowac sourcemapy
  //2. przetworz zadanie za pomoca paczki gulp-sass
  //zapisz sourcemaps
  //3. stworzyc pliki z koncowka css

  //gulp src pobiera pliki
  //* symbolizuje wszystkie pliki z koncowka scss
  //pipe - zapomoaca tej funkcjiidziemy krok dalej
  return gulp.src("sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));
})

gulp.task("watch", function(){
  //watch
  //pierwszy argument - pliki ktore ma obserwowac
  //drugi argument - zadanie ktore ma sie wykonac jak dokona sie zmiana. Musi to byc tablica[]
  gulp.watch("sass/**/*.scss", ["sass", "reload"]);
  gulp.watch("./**/*.html", ["reload"]);
})



//odswierza w tle przegladarke

gulp.task("reload", function(){
  browserSync.reload();
})

gulp.task("serve", function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
})

gulp.task("default",["sass", "watch", "serve"]);
