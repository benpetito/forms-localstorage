# Angular Form Local Storage
***

Demo for persisting a form to localstorage when an internet connection is not available. The form data is saved into a javascript array and can be submitted when a connection is available. The browser window can be closed and the data should be loaded when re-opened automatically.

Uses [Yeoman](http://yeoman.io) generator for [Zurb Foundation 5](http://foundation.zurb.com/). For full generator instructions see [generator-zf5](https://github.com/juliancwirko/generator-zf5).

## Getting Started

Prerequisites: Node, Grunt, Yeoman, and Bower.  Once Node is installed, do:

    npm install -g grunt-cli yo bower

Next, install this generator:

    npm install -g generator-zf5

## Grunt tasks:

```
$ grunt (compile Sass, bower install, livereload, watch)
```
..for publishing project (into dist directory)
```
$ grunt publish (compile Sass, validate-js, copy, concatenation, minifications)
```
..for dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

## Demo

Run dist/index.html file from a web browser, the compiled output is checked in.