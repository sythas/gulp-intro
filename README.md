#Introduction to Gulp

[example application](http://sythas.github.io/gulp-intro/)

###Overview

Gulp automates the entire development process. It is run from the command line and can handle any amount of tasking. Gulp is typically setup to:

* Run a development web server for instant feedback on any changes.
* Watch files for changes and update the web server pages
* Run unit tests.
* Process source files into a final build for distribution, including catting source files into a single file and minimizing.
* Maybe some other things that you find useful.

Gulp runs under node.js and relies on NPM. In addition, Bower.js will be used to manage javascript library dependencies. One could use NPM for everything, but I like the logical separation I get by putting my project dependencies in Bower. So for this to all work we need:

* Node.js installed.
* GIT installed (for Bower)
* npm install -g bower
* npm install -g browser-sync
* npm install -g gulp

A normal day's work-flow would be to start in a terminal or command processor, CD into the project folder, run >gulp↩. This is a one-time startup – open a code editor and go to work – changes are pushed all the way through the build flow and, almost instantly, displayed in a browser(s) as soon as a watched file is saved. For all this to work, a project needs some kind of file structure.

###Typical Project Folder

* dev
* project
* bower_components
* node_modules
* build
* src
* bower.json
* package.json
* gulpfile.js

###Initializing a Project

NPM and BOWER can rebuild the entire dependency structure from their JSON files so only src, bower.json, package.json, and gulpfile.js will be checked into source control. With these files in place, 

```bash
$ npm install↩
$ bower install↩ 
```

will rebuild the entire project (this can take a bit of time depending on internet bandwidth). Projects are easy to share – just zip up bower.json, npm.json, gulp.js (optionally), and src.

Changing Dependencies
Project library dependencies (like jQuery & Angular) are installed or removed:  

```bash
$ bower install library-package-name –-save↩ 
$ bower uninstall library-package-name –-save↩ 
```

Gulp plugins and other dev dependencies are installed or removed: 

```bash
$ npm install package-name –-save-dev↩
$ npm remove package-name –-save-dev↩
```

###How Gulp Works

A bunch of tasks that can be run individually

```bash
$ gulp taskname↩
```

Plug-ins for tasks
A default task typically containing a list of tasks to run

```bash
$ gulp↩
```

Each task can chain multiple plug-ins together, piping each result to the next plug-in. Tasks can be run individually, or combined into one default build task. Running tasks individually is useful for testing both the gulp environment, and each task.
Typically, though, all the necessary tasks to build a project will be combined into one 'default' task.

Example: [gulpfile.js](https://github.com/sythas/gulp-intro/blob/master/gulpfile.js)

###Conclusions

Gulp creates a simple, powerful dev platform. Decide on a project file structure, install the gulp plug-ins that are pretty much universal, install the JS libraries used in most projects, create gulpfile.js, save this as a default project structure. Creating and testing the first gulpfile.js is a substantial task, but once finished, it can be used over again on all new projects with maybe only very minor tweaking.

Create new projects by simply copying this default into a new project folder. Add any needed gulp plugins, remove unneeded gulp plug-ins. Add any needed javascript libraries, remove unneeded javascript libraries.  Run >gulp↩  and start coding.
Passing a new project around a team is as simple as passing the src folder along with the package.json, the bower.json, and, optionally, the gulpfile.js (most developers have their own gulpfile.js).