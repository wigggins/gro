# GRO
(Work in Progress)
Boilerplate for quickly developing projects. Gulp is used as the build tool to maximize the accessibility of your project by making it as performant as possible.

## What it do
* Compiles Sass and logs file sizes throughout the build process
* Minifies compiled Javascript and CSS
* Autoprefixes your css with vendor prefixes
* Watches for file changes and initiates browser reload

## Get started
Easy setup. Just run:

    git clone https://github.com/wigggins/gro.git
    cd gro
    npm install
    gulp

JS Hint is included, but not apart of the default task. Run separately with

	gulp lint

### Included libraries
I've included a couple common libraries to make offline development easier.
* Normalize 3.0.2
* jQuery 2.1.3