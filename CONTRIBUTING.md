# Contributing Guide
### Make Your JS Better
All contributions are appreciated! Please follow the below directions for contributing to [vitals](http://vitalsjs.com).


## Directions
- Fork and clone this repository
- Create a new branch for your additions
- Add your contributions to the [src/methods directory](https://github.com/imaginate/vitals/tree/master/src/methods)
- Add/update unit tests for your contributions in the [test/methods directory](https://github.com/imaginate/vitals/tree/master/test/methods)
- Run ```$ npm test ```
- Debug your additions
- Submit a pull request


## Pointers
- Ensure all additions are [ES3](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) compliant
- Wrap needed [ES5+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources) functionality with a proper [shim](https://en.wikipedia.org/wiki/Shim_(computing))
- Follow the coding conventions you see in the existing code
- Know and use [JSDoc3](http://usejsdoc.org/) with [Closure Compiler specific syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
- Include unit tests for all new functionality
- Ensure all unit tests are passing before submitting a pull request


## Contact
- **bugs and improvements:** [open an issue](https://github.com/imaginate/vitals/issues)
- **all other questions:** adam@vitalsjs.com


--
**Thanks for being a part of the [vitals](http://vitalsjs.com) team,**

<a href="http://vitalsjs.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
