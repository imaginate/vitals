# vitals [![npm version][v-badge]][v-npm]

#### Warning
This version of _vitals_ is still receiving **major changes**. Nothing shown
on this branch should be trusted until an official release is completed (i.e.
when this branch is merged into the master).

### Give Your JS Life
_vitals_ is a [functional][functional] JavaScript library designed to be at
the heart of all of your JS code. It is intended to replace almost all native
JavaScript interaction. It will improve your project's **readability**,
**stability**, and **performance**. It fixes core JS issues such as browser
compatibility, [+ overloading][overplus], and [unequal equality][unequality].
It allows you to easily add the power of [immutability][immutability] and
[strong typing][strongtype] to your projects, to utilize the comfort and
flexibility of [node.js][node] for your system administration, and to
identify the causes of those annoying bugs and glitches. At the core, _vitals_
just wants to make dealing with JavaScript easier and your life better!

#### Examples

```javascript
var life = '123abc345XYZ';

var v = require('@imaginate/vitals');
var i = v.yank.all(life, /[A-Z]/); // sets `i` to `[ "X", "Y", "Z" ]`
var t = v.sew('v', 5, life);       // sets `t` to `"v5123abc345XYZ"`
var a = v.cut(life, 3, /[a-z]/g);  // sets `a` to `"1245XYZ"`
var l = v.slice(life, -3, -1);     // sets `l` to `"XY"`
var s = v.replace(life, 3, 'w$&'); // sets `s` to `"12w3abc345XYZ"`

v.is('arr|str', i, t); // returns `true`
v.is.string(a, i);     // returns `true`
v.is.str(i, t)         // returns `false`

v.match.any(life, /^[A-Z]/, 1, 'Z'); // returns `true`
v.match(life, /^[A-Z]/, 1, 'Z');     // returns `false`

v.has(life, /[A-Z]/, 1, 'Z'); // returns `false`
v.has(life, 1, 'Z');          // returns `true`

v.is.same(1, '1');    // returns `false`
v.is.similar(1, '1'); // returns `true`

life = v.create(null, {
  'v': 1,
  'i': 2,
  't': 3,
  'a': 4,
  'l': 5
});

v.is.obj(life); // returns `true`

v.has(life, 1);    // returns `true`
v.has(life, 'v');  // returns `false`
v.owns(life, 'v'); // returns `true`

v.amend(life, 'v', {
  'enumerable': false
});

v.owns(life, 'v');      // returns `true`
v.owns.enum(life, 'v'); // returns `false`

v.assign(life, 's', 6, 'number'); // sets `life.s` to `6` with
                                  // strong type of `"number"`

life.s = 7;   // sets `life.v` to `7`
life.s = '8'; // throws a `TypeError`

// For this example each of the following variables will **always**
// be an instance of the *vitals* file wrapper class: `v.Fs`.
var fs, dir, file;

// For this example `path` will always be a primitive string.
var path;

path = v.resolve('path', '../to/dir'); // returns absolute path

path = '../dir/path';
dir = v.cd(path); // sets `process.cwd` to `v.resolve(path)`

v.is.str(dir);  // returns `false`
v.is.obj(dir);  // returns `true`
v.test.fs(dir); // returns `true`

v.is.same(v.cwd, dir); // returns `true`

dir = v.mk('../dir/path'); // returns new `v.Fs` instance
dir = v.mk.dir(dir);       // makes directory at `dir.abspath`

path = '../dir/path';
dir = v.mk.dir(path); // makes directory at `v.resolve(path)`

dir.isDirectory(); // returns `true`
dir.isSymlink();   // returns `false`
dir.isFile();      // returns `false`

v.test('f', dir);  // returns `false`
v.test('d', dir);  // returns `true`
v.test('d', path); // returns `true`
v.test('h', path); // returns `false`

v.test.f(path);   // returns `false`
v.test.d(dir);    // returns `true`
v.test.file(dir); // returns `false`
v.test.dir(path); // returns `true`

// note that all vitals *ls* methods return an array of `v.Fs` instances
v.ls();          // returns all immediate paths in `v.cwd.abspath`
v.ls(dir);       // returns all immediate paths in `dir.abspath`
v.ls(path);      // returns all immediate paths in `v.resolve(path)`
v.ls(true);      // returns all paths in `v.cwd.abspath`
v.ls(dir, true); // returns all paths in `dir.abspath`
v.ls.file(dir, { // returns all files with `".js"` extension in `dir.abspath`
  deep: true,
  ext: 'js'
});
```


