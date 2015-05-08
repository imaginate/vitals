#Simplify Your JavaScript!


####Algorithm IV's JavaScript & DOM shortcuts are a collection of cross-browser compatible methods that make programming in JavaScript easier. With an intuitive API and clear documentation we are sure you will appreciate the time you save using our shortcuts!


##Getting Started
- Download [algorithmIV-utils.min.js](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/algorithmIV-utils.min.js)
- Add algorithmIV-utils.min.js to your HTML ```<head>``` or ```<body>``` before any scripts that will use the shortcuts
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
aIV.utils.checkArgs( theArg, theTypeString, theArg, theTypeString, ...);
aIV.utils.getTypeOf( anyValue );
aIV.utils.freezeObj( theObject [, applyDeepFreeze ]);
aIV.utils.hasOwnProp( theObject, theProperty );
aIV.utils.getElemById( theIdName );
aIV.utils.getElemByClass( theClassName [, theIndex [, theRoot ]]);
aIV.utils.getElemByTag( theTagName [, theIndex [, theRoot ]]);
aIV.utils.getElemsByClass( theClassName [, theRoot ]);
aIV.utils.getElemsByTag( theTagName [, theRoot ]);
aIV.utils.makeElem( theTagName|allTheSettings );
aIV.utils.addElemText( theElement, theText );
```


##The Shortcuts
- **[checkType](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js)** - Allows you to quickly check a value's data type. A shortcut for native operators and methods like [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof), [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), and many more.
- **[isValidTypeString](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/isValidTypeString.js)** - Allows you to verify a data type string before you submit it to [aIV.utils.checkType](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js).
- **[checkArgs](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkArgs.js)** - Allows you to easily catch invalid argument data types and throw custom error messages.
- **[getTypeOf](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/getTypeOf.js)** - A shortcut for the native [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator with the added ability to identify a null, array, document, or element type from an object.
- **[freezeObj](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/freezeObj.js)** - Allows you to deep or shallow freeze objects at will. A shortcut for the native [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
- **[hasOwnProp](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/hasOwnProp.js)** - A shortcut for the native [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
- **[getElemById](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/getElemById.js)** - A shortcut for the native [Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
- **[getElemByClass](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemByTag](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).
- **[getElemsByClass](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemsByTag](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).
- **[makeElem](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/makeElem.js)** - A shortcut for the native [Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and optionally a shortcut to set the new element's [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) / [innerText](https://msdn.microsoft.com/en-us/library/ms533899(v=vs.85).aspx), [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), [id](https://developer.mozilla.org/en-US/docs/Web/API/Element/id), and [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className).
- **[addElemText](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/dom-methods/addElemText.js)** - A shortcut to set an element's [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) or [innerText](https://msdn.microsoft.com/en-us/library/ms533899(v=vs.85).aspx) property.

## The Master Methods
- **[set](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/e9d9de36665b4ec7b5df2dd68808305dbf3670f0/src/pre-compiled-parts/set-defaults.js#L1-13)** - Allows you to set the default values for all of our shortcuts.
- **[reset](https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/e9d9de36665b4ec7b5df2dd68808305dbf3670f0/src/pre-compiled-parts/set-defaults.js#L58-65)** - Allows you to reset the default values for all of our shortcuts.


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