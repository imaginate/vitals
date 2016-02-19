# vitals [![build status](https://travis-ci.org/imaginate/vitals.svg?branch=master)](https://travis-ci.org/imaginate/vitals) [![npm version](https://img.shields.io/badge/npm-4.0.0-brightgreen.svg?style=flat)](https://www.npmjs.com/package/node-vitals)
### Give Your JS Life
_vitals_ is a foundational JavaScript library designed to replace all native string, object and array methods with just 16 [base methods](#api). It will improve your project's **readability**, **stability** and **performance**. It fixes core JS issues such as [+ overloading](http://www.crockford.com/javascript/javascript.html) and [unequal equality](http://whydoesitsuck.com/why-does-javascript-suck/). Its additional methods will also allow you to more efficiently utilize [immutability](https://en.wikipedia.org/wiki/Immutable_object), [strong typing](https://en.wikipedia.org/wiki/Strong_and_weak_typing), and [node.js](https://nodejs.org) interactions with the [file system](https://en.wikipedia.org/wiki/File_system) or [shell](https://en.wikipedia.org/wiki/Command-line_interface#Command-line_interpreter). Built with **simplicity** _vitals_ hopes to inspire you to use [functional JavaScript](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4) as the bedrock for all of your projects!

#### Own That String
```javascript
// every vitals method handles multiple operations
//   if you give it an array it goes one way
//     give it an object it goes another
//       watch it own stringy things

var v, i, t, a, l, s;
var functional, life;

life = '123abc345XYZ';
v = require('node-vitals')('base');
i = v.cut(life, 3, /[a-z]/g); // "1245XYZ"
t = v.remap(life, 3, 'w$&');  // "12w3abcw345XYZ"
a = v.slice(life, -3, -1);    // "XY"
l = v.get(life, /[A-Z]/);     // [ "X", "Y", "Z" ]
s = v.fuse('v', life);        // "v123abc345XYZ"
v.has(life, 'Z');             // true
v.is('str|bool', i, t, a, l); // true
v.is.str(i, t, a, l);         // false
l = v.to.str(l, '~');         // "X~Y~Z"
v.is.str(i, t, a, l);         // true

// goodbye confusing equality, hello simplicity
var same = require('node-vitals')('same');
var v =  1;
var _ = '1';
same.ish(v, _); // true
same(v, _);     // false
```


## Install & Use
#### node.js
- ``` npm install node-vitals ```
- ``` var vitals = require('node-vitals')([...method|section]) ```

#### browser
- download [vitals.min.js](https://github.com/imaginate/vitals/blob/master/src/browser/vitals.min.js)
- ``` <script src="vitals.min.js"></script> ``` ([add to html](http://javascript.info/tutorial/adding-script-html#external-scripts))
- ``` vitals.<method> ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))

#### amd
- download [vitals.min.js](https://github.com/imaginate/vitals/blob/master/src/browser/vitals.min.js)
- ``` require([ 'vitals' ], function(null) { ... }) ```
- ``` vitals.<method> ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))


## API
| Base Methods                                                   | Strict Methods                                                   | File System Methods                                          | Shell Methods                                              |
| :------------------------------------------------------------: | :--------------------------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------------------: |
| bind*                                                          | [amend](https://github.com/imaginate/vitals/wiki/vitals.amend)   | [copy](https://github.com/imaginate/vitals/wiki/vitals.copy) | [run](https://github.com/imaginate/vitals/wiki/vitals.run) |
| [copy](https://github.com/imaginate/vitals/wiki/vitals.copy)   | cap*                                                             | cut*                                                         |                                                            |
| [cut](https://github.com/imaginate/vitals/wiki/vitals.cut)     | [create](https://github.com/imaginate/vitals/wiki/vitals.create) | [get](https://github.com/imaginate/vitals/wiki/vitals.get)   |                                                            |
| [each](https://github.com/imaginate/vitals/wiki/vitals.each)   | [freeze](https://github.com/imaginate/vitals/wiki/vitals.freeze) | [to](https://github.com/imaginate/vitals/wiki/vitals.to)     |                                                            |
| [fill](https://github.com/imaginate/vitals/wiki/vitals.fill)   | [seal](https://github.com/imaginate/vitals/wiki/vitals.seal)     |                                                              |                                                            |
| [fuse](https://github.com/imaginate/vitals/wiki/vitals.fuse)   |                                                                  |                                                              |                                                            |
| [get](https://github.com/imaginate/vitals/wiki/vitals.get)     |                                                                  |                                                              |                                                            |
| [has](https://github.com/imaginate/vitals/wiki/vitals.has)     |                                                                  |                                                              |                                                            |
| [is](https://github.com/imaginate/vitals/wiki/vitals.is)       |                                                                  |                                                              |                                                            |
| [remap](https://github.com/imaginate/vitals/wiki/vitals.remap) |                                                                  |                                                              |                                                            |
| [roll](https://github.com/imaginate/vitals/wiki/vitals.roll)   |                                                                  |                                                              |                                                            |
| [same](https://github.com/imaginate/vitals/wiki/vitals.same)   |                                                                  |                                                              |                                                            |
| [slice](https://github.com/imaginate/vitals/wiki/vitals.slice) |                                                                  |                                                              |                                                            |
| [to](https://github.com/imaginate/vitals/wiki/vitals.to)       |                                                                  |                                                              |                                                            |
| trim*                                                          |                                                                  |                                                              |                                                            |
| [until](https://github.com/imaginate/vitals/wiki/vitals.until) |                                                                  |                                                              |                                                            |
\* Scheduled for future release.


## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/vitals/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