<a name="install"></a>
## Install

<a name="install-node"></a>
#### node.js

```bash
npm install --save @imaginate/vitals
```

<a name="install-amd"></a>
#### amd
Download the [main amd build][vd-amd-main] of vitals or pick a specific build
of vitals (e.g. only one method or section) from the vitals
[amd distributables tree][vd-amd].

<a name="install-browser"></a>
#### browser
Download the [main browser build][vd-browser-main] of vitals or pick a
specific build of vitals (e.g. only one method or section) from the vitals
[browser distributables tree][vd-browser].


<a name="use"></a>
## Use

<a name="use-node"></a>
#### node.js

```javascript
var vitals = require('@imaginate/vitals');
```

<a name="use-amd"></a>
#### amd

```javascript
require([ 'vitals' ], function(null) {
  // ...
});
```

<a name="use-browser"></a>
#### browser

```html
<script src="downloaded/path/to/vitals.js"></script>
<script>var vitals = window.vitals;</script>
```

For help see:
- [adding a script to html][addscript]
- [understanding the window object][window]


## API

|  Base Methods           |  Strict Methods         |  File System Methods    |  Information Methods    |  Process Methods        |  Special Methods        |
| :---------------------: | :---------------------: | :---------------------: | :---------------------: | :---------------------: | :---------------------: |
| [bind][vm-bind]         | [amend][vm-amend]       | [cat][vm-cat]           | [config][vm-config]     | [exec][vm-exec]         | [parsecmd][vm-parsecmd] |
| [concat][vm-concat]     | [assign][vm-assign]     | [cd][vm-cd]             | [defaults][vm-defaults] | [exit][vm-exit]         |                         |
| [copy][vm-copy]         | [cap][vm-cap]           | [ch][vm-ch]             | [env][vm-env]           | [run][vm-run]           |                         |
| [cut][vm-cut]           | [create][vm-create]     | [cp][vm-cp]             | [version][vm-version]   |                         |                         |
| [each][vm-each]         | [freeze][vm-freeze]     | [ls][vm-ls]             |                         |                         |                         |
| [fill][vm-fill]         | [seal][vm-seal]         | [mk][vm-mk]             |                         |                         |                         |
| [filter][vm-filter]     |                         | [mv][vm-mv]             |                         |                         |                         |
| [has][vm-has]           |                         | [resolve][vm-resolve]   |                         |                         |                         |
| [insert][vm-insert]     |                         | [rm][vm-rm]             |                         |                         |                         |
| [invert][vm-invert]     |                         | [tee][vm-tee]           |                         |                         |                         |
| [is][vm-is]             |                         | [test][vm-test]         |                         |                         |                         |
| [join][vm-join]         |                         |                         |                         |                         |                         |
| [keys][vm-keys]         |                         |                         |                         |                         |                         |
| [match][vm-match]       |                         |                         |                         |                         |                         |
| [merge][vm-merge]       |                         |                         |                         |                         |                         |
| [owns][vm-owns]         |                         |                         |                         |                         |                         |
| [pop][vm-pop]           |                         |                         |                         |                         |                         |
| [push][vm-push]         |                         |                         |                         |                         |                         |
| [remap][vm-remap]       |                         |                         |                         |                         |                         |
| [replace][vm-replace]   |                         |                         |                         |                         |                         |
| [rip][vm-rip]           |                         |                         |                         |                         |                         |
| [roll][vm-roll]         |                         |                         |                         |                         |                         |
| [sew][vm-sew]           |                         |                         |                         |                         |                         |
| [slice][vm-slice]       |                         |                         |                         |                         |                         |
| [split][vm-split]       |                         |                         |                         |                         |                         |
| [strike][vm-strike]     |                         |                         |                         |                         |                         |
| [to][vm-to]             |                         |                         |                         |                         |                         |
| [trim][vm-trim]         |                         |                         |                         |                         |                         |
| [unset][vm-unset]       |                         |                         |                         |                         |                         |
| [until][vm-until]       |                         |                         |                         |                         |                         |
| [yank][vm-yank]         |                         |                         |                         |                         |                         |


