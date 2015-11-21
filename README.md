# vitals
### Give Your JS Life
A JavaScript utility library designed for **elegance**, **performance**, and **reliability**. Its [base methods](#js-methods) attempt to reduce all of the JavaScript functionality that you need to only 20 methods (its at 10 right now). It also contains [strict methods](#js-methods) that give you more control over object states (e.g. [setting static type properties](https://github.com/imaginate/vitals/blob/master/methods/amend.js#L60-72)), and [node methods](#node-methods) that make it easy for you to write powerful [node.js](https://nodejs.org) build scripts. It works with all JavaScript engines and in all browsers. It simply makes JavaScript better!


## Example
#### Own That String
```javascript
// append each base vitals method to the global object
require('node-vitals')(2, 'base');

var v, i, t, a, l, s;
var life;

life = '123abc345XYZ';
v = slice(life, -3, -1); // "XY"
i = fill(4, '+>'); // "+>+>+>+>"
t = cut(life, 1, 2, 3, /[a-z]/g); // "45XYZ"
a = has(life, 'Z') ? 'life has it' : 'meh'; // "life has it"
l = remap(life, /[0-9]/, '0$&'); // "0123abc345XYZ"
s = get(life, /[A-Z]/).join('~'); // "X~Y~Z"
```

## Install & Use
#### node.js
- ``` npm install node-vitals ```
- ``` var vitals = require('node-vitals')([makeGlobal][, ...methods]) ```

#### browser
- download [vitals.min.js](https://github.com/imaginate/vitals/blob/master/src/browser/vitals.min.js)
- ``` <script src="vitals.min.js"></script> ``` ([add to html](http://javascript.info/tutorial/adding-script-html#external-scripts))
- ``` vitals.<method> ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))

#### amd
- download [vitals.min.js](https://github.com/imaginate/vitals/blob/master/src/browser/vitals.min.js)
- ``` require([ 'vitals' ], function(null) { ... }) ```
- ``` vitals.<method> ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))


## JS Methods
Base Methods                                                              | Strict Methods
:-----------------------------------------------------------------------: | :-------------------------------------------------------------------------:
[clone](https://github.com/imaginate/vitals/blob/master/methods/clone.js) | [amend](https://github.com/imaginate/vitals/blob/master/methods/amend.js)
[cut](https://github.com/imaginate/vitals/blob/master/methods/cut.js)     | [create](https://github.com/imaginate/vitals/blob/master/methods/create.js)
[each](https://github.com/imaginate/vitals/blob/master/methods/each.js)   | [freeze](https://github.com/imaginate/vitals/blob/master/methods/freeze.js)
[fill](https://github.com/imaginate/vitals/blob/master/methods/fill.js)   | [seal](https://github.com/imaginate/vitals/blob/master/methods/seal.js)
[fuse](https://github.com/imaginate/vitals/blob/master/methods/fuse.js)   | 
[get](https://github.com/imaginate/vitals/blob/master/methods/get.js)     | 
[has](https://github.com/imaginate/vitals/blob/master/methods/has.js)     | 
[remap](https://github.com/imaginate/vitals/blob/master/methods/remap.js) | 
[slice](https://github.com/imaginate/vitals/blob/master/methods/slice.js) | 
[until](https://github.com/imaginate/vitals/blob/master/methods/until.js) | 


## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/vitals/issues)<br>
**questions:** learn@algorithmiv.com<br>


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>