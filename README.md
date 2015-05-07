#Simplify Your JavaScript & Write Less Code!


####Algorithm IV's JavaScript & DOM shortcuts are a collection of methods that make programming in JavaScript easier. With an intuitive API and clear documentation we are sure you will appreciate the time you save using our shortcuts!


##Getting Started
- Download [algorithmIV-utils.min.js](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/algorithmIV-utils.min.js)
- Add algorithmIV-utils.min.js to your HTML head before any scripts that will use the shortcuts
```html
<html>
    <head>
        ...
        <script src="algorithmIV-utils.min.js"></script>
        ...
    </head>
    <body>...</body>
</html>
```
- Use aIV.utils to access our shortcuts at any time
```javascript
aIV.utils.checkType( anyValue, theTypeString );
aIV.utils.isValidTypeString( theTypeString );
aIV.utils.freezeObj( theObject [, applyDeepFreeze ]);
aIV.utils.hasOwnProp( theObject, theProperty );
aIV.utils.getElemById( theIdName );
aIV.utils.getElemByClass( theClassName [, theIndex [, theRoot ]]);
aIV.utils.getElemByTag( theTagName [, theIndex [, theRoot ]]);
aIV.utils.getElemsByClass( theClassName [, theRoot ]);
aIV.utils.getElemsByTag( theTagName [, theRoot ]);
```


##The Shortcuts
- **[checkType](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/checkType.js)** - Allows you to quickly check a value's data type. A shortcut for the combination of the following native operators and methods: [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof), and [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray).
- **[isValidTypeString](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/isValidTypeString.js)** - Allows you to verify a data type string before you submit it to [aIV.utils.checkType](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/checkType.js).
- **[freezeObj](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/freezeObj.js)** - Allows you to deep or shallow freeze objects at will. A shortcut for the native [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
- **[hasOwnProp](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/hasOwnProp.js)** - A shortcut for the native [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
- **[getElemById](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/getElemById.js)** - A shortcut for the native [Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
- **[getElemByClass](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemByTag](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).
- **[getElemsByClass](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemsByTag](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).


##Example
```javascript
aIV.utils.checkType(obj, '!object|function');
// vs
(obj && (typeof obj === 'object' || typeof obj === 'function'));
```


##Contact Us
- **Contributing:** First read our [guideline for contributing](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/CONTRIBUTING.md) then open an issue or email us.
- **API Questions:** First read the [Public API](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/public-api.js) then open an issue or email us.
- **Bugs & Improvements:** [Open an issue](https://github.com/imaginate/algorithmIV-javascript-shortcuts/issues) on this GitHub repository.
- **All Other Questions:** Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com).


--
**Happy Developing,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>