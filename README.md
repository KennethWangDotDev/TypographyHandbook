<p align="center">
  <img src="http://corysimmons.github.io/boy/boy-logo.svg">
</p>

A lightweight, up-to-date version of HTML5 Boilerplate with conditionally loaded polyfills and a nice general reset for amazing CSS3 support back to IE6.


## Features
- [HTML5 Boilerplate](https://html5boilerplate.com/)
- [Modernizr](http://modernizr.com/)
- Conditionally loaded [Selectivizr](http://selectivizr.com/) for IE6-8 CSS3 selectors
- Conditionally loaded [Respond](https://github.com/scottjehl/Respond) for IE6-8 media queries
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


## Installation (optional)
You can easily grab a zip of this, or clone it, every time you want to create a new project. Or you can make use of the command line tool, [boy-npm](https://github.com/corysimmons/boy-npm), to quickly create Boy projects on-the-fly.

- `npm install -g boy`
- `boy foo` to install to the `foo` directory
- `boy .` to install to the current directory


### Other Projects
If you like this project then I encourage you to check out a few of my other projects that go great with Boy.

- [Lost Grid](https://github.com/corysimmons/lost) - Quite simply the best grid out there in every comparison available. Simple yet incredibly powerful.
- [Typographic](https://github.com/corysimmons/typographic) - Insanely powerful yet easy-to-use responsive typography. Includes vertical rhythm, font stacks, modular scale, and more.
