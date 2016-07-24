# Website Performance Optimization portfolio project

GitHub Pages website can be found [here](http://nataliatepluhina.github.io/Nanodegree/Web%20Optimization/src/index.html)

## How to install and build

1. Clone this repository from GitHub or download zip file.
2. If needed, install [Node.js](https://nodejs.org/en/) and [Gulp](http://gulpjs.com/)
3. Inside repository folder open the command line, type "gulp" and press Enter. As a result, you will see a page with localhost:8000 URL. Any changes you'll do in project files will immediately affect this page.
4. All optimized files can be found inside "dist" folder.

## HTML Optimization

* Inlined styles needed above the fold.
* Added media attribute so print.css only loads for print purpose
* Set the GoogleAnalytics script to load asynchronously.
* Moved css files to the end of body to delay their loading

## Image Optimization

* Resized and adjusted quality of images to match our pages
* Compress JPGs manually and PNGs with gulp-imagemin

## JavaScript Optimization

* Replaced `querySelectorAll` with `getElementsByClassName` to improve performance.
* Moved DOM methods from functions and for loops so they are not redefined each time calling function is run.
* Changed resize pizza code using the switch to set three percentage values instead of width calculations
* Used requestAnimationFrame to animate moving pizzas instead of simple scroll event listener
* Cut down on the number of moving pizzas from 100 to 50

## CSS Optimization

Added will-change attribute to "mover" selector to improve composite performance
