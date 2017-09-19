# vitals [![npm version][badge]][npm]

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
flexibility of [node.js][nodejs] for your system administration, and to
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
Download the [main amd build][distamdmain] of vitals or pick a specific build
of vitals (e.g. only one method or section) from the vitals
[amd distributables tree][distamd].

<a name="install-browser"></a>
#### browser
Download the [main browser build][distbrowsermain] of vitals or pick a
specific build of vitals (e.g. only one method or section) from the vitals
[browser distributables tree][distbrowser].


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

|  Base Methods           |  Strict Methods         |  File System Methods    |  Information Methods    |  Process Methods        |  Special Parse Methods  |
| :---------------------: | :---------------------: | :---------------------: | :---------------------: | :---------------------: | :---------------------: |
| [bind][bind]            | [amend][amend]          | [cat][cat]              | [config][config]        | [exec][exec]            | [parsecmd][parsecmd]    |
| [concat][concat]        | [assign][assign]        | [cd][cd]                | [defaults][defaults]    | [exit][exit]            |                         |
| [copy][copy]            | [cap][cap]              | [ch][ch]                | [env][env]              | [run][run]              |                         |
| [cut][cut]              | [create][create]        | [cp][cp]                | [version][version]      |                         |                         |
| [each][each]            | [freeze][freeze]        | [ls][ls]                |                         |                         |                         |
| [fill][fill]            | [seal][seal]            | [mk][mk]                |                         |                         |                         |
| [filter][filter]        |                         | [mv][mv]                |                         |                         |                         |
| [has][has]              |                         | [resolve][resolve]      |                         |                         |                         |
| [insert][insert]        |                         | [rm][rm]                |                         |                         |                         |
| [invert][invert]        |                         | [tee][tee]              |                         |                         |                         |
| [is][is]                |                         | [test][test]            |                         |                         |                         |
| [join][join]            |                         |                         |                         |                         |                         |
| [keys][keys]            |                         |                         |                         |                         |                         |
| [match][match]          |                         |                         |                         |                         |                         |
| [merge][merge]          |                         |                         |                         |                         |                         |
| [owns][owns]            |                         |                         |                         |                         |                         |
| [pop][pop]              |                         |                         |                         |                         |                         |
| [push][push]            |                         |                         |                         |                         |                         |
| [remap][remap]          |                         |                         |                         |                         |                         |
| [replace][replace]      |                         |                         |                         |                         |                         |
| [rip][rip]              |                         |                         |                         |                         |                         |
| [roll][roll]            |                         |                         |                         |                         |                         |
| [sew][sew]              |                         |                         |                         |                         |                         |
| [slice][slice]          |                         |                         |                         |                         |                         |
| [split][split]          |                         |                         |                         |                         |                         |
| [strike][strike]        |                         |                         |                         |                         |                         |
| [to][to]                |                         |                         |                         |                         |                         |
| [trim][trim]            |                         |                         |                         |                         |                         |
| [unset][unset]          |                         |                         |                         |                         |                         |
| [until][until]          |                         |                         |                         |                         |                         |
| [yank][yank]            |                         |                         |                         |                         |                         |


|  Base Array Methods     |  Base Function Methods  |  Base Object Methods    |  Base String Methods    |
| :---------------------: | :---------------------: | :---------------------: | :---------------------: |
| [concat][concat]        | [bind][bind]            | [copy][copy]            | [copy][copy]            |
| [copy][copy]            | [copy][copy]            | [each][each]            | [cut][cut]              |
| [each][each]            | [each][each]            | [filter][filter]        | [insert][insert]        |
| [fill][fill]            | [filter][filter]        | [has][has]              | [invert][invert]        |
| [filter][filter]        | [has][has]              | [is][is]                | [is][is]                |
| [has][has]              | [is][is]                | [keys][keys]            | [match][match]          |
| [invert][invert]        | [keys][keys]            | [merge][merge]          | [replace][replace]      |
| [is][is]                | [merge][merge]          | [owns][owns]            | [sew][sew]              |
| [join][join]            | [owns][owns]            | [remap][remap]          | [slice][slice]          |
| [pop][pop]              | [remap][remap]          | [roll][roll]            | [split][split]          |
| [push][push]            | [roll][roll]            | [strike][strike]        | [to][to]                |
| [remap][remap]          | [strike][strike]        | [to][to]                | [trim][trim]            |
| [rip][rip]              | [to][to]                | [unset][unset]          | [yank][yank]            |
| [roll][roll]            | [unset][unset]          | [until][until]          |                         |
| [slice][slice]          | [until][until]          |                         |                         |
| [strike][strike]        |                         |                         |                         |
| [to][to]                |                         |                         |                         |
| [until][until]          |                         |                         |                         |

## Other Details

### Contributing
See the [contributing guideline][contribute].

### Bugs/Improvements
Open an [issue on GitHub][issue].

### Questions
Send an email to <dev@vitalsjs.com>.


<hr>

### Happy Developing

[vitals]: https://github.com/imaginate/vitals/wiki
[github]: https://github.com/imaginate/vitals
[npm]: https://www.npmjs.com/package/node-vitals
[travis]: https://travis-ci.org/imaginate/vitals
[badge]: https://img.shields.io/badge/npm-5.0.0--alpha-red.svg?style=flat
[status]: https://travis-ci.org/imaginate/vitals.svg?branch=master
[issue]: https://github.com/imaginate/vitals/issues
[license]: https://github.com/imaginate/vitals/blob/master/LICENSE.md
[contribute]: https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md
[distamd]: https://github.com/imaginate/vitals/tree/master/dist/amd
[distamdmain]: https://github.com/imaginate/vitals/blob/master/dist/amd/vitals.js
[distbrowser]: https://github.com/imaginate/vitals/tree/master/dist/browser
[distbrowsermain]: https://github.com/imaginate/vitals/blob/master/dist/browser/vitals.js