|  Base Array Methods     |  Base Function Methods  |  Base Object Methods    |  Base String Methods    |
| :---------------------: | :---------------------: | :---------------------: | :---------------------: |
| [concat][vm-concat]     | [bind][vm-bind]         | [copy][vm-copy]         | [copy][vm-copy]         |
| [copy][vm-copy]         | [copy][vm-copy]         | [each][vm-each]         | [cut][vm-cut]           |
| [each][vm-each]         | [each][vm-each]         | [filter][vm-filter]     | [insert][vm-insert]     |
| [fill][vm-fill]         | [filter][vm-filter]     | [has][vm-has]           | [invert][vm-invert]     |
| [filter][vm-filter]     | [has][vm-has]           | [is][vm-is]             | [is][vm-is]             |
| [has][vm-has]           | [is][vm-is]             | [keys][vm-keys]         | [match][vm-match]       |
| [invert][vm-invert]     | [keys][vm-keys]         | [merge][vm-merge]       | [replace][vm-replace]   |
| [is][vm-is]             | [merge][vm-merge]       | [owns][vm-owns]         | [sew][vm-sew]           |
| [join][vm-join]         | [owns][vm-owns]         | [remap][vm-remap]       | [slice][vm-slice]       |
| [pop][vm-pop]           | [remap][vm-remap]       | [roll][vm-roll]         | [split][vm-split]       |
| [push][vm-push]         | [roll][vm-roll]         | [strike][vm-strike]     | [to][vm-to]             |
| [remap][vm-remap]       | [strike][vm-strike]     | [to][vm-to]             | [trim][vm-trim]         |
| [rip][vm-rip]           | [to][vm-to]             | [unset][vm-unset]       | [yank][vm-yank]         |
| [roll][vm-roll]         | [unset][vm-unset]       | [until][vm-until]       |                         |
| [slice][vm-slice]       | [until][vm-until]       |                         |                         |
| [strike][vm-strike]     |                         |                         |                         |
| [to][vm-to]             |                         |                         |                         |
| [until][vm-until]       |                         |                         |                         |

## Other Details

### Contributing
See the [contributing guideline][v-contribute].

### Bugs/Improvements
Open an [issue on GitHub][v-issue].

### Questions
Send an email to <dev@vitalsjs.com>.


<hr>

### Happy Developing

[v]: https://github.com/imaginate/vitals
[v-docs]: https://github.com/imaginate/vitals/wiki
[v-wiki]: https://github.com/imaginate/vitals/wiki
[v-github]: https://github.com/imaginate/vitals
[v-npm]: https://www.npmjs.com/package/node-vitals
[v-travis]: https://travis-ci.org/imaginate/vitals
[v-badge]: https://img.shields.io/badge/npm-5.0.0--alpha-red.svg?style=flat
[v-status]: https://travis-ci.org/imaginate/vitals.svg?branch=master
[v-issue]: https://github.com/imaginate/vitals/issues
[v-license]: https://github.com/imaginate/vitals/blob/master/LICENSE.md
[v-contribute]: https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md

[vd-amd]: https://github.com/imaginate/vitals/tree/master/dist/amd
[vd-amd-main]: https://github.com/imaginate/vitals/blob/master/dist/amd/vitals.js
[vd-browser]: https://github.com/imaginate/vitals/tree/master/dist/browser
[vd-browser-main]: https://github.com/imaginate/vitals/blob/master/dist/browser/vitals.js
[vd-node]: https://github.com/imaginate/vitals/tree/master/dist/node
[vd-node-main]: https://github.com/imaginate/vitals/blob/master/dist/node/vitals.js

[vs-base]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-strict]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-fs]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-info]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-proc]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-special]: https://github.com/imaginate/vitals/wiki#user-content-api

[vs-base-arr]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-base-fun]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-base-obj]: https://github.com/imaginate/vitals/wiki#user-content-api
[vs-base-str]: https://github.com/imaginate/vitals/wiki#user-content-api

