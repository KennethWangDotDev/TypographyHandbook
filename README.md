My personal starter kit that I use for my front-end web projects. This starter kit combines a lightweight HTML5 Boilerplate with a Sass boilerplate. It also features a Gulp file to assist with workflow.

## Boy

[Boy](https://github.com/corysimmons/boy) is a lightweight, up-to-date version of HTML5 Boilerplate with conditionally loaded polyfills and a nice general reset for amazing CSS3 support back to IE6.

- [HTML5 Boilerplate](https://html5boilerplate.com/)
- [Modernizr](http://modernizr.com/)
- Conditionally loaded [Selectivizr](http://selectivizr.com/) for IE6-8 CSS3 selectors
- Conditionally loaded [Respond](https://github.com/scottjehl/Respond) for IE6-8 media queries
- Conditionally loaded [calc() Polyfill](https://github.com/closingtag/calc-polyfill) for IE8 `calc()` usage
- Conditionally loaded CDN and local jQuery
- Reset:
  - [Normalize.css](https://necolas.github.io/normalize.css/)
  - Helper [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) class (`.cf`)
  - `box-sizing` [polyfill](https://github.com/Schepp/box-sizing-polyfill) for IE6-7 applied to all elements IE7 and below
  - Apply `box-sizing: border-box` to everything
  - Remove all `margin` and `padding`
  - Force vertical scrollbar to prevent [page bounce](https://css-tricks.com/eliminate-jumps-in-horizontal-centering-by-forcing-a-scroll-bar/)
  - `max-width: 100%` to make a plethora of [HTML elements](https://github.com/corysimmons/boy/blob/master/css/reset.css#L35) responsive [by default](http://unstoppablerobotninja.com/entry/fluid-images/)
  - Generic styling for IE9 and below browser warning


## Sass Boilerplate

[Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate) uses the 7-1 architecture pattern and sticks to the Sass Guidelines writing conventions.

Each Sass stylesheets folder has its own README.md file to explain the purpose and add extra information. Be sure to browse the repository to see how it works.

## Gulp

This Gulpfile was designed to be lightweight, and only contains essentials.

```bash
git clone https://github.com/kennethwang14/KennethStarterKit KennethStarterKit
cd KennethStarterKit
npm install
npm run gulp
```

What it does:
-  Automatically compiles and minifies Sass
    -  Autoprefixer support
- Minifies JS
- SourceMap support for CSS and JS changes
- Compresses images with image-min and pngquant
- BrowserSync for automatically refreshing pages, and synced browsers across all devices
- [Lost Grid](https://github.com/corysimmons/lost) via PostCSS