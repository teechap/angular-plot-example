### What is this?
This is a simple app to demonstrate d3 working in an angular directive. It was scaffolded using the [Yeoman](http://yeoman.io/) generator [gulp-angular](https://github.com/Swiip/generator-gulp-angular).

### Features
1. The app displays a bar graph as well as a table of names and their frequencies.
2. Clicking a name in the table highlights the corresponding bar in the graph.
3. Typing names in the input field (e.g. `john steve noah jaden`) displays matching bars on the graph and removes all other bars. It also filters users in the table. Removing the input text restores all bars and table rows.

### Getting started guide
1. `git clone` this repo
2. `npm install` and `bower install` the dependencies
3. `gulp serve` to see the visualization at `localhost:3000`
4. `gulp test` to run tests. Jslint will complain, but the tests are passing.
