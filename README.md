# Start build one page app
## Overview
Build one page with Scss, TypeScript, Gulp, Browser-Sync and Jasmine. Ideal to create a modern landing pages or one page application.  Notable features:
+ Included [Bourbon](http://bourbon.io/) and [Bourbon Neat](http://neat.bourbon.io/).
+ Autorefresh page with [Browser Sync](https://www.browsersync.io/).
+ Implemented `gulp` tasks.
+ Autocompile `scss` and `ts` files.
+ Other additional features: `concat`, `html minify`, `css` and `js` autocompiled `maps`, etc.
+ Full configuration `./config.json` file for your needs.

## Dependencies
[Gulp](http://gulpjs.com/)
```shell
npm install -g gulp-cli
```
[TypeScript](http://www.typescriptlang.org/)
```shell
npm install -g typescript
```

## Get Starting
Note: All commands entered need to be performed from within *project directory*.

Clone this repo and install all dependencies

```shell
git clone https://github.com/wanoo21/OnePageApp.git
cd OnePageApp
npm install
```
Install jQuery ts dependency
```shell
npm install -g tsd
tsd install
```
Run your server in develompent mode
```shell
npm run-script start-devp
```
That's all!

## How to make changes
First, run `gulp` files watcher
```shell
gulp watch:all
```
If your server is not running, start it, in addiotional terminal tab
```shell
npm run-script start-devp
```
Now, make your changes in `./devp` folder. 
Browser will refresh your page automatically with [Browser Sync](https://www.browsersync.io/).

## Testing
After a change, make test function in `./tests/test.spec.js`. Don't worry, you can test all your functions from `./devp/ts/*.ts` files.
Run test with [Jasmine](http://jasmine.github.io/).
```shell
npm test
```

## Production
If you want start server in production mode, run:
```shell
npm start
```
Get your clean and fully optimize project.
```shell
gulp get-production
```
In root folder, you must find a `./prod` folder by default, inside is your project! Yeah, cool, right?

## Configurations
All your configurations for development and production mode, you can find in `./config.json`. 
You can rewrite or add any other properties!
