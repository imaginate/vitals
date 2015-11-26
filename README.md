# vitals
### Give Your JS Life
A JavaScript utility library designed for **elegance**, **performance**, and **reliability**. Its [base methods](#base-methods) give you all of the basic JavaScript functionality and more (100+ actions) with only 12 methods. It also contains [strict methods](#strict-methods) that give you more control over object states (such as [setting static type properties](https://github.com/imaginate/vitals/blob/38f306f2ee/src/methods/amend.js#L60-L72)), and a combination of [file system](#file-system-methods) and [shell methods](#shell-methods) that make it easy for you to write powerful [node.js](https://nodejs.org) build scripts. It works with all JavaScript engines and in all browsers. It simply makes JavaScript better!


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

<br>
## All Methods
| [Base Methods](#base-methods) | [Strict Methods](#strict-methods) | [File System](#file-system-methods) | [Shell Methods](#shell-methods) |
| :---------------------------: | :-------------------------------: | :---------------------------------: | :-----------------------------: |
| [copy](#vitalscopy)           | [amend](#vitalsamend)             | [copy](#fs-vitalscopy)              | [run](#vitalsrun)               |
| [cut](#vitalscut)             | cap*                              | [get](#fs-vitalsget)                |                                 |
| [each](#vitalseach)           | [create](#vitalscreate)           | [to](#fs-vitalsto)                  |                                 |
| [fill](#vitalsfill)           | [freeze](#vitalsfreeze)           |                                     |                                 |
| [fuse](#vitalsfuse)           | [seal](#vitalsseal)               |                                     |                                 |
| [get](#vitalsget)             |                                   |                                     |                                 |
| [has](#vitalshas)             |                                   |                                     |                                 |
| [remap](#vitalsremap)         |                                   |                                     |                                 |
| [slice](#vitalsslice)         |                                   |                                     |                                 |
| to*                           |                                   |                                     |                                 |
| trim*                         |                                   |                                     |                                 |
| [until](#vitalsuntil)         |                                   |                                     |                                 |
\* Scheduled for future release.


## Base Methods
All base methods give you the maximum possible coverage within their main method by executing a type check on each argument and reacting accordingly. Two possible downsides to this approach are some developers may find using the same methods for different data types confusing and some projects may need a stricter type check (i.e. throw an error if any different data type is used). Additionally not all circumstances can be covered within the main method. As a result every method includes a list of sub methods that accomplish further clarity, strictness, and functionality.

#### vitals.copy
| Documentation                                                                                      | Examples                                                                                            | Alias         |
| :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------------ |
| [copy](https://github.com/imaginate/vitals/blob/bce79cdd22/src/methods/copy.js#L47-L53)            | [copy](https://github.com/imaginate/vitals/blob/master/test/methods/copy/copy.js)                   |               |
| [copy.object](https://github.com/imaginate/vitals/blob/bce79cdd22/src/methods/copy.js#L69-L74)     | [copy.object](https://github.com/imaginate/vitals/blob/master/test/methods/copy/copy.object.js)     | copy.obj      |
| [copy.array](https://github.com/imaginate/vitals/blob/bce79cdd22/src/methods/copy.js#L86-L92)      | [copy.array](https://github.com/imaginate/vitals/blob/master/test/methods/copy/copy.array.js)       | copy.arr/args |
| [copy.regexp](https://github.com/imaginate/vitals/blob/bce79cdd22/src/methods/copy.js#L105-L111)   | [copy.regexp](https://github.com/imaginate/vitals/blob/master/test/methods/copy/copy.regexp.js)     | copy.re/regex |
| [copy.function](https://github.com/imaginate/vitals/blob/bce79cdd22/src/methods/copy.js#L123-L131) | [copy.function](https://github.com/imaginate/vitals/blob/master/test/methods/copy/copy.function.js) | copy.fn/func  |

#### vitals.cut
| Documentation                                                                                      | Examples                                                                                             | Alias     |
| :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-------- |
| [cut](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L52-L91)              | [cut](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.js)                       |           |
| [cut.property](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L118-L151)   | [cut.property](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.property.js)     | cut.prop  |
| [cut.key](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L171-L178)        | [cut.key](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.key.js)               |           |
| [cut.index](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L187-L196)      | [cut.index](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.index.js)           | cut.i     |
| [cut.type](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L210-L222)       | [cut.type](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.type.js)             |           |
| [cut.value](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L242-L249)      | [cut.value](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.value.js)           | cut.val   |
| [cut.pattern](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L261-L268)    | [cut.pattern](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.pattern.js)       |           |
| [cut.properties](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L277-L299) | [cut.properties](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.properties.js) | cut.props |
| [cut.keys](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L312-L320)       | [cut.keys](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.keys.js)             |           |
| [cut.indexes](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L330-L338)    | [cut.indexes](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.indexes.js)       | cut.ii    |
| [cut.values](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L360-L368)     | [cut.values](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.values.js)         | cut.vals  |
| [cut.patterns](https://github.com/imaginate/vitals/blob/41a3bb3479/src/methods/cut.js#L381-L389)   | [cut.patterns](https://github.com/imaginate/vitals/blob/master/test/methods/cut/cut.patterns.js)     |           |
| 
#### vitals.each
| Documentation                                                                                   | Examples                                                                                        | Alias     |
| :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :-------- |
| [each](https://github.com/imaginate/vitals/blob/e9001ac60c/src/methods/each.js#L41-L53)         | [each](https://github.com/imaginate/vitals/blob/master/test/methods/each/each.js)               |           |
| [each.object](https://github.com/imaginate/vitals/blob/e9001ac60c/src/methods/each.js#L71-L84)  | [each.object](https://github.com/imaginate/vitals/blob/master/test/methods/each/each.object.js) | each.obj  |
| [each.array](https://github.com/imaginate/vitals/blob/e9001ac60c/src/methods/each.js#L96-L108)  | [each.array](https://github.com/imaginate/vitals/blob/master/test/methods/each/each.array.js)   | each.arr  |
| [each.cycle](https://github.com/imaginate/vitals/blob/e9001ac60c/src/methods/each.js#L121-L127) | [each.cycle](https://github.com/imaginate/vitals/blob/master/test/methods/each/each.cycle.js)   | each.time |

#### vitals.fill
| Documentation                                                                                    | Examples                                                                                        | Alias    |
| :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------- |
| [fill](https://github.com/imaginate/vitals/blob/f621c1cb56/src/methods/fill.js#L41-L54)          | [fill](https://github.com/imaginate/vitals/blob/master/test/methods/fill/fill.js)               |          |
| [fill.object](https://github.com/imaginate/vitals/blob/f621c1cb56/src/methods/fill.js#L87-L97)   | [fill.object](https://github.com/imaginate/vitals/blob/master/test/methods/fill/fill.object.js) | fill.obj |
| [fill.array](https://github.com/imaginate/vitals/blob/f621c1cb56/src/methods/fill.js#L115-L123)  | [fill.array](https://github.com/imaginate/vitals/blob/master/test/methods/fill/fill.array.js)   | fill.arr |
| [fill.string](https://github.com/imaginate/vitals/blob/f621c1cb56/src/methods/fill.js#L139-L145) | [fill.string](https://github.com/imaginate/vitals/blob/master/test/methods/fill/fill.string.js) | fill.str |

#### vitals.fuse
| Documentation                                                                                    | Examples                                                                                        | Alias    |
| :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------- |
| [fuse](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/fuse.js#L42-L60)          | [fuse](https://github.com/imaginate/vitals/blob/master/test/methods/fuse/fuse.js)               |          |
| [fuse.object](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/fuse.js#L86-L98)   | [fuse.object](https://github.com/imaginate/vitals/blob/master/test/methods/fuse/fuse.object.js) | fuse.obj |
| [fuse.array](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/fuse.js#L110-L118)  | [fuse.array](https://github.com/imaginate/vitals/blob/master/test/methods/fuse/fuse.array.js)   | fuse.arr |
| [fuse.string](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/fuse.js#L136-L142) | [fuse.string](https://github.com/imaginate/vitals/blob/master/test/methods/fuse/fuse.string.js) | fuse.str |

#### vitals.get
| Documentation                                                                                        | Examples                                                                                                 | Alias          |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------- |
| [get](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L48-L67)                | [get](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.js)                           |                |
| [get.keys](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L90-L100)          | [get.keys](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.keys.js)                 |                |
| [get.keys.byKey](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L112-L120)   | [get.keys.byKey](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.keys.byKey.js)     |                |
| [get.keys.byValue](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L129-L135) | [get.keys.byValue](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.keys.byValue.js) | get.keys.byVal |
| [get.indexes](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L146-L159)      | [get.indexes](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.indexes.js)           | get.ii         |
| [get.values](https://github.com/imaginate/vitals/blob/46496fb1c1/src/methods/get.js#L177-L190)       | [get.values](https://github.com/imaginate/vitals/blob/master/test/methods/get/get.values.js)             | get.vals       |

#### vitals.has
| Documentation                                                                                      | Examples                                                                                             | Alias      |
| :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------- |
| [has](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L50-L62)              | [has](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.js)                       |            |
| [has.key](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L76-L82)          | [has.key](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.key.js)               |            |
| [has.value](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L94-L100)       | [has.value](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.value.js)           | has.val    |
| [has.pattern](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L114-L120)    | [has.pattern](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.pattern.js)       |            |
| [has.substring](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L129-L135)  | [has.substring](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.substring.js)   | has.substr |
| [has.enumerable](https://github.com/imaginate/vitals/blob/af3eba39d1/src/methods/has.js#L146-L152) | [has.enumerable](https://github.com/imaginate/vitals/blob/master/test/methods/has/has.enumerable.js) | has.enum   |

#### vitals.remap
| Documentation                                                                                      | Examples                                                                                           | Alias     |
| :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :-------- |
| [remap](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/remap.js#L41-L69)          | [remap](https://github.com/imaginate/vitals/blob/master/test/methods/remap/remap.js)               |           | 
| [remap.object](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/remap.js#L90-L105)  | [remap.object](https://github.com/imaginate/vitals/blob/master/test/methods/remap/remap.object.js) | remap.obj |
| [remap.array](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/remap.js#L117-L131)  | [remap.array](https://github.com/imaginate/vitals/blob/master/test/methods/remap/remap.array.js)   | remap.arr |
| [remap.string](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/remap.js#L144-L155) | [remap.string](https://github.com/imaginate/vitals/blob/master/test/methods/remap/remap.string.js) | remap.str |

#### vitals.slice
| Documentation                                                                                    | Examples                                                                                           | Alias     |
| :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :-------- |
| [slice](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/slice.js#L40-L48)        | [slice](https://github.com/imaginate/vitals/blob/master/test/methods/slice/slice.js)               |           |
| [slice.array](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/slice.js#L64-L71)  | [slice.array](https://github.com/imaginate/vitals/blob/master/test/methods/slice/slice.array.js)   | slice.arr |
| [slice.string](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/slice.js#L84-L91) | [slice.string](https://github.com/imaginate/vitals/blob/master/test/methods/slice/slice.string.js) | slice.str |

#### vitals.until
| Documentation                                                                                      | Examples                                                                                           | Alias     |
| :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :-------- |
| [until](https://github.com/imaginate/vitals/blob/ea6f627be4/src/methods/until.js#L41-L61)          | [until](https://github.com/imaginate/vitals/blob/master/test/methods/until/until.js)               |           |
| [until.object](https://github.com/imaginate/vitals/blob/ea6f627be4/src/methods/until.js#L90-L108)  | [until.object](https://github.com/imaginate/vitals/blob/master/test/methods/until/until.object.js) | until.obj |
| [until.array](https://github.com/imaginate/vitals/blob/ea6f627be4/src/methods/until.js#L120-L138)  | [until.array](https://github.com/imaginate/vitals/blob/master/test/methods/until/until.array.js)   | until.arr |
| [until.string](https://github.com/imaginate/vitals/blob/ea6f627be4/src/methods/until.js#L151-L163) | [until.string](https://github.com/imaginate/vitals/blob/master/test/methods/until/until.string.js) | until.str |


## Strict Methods
The strict methods make constructing secure JavaScript programs easier. Combined with [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) there is no excuse for accidental or invalid object mutations with quiet failures (i.e. errors not thrown).

#### vitals.amend
| Documentation                                                                                          | Examples                                                                                                   | Alias       |
| :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| [amend](https://github.com/imaginate/vitals/blob/38f306f2ee/src/methods/amend.js#42-L81)               | [amend](https://github.com/imaginate/vitals/blob/master/test/methods/amend/amend.js)                       |             |
| [amend.property](https://github.com/imaginate/vitals/blob/38f306f2ee/src/methods/amend.js#L133-L162)   | [amend.property](https://github.com/imaginate/vitals/blob/master/test/methods/amend/amend.property.js)     | amend.prop  |
| [amend.properties](https://github.com/imaginate/vitals/blob/38f306f2ee/src/methods/amend.js#L203-L242) | [amend.properties](https://github.com/imaginate/vitals/blob/master/test/methods/amend/amend.properties.js) | amend.props |

#### vitals.create
| Documentation                                                                                      | Examples                                                                                              | Alias      |
| :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------- |
| [create](https://github.com/imaginate/vitals/blob/c246fabb29/src/methods/create.js#L39-L53)        | [create](https://github.com/imaginate/vitals/blob/master/test/methods/create/create.js)               |            |
| [create.object](https://github.com/imaginate/vitals/blob/c246fabb29/src/methods/create.js#L70-L84) | [create.object](https://github.com/imaginate/vitals/blob/master/test/methods/create/create.object.js) | create.obj |

#### vitals.freeze
| Documentation                                                                                      | Examples                                                                                              | Alias      |
| :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------- |
| [freeze](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/freeze.js#L38-L44)        | [freeze](https://github.com/imaginate/vitals/blob/master/test/methods/freeze/freeze.js)               |            |
| [freeze.object](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/freeze.js#L55-L61) | [freeze.object](https://github.com/imaginate/vitals/blob/master/test/methods/freeze/freeze.object.js) | freeze.obj |

#### vitals.seal
| Documentation                                                                                  | Examples                                                                                        | Alias    |
| :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------- |
| [seal](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/seal.js#L38-L44)        | [seal](https://github.com/imaginate/vitals/blob/master/test/methods/seal/seal.js)               |          |
| [seal.object](https://github.com/imaginate/vitals/blob/bdf858bbf0/src/methods/seal.js#L55-L61) | [seal.object](https://github.com/imaginate/vitals/blob/master/test/methods/seal/seal.object.js) | seal.obj |


## File System Methods
When ``` "fs" ``` or ``` "file-system" ``` is included in a node-vitals setup these sub methods are appended to each main method. They are synchronously designed for easy use in build environments. Note that while these methods do receive regular use from our team, a thorough set of unit tests still need to be designed to ensure robust stability. If you encounter any bugs please [open an issue](https://github.com/imaginate/vitals/issues).

#### fs vitals.copy
| Documentation                                                                                        | Alias    |
| :--------------------------------------------------------------------------------------------------- | :------- |
| [copy.file](https://github.com/imaginate/vitals/blob/689722b826/src/methods/fs/copy.js#L42-L54)      |          |
| [copy.directory](https://github.com/imaginate/vitals/blob/689722b826/src/methods/fs/copy.js#L78-L91) | copy.dir |

#### fs vitals.get
| Documentation                                                                                        |
| :--------------------------------------------------------------------------------------------------- |
| [get.file](https://github.com/imaginate/vitals/blob/ce1e24b234/src/methods/fs/get.js#L43-L55)        |
| [get.dirpaths](https://github.com/imaginate/vitals/blob/ce1e24b234/src/methods/fs/get.js#L82-L91)    |
| [get.filepaths](https://github.com/imaginate/vitals/blob/ce1e24b234/src/methods/fs/get.js#L114-L129) |

#### fs vitals.to
| Documentation                                                                               |
| :------------------------------------------------------------------------------------------ |
| [to.file](https://github.com/imaginate/vitals/blob/a34e549c11/src/methods/fs/to.js#L39-L46) |


## Shell Methods
The shell methods are synchronously designed for easy use in build environments. Note that while these methods do receive regular use from our team, a thorough set of unit tests still need to be designed to ensure robust stability. If you encounter any bugs please [open an issue](https://github.com/imaginate/vitals/issues).

#### vitals.run
| Documentation                                                                         |
| :------------------------------------------------------------------------------------ |
| [run](https://github.com/imaginate/vitals/blob/befb7eed84/src/methods/run.js#L52-L76) |

<br>
## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/vitals/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
