# wrapify
Browserify transform to wrap a code block in whatever.

## Installation
```
npm install --save acoll/wrapify
```

**wrapify** lets you wrap an imported module with a little bit of code. 

## Usage
Via API
```js
var wrapify = require('wrapify');

bundle.transform(wrapify, {
    wrappers: [{
        pattern: '\\.jade',      // Regex used to match the filename
        prefix: '// BEGIN TEMPLATE: $filename', // Line attached to beginning of import.
        suffix: '// END TEMPLATE: $filename' // Line attached at end of import.
    }]
});
```

## Configuration
The wrappers configuration option is mandatory. It is an array of objects containing a pattern, prefix and suffix. The pattern is mandatory for obvious reasons. 

`$filename` is evaluated to the name of the file being transformed.

## Use Cases

### Wrapping templates in comments.
Just before my template transform ([jadeify][] usually) I use a wrapify transform to add a BEGIN and END comment that will wrap my html when rendered. For example passing the following jade:
```jade
p HELLO WORLD
a(href='#') CLICK ME
```
through browserify 
```js
bundle.transform(require('wrapify'), {
    wrappers: [{
        pattern: '\\.jade',      // Regex used to match the filename
        prefix: '// BEGIN TEMPLATE: $filename', // Line attached to beginning of import.
        suffix: '// END TEMPLATE: $filename' // Line attached at end of import.
    }]
});
bundle.transform(require('jadeify'));
```
and then executing the template function will result in 
```html
<!-- BEGIN TEMPLATE: awesome.jade -->
<p>HELLO WORLD</p>
<a href="#"> CLICK ME </a>
<!-- END TEMPLATE: awesome.jade -->
```

