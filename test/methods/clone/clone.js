/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE
 * -----------------------------------------------------------------------------
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/methods/clone.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('clone (sections:js,base)', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = genCallStr('primitive');
  it(title, function() {
    var vals;
    vals = [ null, undefined, true, false, 'string', 5 ];
    each(vals, function(val) {
      assert(vitals.clone(val) === val);
    });
    assert( is.nan( vitals.clone(NaN) ) );
  });

  title = genCallStr('primitive', true);
  it(title, function() {
    var vals;
    vals = [ null, undefined, true, false, 'string', 5 ];
    each(vals, function(val) {
      assert(vitals.clone(val) === val);
    });
    assert( is.nan( vitals.clone(NaN) ) );
  });

  //////////////////////////////////////////////
  // OBJECT TESTS

  title = genCallStr('object');
  it(title, function() {
    var obj = newObj();
    var copy = vitals.clone(obj);
    assert(obj !== copy);
    each(obj, function(val, key) {
      assert( obj[key] === copy[key] );
    });
  });

  title = genCallStr('object', true);
  it(title, function() {
    var obj = newObj();
    var copy = vitals.clone(obj, true);
    assert(obj !== copy);
    assert(obj.a === copy.a);
    assert(obj.b !== copy.b);
    assert(obj.c === copy.c);
  });

  //////////////////////////////////////////////
  // REGEXP TESTS

  title = genCallStr('RegExp');
  it(title, function() {
    var regex = newRegex();
    var copy = vitals.clone(regex);
    assert(regex !== copy);
    assert(regex.source === copy.source);
    assert(regex.global === copy.global);
    assert(regex.ignoreCase === copy.ignoreCase);
  });

  title = genCallStr('RegExp', true);
  it(title, function() {
    var regex = newRegex();
    var copy = vitals.clone(regex, true);
    assert(regex !== copy);
    assert(regex.source === copy.source);
    assert(regex.global === copy.global);
    assert(regex.ignoreCase === copy.ignoreCase);
  });

  //////////////////////////////////////////////
  // ARRAY TESTS

  title = genCallStr('array');
  it(title, function() {
    var arr = newArr();
    var copy = vitals.clone(arr);
    assert(arr !== copy);
    each(arr, function(val, i) {
      assert( arr[i] === copy[i] );
    });
  });

  title = genCallStr('array', true);
  it(title, function() {
    var arr = newArr();
    var copy = vitals.clone(arr, true);
    assert(arr !== copy);
    assert(arr[0] === copy[0]);
    assert(arr[1] !== copy[1]);
    assert(arr[2] === copy[2]);
  });

  //////////////////////////////////////////////
  // FUNCTION TESTS

  title = genCallStr('function');
  it(title, function() {
    var func = newFunc();
    var copy = vitals.clone(func);
    assert(func !== copy);
    assert(func.a === copy.a);
    assert(func.b === copy.b);
    assert( func() === copy() );
  });

  title = genCallStr('function', true);
  it(title, function() {
    var func = newFunc();
    var copy = vitals.clone(func, true);
    assert(func !== copy);
    assert(func.a === copy.a);
    assert(func.b !== copy.b);
    assert( func() === copy() );
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr({}, 'fail');
  it(title, function() {
    assert.throws(function() {
      vitals.clone({}, 'fail');
    });
  });

  title = callStr(true, 'fail');
  it(title, function() {
    assert.throws(function() {
      vitals.clone(true, 'fail');
    });
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr(args) {
  args = slice(arguments);
  return testCall('clone', args, 3, true);
}

/**
 * @private
 * @param {string} type
 * @param {boolean=} deep
 * @return {string}
 */
function genCallStr(type, deep) {
  type = '<' + type + '>';
  deep = deep ? ', true' : '';
  return 'clone(' + type + deep + ');';
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return freeze({ a: 1, b: { b: 2 }, c: 3 }, true);
}

/**
 * @private
 * @return {!RegExp}
 */
function newRegex() {
  return freeze( /a/ );
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return freeze([ 1, { b: 2 }, 3 ], true);
}

/**
 * @private
 * @return {function}
 */
function newFunc() {

  /** @type {function} */
  var func;

  func = function testFunc() { return 5; };
  func.a = 1
  func.b = { b: 2 };
  return freeze(func, true);
}
