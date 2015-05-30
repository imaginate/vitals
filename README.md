# Powerful & Easy JavaScript & DOM Shortcuts

#### Vitals.js is a collection of cross-browser compatible JavaScript & DOM shortcut methods that make programming in JavaScript simple! You will be able to accurately type check values, deep freeze objects, create elements, and so much more with ease. With an intuitive API and clear documentation you will rejoice from the time saved and the stress lost!

<br />
## Getting Started
- Download [vitals.min.js](https://github.com/imaginate/vitals/blob/master/src/vitals.min.js)
- Add it to your HTML ``` <head> ``` or ``` <body> ``` (before any scripts that will use the shortcuts)
```html
<html>
    <head>
        ...
        <script src="vitals.min.js"></script>
        ...
    </head>
    <body>...</body>
</html>
```
- Use the global object, ``` Vitals ``` or ``` Vx ```, to access any shortcut
```javascript
Vitals.checkType( anyValue, theTypeString ) // returns: boolean
Vitals.isValidTypeString( theTypeString ) // returns: boolean
Vitals.checkArgs( theArg, theTypeString, theArg, theTypeString, ...) // returns: boolean
Vitals.getTypeOf( anyValue ) // returns: string
Vitals.freezeObj( theObject [, applyDeepFreeze ]) // returns: !Object
Vitals.hasOwnProp( theObject, theProperty ) // returns: boolean
Vitals.getElemById( theIdName ) // returns: ?Element
Vitals.getElemByClass( theClassName [, theIndex [, theRoot ]]) // returns: ?Element
Vitals.getElemByTag( theTagName [, theIndex [, theRoot ]]) // returns: ?Element
Vitals.getElemsByClass( theClassName [, theRoot ]) // returns: !Array<!Element>
Vitals.getElemsByTag( theTagName [, theRoot ]) // returns: !Array<!Element>
Vitals.makeElem( theTagName|allTheSettings ) // returns: !Element
Vitals.setElemText( theElement, theText ) // returns: !Element
Vitals.addElemText( theElement, theText ) // returns: !Element
```

<br />
## The Shortcuts
- <a name="checkType"></a>**[checkType](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/checkType.js)** - Allows you to quickly check a value's data type. A shortcut for native operators and methods like [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof), [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), and many more.
- **[isValidTypeString](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/isValidTypeString.js)** - Allows you to verify a data type string before you submit it to [Vx.checkType](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/checkType.js).
- <a name="checkArgs"></a>**[checkArgs](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/checkArgs.js)** - Allows you to easily catch invalid argument data types and throw custom error messages.
- **[getTypeOf](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/getTypeOf.js)** - A shortcut for the native [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator with the added ability to identify a null, array, document, or element type from an object.
- **[freezeObj](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/freezeObj.js)** - Allows you to deep or shallow freeze objects at will. A shortcut for the native [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
- **[hasOwnProp](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/hasOwnProp.js)** - A shortcut for the native [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
- **[getElemById](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/getElemById.js)** - A shortcut for the native [Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
- **[getElemByClass](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemByTag](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName[ index ]](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).
- **[getElemsByClass](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/getElemsByClass.js)** - A shortcut for the native [( Document | Element ).getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName).
- **[getElemsByTag](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/getElemsByTag.js)** - A shortcut for the native [( Document | Element ).getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/document/getElementsByTagName).
- <a name="makeElem"></a>**[makeElem](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/makeElem.js)** - A shortcut for the native [Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and optionally a shortcut to set the new element's [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) / [innerText](https://msdn.microsoft.com/en-us/library/ms533899(v=vs.85).aspx), [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), [id](https://developer.mozilla.org/en-US/docs/Web/API/Element/id), and [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className).
- **[setElemText](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/setElemText.js)** - A shortcut to set an element's [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) or [innerText](https://msdn.microsoft.com/en-us/library/ms533899(v=vs.85).aspx) property.
- **[addElemText](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/dom-methods/addElemText.js)** - A shortcut to add to an element's [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) or [innerText](https://msdn.microsoft.com/en-us/library/ms533899(v=vs.85).aspx) property.

<br />
## The Master Methods
- **[set](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/master-methods/set.js)** - Allows you to set the default values for all of our shortcuts.
- **[reset](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/master-methods/reset.js)** - Allows you to reset the default values for all of our shortcuts.

<br />
## Examples
Below are three examples of how Vitals.js saves you time, improves your code's readability, and is just plain awesome!
- [Vitals.checkType](#checkType): Type checking an array and its properties can be precise and painless.
```javascript
// Check if the variable arr is an array of strings
var arr, strArrCheck;
arr = [ 'str', 'str', 5 ];
// CHECK GOES HERE: Set strArrCheck to the result of the check
if (strArrCheck) {
  // Do something
}
else {
  // Do something else
}
///////////////////////////////////////////////////////////////////////////

// Without Vitals
strArrCheck = (Object.prototype.toString.call(arr) === '[object Array]');
var i = (strArrCheck) ? arr.length : 0;
while (i-- && strArrCheck) {
  strArrCheck = (typeof arr[i] === 'string');
}

// With Vitals
strArrCheck = Vx.checkType(arr, '!strings');
```
- [Vitals.checkArgs](#checkArgs): Throwing a TypeError for invalid argument types can be easy and seamless.
```javascript
/**
 * An example method.
 * @param {(!Object|function)} obj
 * @param {(string|undefined)} str
 */
function exampleMethod(obj, str) {
  // CHECK GOES HERE: Check the method's arguments for invalid types
  // Method does something else ...
}
///////////////////////////////////////////////////////////////////////////////////////

// Without Vitals
var checkArgsVals = !obj || (typeof obj !== 'object' && typeof obj !== 'function') ||
                    (typeof str !== 'string' && typeof str !== 'undefined');
if (!checkArgsVals) {
  throw new TypeError('the error message');
}

// With Vitals: Option 1
Vx.checkArgs(obj, '!object|function', str, 'string=');

// With Vitals: Option 2
var checkArgsVals = Vx.checkArgs(obj, '!object|function', str, 'string=');
if (!checkArgsVals) {
  return;
}
```
- [Vitals.makeElem](#makeElem): Creating and appending a new DOM Element can be short and simple.
```javascript
// Create a new span element with 'some text' and the id of 'childElem'.
// Then append it to the first element with the class of 'parentClass'.

var parentElem, childElem;
// CREATION GOES HERE: Set childElem to a new span element and append it
///////////////////////////////////////////////////////////////////////////////////////

// Without Vitals
childElem = document.createElement('span');
childElem.id = 'childElem';
if ('textContent' in childElem) {
  childElem.textContent = 'some text';
}
else {
  childElem.innerText = 'some text';
}
parentElem = document.getElementByClassName('parentClass')[0]; // is NOT cross-browser compatible
parentElem.appendChild(childElem);

// With Vitals
childElem = Vx.makeElem({
  tag : 'span',
  id  : 'childElem',
  text: 'some text'
});
parentElem = Vx.getElemByClass('parentClass'); // is cross-browser compatible
parentElem.appendChild(childElem);
```

<br />
## Contact Us
- **Contributing:** First read our [guideline for contributing](https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md) then open an issue or email us.
- **API Questions:** First read the [Public API](https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/public-api.js) then open an issue or email us.
- **Bugs & Improvements:** [Open an issue](https://github.com/imaginate/vitals/issues) on this GitHub repository.
- **All Other Questions:** Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com).

<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>