[base]: https://github.com/imaginate/vitals/wiki#user-content-api
[strict]: https://github.com/imaginate/vitals/wiki#user-content-api
[fs]: https://github.com/imaginate/vitals/wiki#user-content-api
[shell]: https://github.com/imaginate/vitals/wiki#user-content-api

[amend]: https://github.com/imaginate/vitals/wiki/vitals.amend
[assign]: https://github.com/imaginate/vitals/wiki/vitals.assign
[bind]: https://github.com/imaginate/vitals/wiki/vitals.bind
[cap]: https://github.com/imaginate/vitals/wiki/vitals.cap
[cat]: https://github.com/imaginate/vitals/wiki/vitals.cat
[cd]: https://github.com/imaginate/vitals/wiki/vitals.cd
[ch]: https://github.com/imaginate/vitals/wiki/vitals.ch
[concat]: https://github.com/imaginate/vitals/wiki/vitals.concat
[config]: https://github.com/imaginate/vitals/wiki/vitals.config
[copy]: https://github.com/imaginate/vitals/wiki/vitals.copy
[cp]: https://github.com/imaginate/vitals/wiki/vitals.cp
[create]: https://github.com/imaginate/vitals/wiki/vitals.create
[cut]: https://github.com/imaginate/vitals/wiki/vitals.cut
[defaults]: https://github.com/imaginate/vitals/wiki/vitals.defaults
[each]: https://github.com/imaginate/vitals/wiki/vitals.each
[env]: https://github.com/imaginate/vitals/wiki/vitals.env
[exec]: https://github.com/imaginate/vitals/wiki/vitals.exec
[exit]: https://github.com/imaginate/vitals/wiki/vitals.exit
[fill]: https://github.com/imaginate/vitals/wiki/vitals.fill
[filter]: https://github.com/imaginate/vitals/wiki/vitals.filter
[freeze]: https://github.com/imaginate/vitals/wiki/vitals.freeze
[has]: https://github.com/imaginate/vitals/wiki/vitals.has
[insert]: https://github.com/imaginate/vitals/wiki/vitals.insert
[invert]: https://github.com/imaginate/vitals/wiki/vitals.invert
[is]: https://github.com/imaginate/vitals/wiki/vitals.is
[is-types]: https://github.com/imaginate/vitals/wiki/vitals.is-types
[join]: https://github.com/imaginate/vitals/wiki/vitals.join
[keys]: https://github.com/imaginate/vitals/wiki/vitals.keys
[ls]: https://github.com/imaginate/vitals/wiki/vitals.ls
[match]: https://github.com/imaginate/vitals/wiki/vitals.match
[merge]: https://github.com/imaginate/vitals/wiki/vitals.merge
[mk]: https://github.com/imaginate/vitals/wiki/vitals.mk
[mv]: https://github.com/imaginate/vitals/wiki/vitals.mv
[owns]: https://github.com/imaginate/vitals/wiki/vitals.owns
[parsecmd]: https://github.com/imaginate/vitals/wiki/vitals.parsecmd
[pop]: https://github.com/imaginate/vitals/wiki/vitals.pop
[push]: https://github.com/imaginate/vitals/wiki/vitals.push
[remap]: https://github.com/imaginate/vitals/wiki/vitals.remap
[replace]: https://github.com/imaginate/vitals/wiki/vitals.replace
[resolve]: https://github.com/imaginate/vitals/wiki/vitals.resolve
[rip]: https://github.com/imaginate/vitals/wiki/vitals.rip
[rm]: https://github.com/imaginate/vitals/wiki/vitals.rm
[roll]: https://github.com/imaginate/vitals/wiki/vitals.roll
[run]: https://github.com/imaginate/vitals/wiki/vitals.run
[seal]: https://github.com/imaginate/vitals/wiki/vitals.seal
[sew]: https://github.com/imaginate/vitals/wiki/vitals.sew
[slice]: https://github.com/imaginate/vitals/wiki/vitals.slice
[split]: https://github.com/imaginate/vitals/wiki/vitals.split
[strike]: https://github.com/imaginate/vitals/wiki/vitals.strike
[tee]: https://github.com/imaginate/vitals/wiki/vitals.tee
[test]: https://github.com/imaginate/vitals/wiki/vitals.test
[to]: https://github.com/imaginate/vitals/wiki/vitals.to
[trim]: https://github.com/imaginate/vitals/wiki/vitals.trim
[unset]: https://github.com/imaginate/vitals/wiki/vitals.unset
[until]: https://github.com/imaginate/vitals/wiki/vitals.until
[version]: https://github.com/imaginate/vitals/wiki/vitals.version
[yank]: https://github.com/imaginate/vitals/wiki/vitals.yank

[addscript]: http://javascript.info/tutorial/adding-script-html#external-scripts
[cli]: https://en.wikipedia.org/wiki/Command-line_interface#Command-line_interpreter
[filesystem]: https://en.wikipedia.org/wiki/File_system
[functional]: https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4
[immutability]: https://en.wikipedia.org/wiki/Immutable_object
[nodejs]: https://nodejs.org
[overplus]: http://www.crockford.com/javascript/javascript.html
[strongtype]: https://en.wikipedia.org/wiki/Strong_and_weak_typing
[unequality]: http://whydoesitsuck.com/why-does-javascript-suck/
[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window

