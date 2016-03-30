# Start build one page app
## Overview
Build one page with Scss, TypeScript, Gulp, Browser-Sync and Jasmine. Ideal to create a modern landing pages or one page application.  Notable features:
+ Implemented `gulp` tasks

## Dependencies
[Gulp](http://gulpjs.com/)
```shell
npm install -g gulp-cli
```
[TypeScript](http://www.typescriptlang.org/)
```shell
npm install -g typescript
```
[Browser Sync](https://www.browsersync.io/)

[Jasmine](http://jasmine.github.io/)

## Get Starting
Note: All commands entered need to be performed from within *this directory*.

1. Clone this repo and install all dependencies

```shell
git clone https://github.com/wanoo21/OnePageApp.git
cd OnePageApp
npm install
```
2. Install jQuery ts dependency
```shell
npm install -g tsd
tsd install
```
3. Run your server in develompent mode
```shell
npm run-scripts run start-devp
```
Thats all!

## How to make changes
1. First, run `gulp` files watcher
```shell
gulp watch:all
```
2. If your server is not running, start it, in addiotional terminal tab
```shell
npm run-scripts run start-devp
```
3. Now, make your changes in `./devp` folder. 
4. Browser will refresh your page automatically with [Browser Sync](https://www.browsersync.io/).

## Testing
1. After a change, make test function in `./tests/test.spec.js`. Don't worry, you can test all your functions from `./devp/ts/*.ts` files.
2. Run test with [Jasmine](http://jasmine.github.io/).
```shell
npm test
```

## Production
1. Get your clean and full optimized project.
```shell
gulp get-production
```
In root folder, you must find a `./prod` folder, inside is your project! Yeah, cool, right?

## Configurations
All your configurations for development and production mode, you can find in `./config.json`. 
You can rewrite or add any other properties!
