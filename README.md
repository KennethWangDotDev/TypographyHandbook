My personal starter kit that I use for my front-end web projects. This starter kit combines a lightweight HTML5 Boilerplate an extremely powerful Gulpfile.

## Installation

```bash
git clone https://github.com/kennethwang14/KennethStarterKit newproject
cd newproject
npm install
gulp build
gulp
```

## Boy

[Boy](https://github.com/corysimmons/boy) is a lightweight, up-to-date version of HTML5 Boilerplate with conditionally loaded polyfills and a nice general reset for amazing CSS3 support back to IE6.

- A lightweight/2-space batch of [HTML5 Boilerplate](https://html5boilerplate.com) features
  - [index.html](index.html) (with all the fluff removed)
  - [.editorconfig](.editorconfig) (modified to 2 spaces)
  - [.htaccess](.htaccess)
  - [crossdomain.xml](crossdomain.xml)
  - Harsher outdated browser warning (warns on IE9 instead of IE8)
- Minified and sourcemapped :rage3: [reeeset](https://github.com/corysimmons/reeeset) (opinionated [Normalize.css](https://necolas.github.io/normalize.css) for the real world)
- Polyfills for IE8 and below a la :heart: [ie-love](https://github.com/corysimmons/ie-love)
  - Conditionally loaded so only IE8 and below users will have to download it (even though it's only 25kb uglified)
  - [html5shiv](https://github.com/aFarkas/html5shiv) (in the right place)
  - [calc-polyfill](https://github.com/closingtag/calc-polyfill)
  - [jQuery 1.x.x](https://jquery.com/download/)
  - [Selectivizr 2](https://github.com/corysimmons/selectivizr2)
  - [Respond.js](https://github.com/scottjehl/Respond)
- Empty/valid package.json for quick `npm install --save-dev`s
- `.gitignore` for Node and Bower

## Gulp

A powerful, custom Gulpfile.

What it does:
-  Automatically compiles, minifies Sass with Autoprefixer and SourceMap support
-  Minifies JavaScript files
-  Automatically appends `.min` to all miniifed files
-  In addition, a link to the source is provided in all minified files
-  BrowserSync for automatically refreshing pages, and synced browsers across all devices
-  Nunjucks for templating

## File Structure

Source files are located in `app`. Build files are located in `dist`. Nunjucks template files are in `app/templates`.

## Sass Architecture

My opinionated Sass architecture, largely inspired by Hugo Giraudel's 7-1 [Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate). My version aims for simplicity and comes with useful initial CSS styling.