[vm-amend]: https://github.com/imaginate/vitals/wiki/vitals.amend
[vm-assign]: https://github.com/imaginate/vitals/wiki/vitals.assign
[vm-bind]: https://github.com/imaginate/vitals/wiki/vitals.bind
[vm-cap]: https://github.com/imaginate/vitals/wiki/vitals.cap
[vm-cat]: https://github.com/imaginate/vitals/wiki/vitals.cat
[vm-cd]: https://github.com/imaginate/vitals/wiki/vitals.cd
[vm-ch]: https://github.com/imaginate/vitals/wiki/vitals.ch
[vm-concat]: https://github.com/imaginate/vitals/wiki/vitals.concat
[vm-config]: https://github.com/imaginate/vitals/wiki/vitals.config
[vm-copy]: https://github.com/imaginate/vitals/wiki/vitals.copy
[vm-cp]: https://github.com/imaginate/vitals/wiki/vitals.cp
[vm-create]: https://github.com/imaginate/vitals/wiki/vitals.create
[vm-cut]: https://github.com/imaginate/vitals/wiki/vitals.cut
[vm-defaults]: https://github.com/imaginate/vitals/wiki/vitals.defaults
[vm-each]: https://github.com/imaginate/vitals/wiki/vitals.each
[vm-env]: https://github.com/imaginate/vitals/wiki/vitals.env
[vm-exec]: https://github.com/imaginate/vitals/wiki/vitals.exec
[vm-exit]: https://github.com/imaginate/vitals/wiki/vitals.exit
[vm-fill]: https://github.com/imaginate/vitals/wiki/vitals.fill
[vm-filter]: https://github.com/imaginate/vitals/wiki/vitals.filter
[vm-freeze]: https://github.com/imaginate/vitals/wiki/vitals.freeze
[vm-has]: https://github.com/imaginate/vitals/wiki/vitals.has
[vm-insert]: https://github.com/imaginate/vitals/wiki/vitals.insert
[vm-invert]: https://github.com/imaginate/vitals/wiki/vitals.invert
[vm-is]: https://github.com/imaginate/vitals/wiki/vitals.is
[vm-is-types]: https://github.com/imaginate/vitals/wiki/vitals.is-types
[vm-join]: https://github.com/imaginate/vitals/wiki/vitals.join
[vm-keys]: https://github.com/imaginate/vitals/wiki/vitals.keys
[vm-ls]: https://github.com/imaginate/vitals/wiki/vitals.ls
[vm-match]: https://github.com/imaginate/vitals/wiki/vitals.match
[vm-merge]: https://github.com/imaginate/vitals/wiki/vitals.merge
[vm-mk]: https://github.com/imaginate/vitals/wiki/vitals.mk
[vm-mv]: https://github.com/imaginate/vitals/wiki/vitals.mv
[vm-owns]: https://github.com/imaginate/vitals/wiki/vitals.owns
[vm-parsecmd]: https://github.com/imaginate/vitals/wiki/vitals.parsecmd
[vm-pop]: https://github.com/imaginate/vitals/wiki/vitals.pop
[vm-push]: https://github.com/imaginate/vitals/wiki/vitals.push
[vm-remap]: https://github.com/imaginate/vitals/wiki/vitals.remap
[vm-replace]: https://github.com/imaginate/vitals/wiki/vitals.replace
[vm-resolve]: https://github.com/imaginate/vitals/wiki/vitals.resolve
[vm-rip]: https://github.com/imaginate/vitals/wiki/vitals.rip
[vm-rm]: https://github.com/imaginate/vitals/wiki/vitals.rm
[vm-roll]: https://github.com/imaginate/vitals/wiki/vitals.roll
[vm-run]: https://github.com/imaginate/vitals/wiki/vitals.run
[vm-seal]: https://github.com/imaginate/vitals/wiki/vitals.seal
[vm-sew]: https://github.com/imaginate/vitals/wiki/vitals.sew
[vm-slice]: https://github.com/imaginate/vitals/wiki/vitals.slice
[vm-split]: https://github.com/imaginate/vitals/wiki/vitals.split
[vm-strike]: https://github.com/imaginate/vitals/wiki/vitals.strike
[vm-tee]: https://github.com/imaginate/vitals/wiki/vitals.tee
[vm-test]: https://github.com/imaginate/vitals/wiki/vitals.test
[vm-to]: https://github.com/imaginate/vitals/wiki/vitals.to
[vm-trim]: https://github.com/imaginate/vitals/wiki/vitals.trim
[vm-unset]: https://github.com/imaginate/vitals/wiki/vitals.unset
[vm-until]: https://github.com/imaginate/vitals/wiki/vitals.until
[vm-version]: https://github.com/imaginate/vitals/wiki/vitals.version
[vm-yank]: https://github.com/imaginate/vitals/wiki/vitals.yank

[addscript]: http://javascript.info/tutorial/adding-script-html#external-scripts
[cli]: https://en.wikipedia.org/wiki/Command-line_interface#Command-line_interpreter
[fs]: https://en.wikipedia.org/wiki/File_system
[functional]: https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4
[immutability]: https://en.wikipedia.org/wiki/Immutable_object
[node]: https://nodejs.org
[overplus]: http://www.crockford.com/javascript/javascript.html
[strongtype]: https://en.wikipedia.org/wiki/Strong_and_weak_typing
[unequality]: http://whydoesitsuck.com/why-does-javascript-suck/
[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window

