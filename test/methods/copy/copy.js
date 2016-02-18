/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - COPY
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/wiki/vitals.copy}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.copy (section:base)', function() {
  var title;

  title = titleStr('basic', 'should return same value as input');
  describe(title, function() {

    title = callStr('<primitive>');
    it(title, function() {
      var vals = [ null, undefined, true, false, 'string', 5 ];
      each(vals, function(val) {
        assert(vitals.copy(val) === val);
      });
      assert( is.nan( vitals.copy(NaN) ) );
    });

    title = callStr('<primitive>', true);
    it(title, function() {
      var vals = [ null, undefined, true, false, 'string', 5 ];
      each(vals, function(val) {
        assert(vitals.copy(val) === val);
      });
      assert( is.nan( vitals.copy(NaN) ) );
    });

  });

  title = 'should return new object with same key => value pairs as input';
  title = titleStr('object', title);
  describe(title, function() {

    title = callStr( newObj() );
    it(title, function() {
      var obj = newObj();
      var copy = vitals.copy(obj);
      assert(obj !== copy);
      each(obj, function(val, key) {
        assert( obj[key] === copy[key] );
      });
    });

    title = callStr(newObj(), true);
    it(title, function() {
      var obj = newObj();
      var copy = vitals.copy(obj, true);
      assert(obj !== copy);
      assert(obj.a === copy.a);
      assert(obj.b !== copy.b);
      assert(obj.c === copy.c);
    });

  });

  title = 'should return new regex with same source and flags as input';
  title = titleStr('regex', title);
  describe(title, function() {

    title = callStr( newRegex() );
    it(title, function() {
      var regex = newRegex();
      var copy = vitals.copy(regex);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global === copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

    title = callStr(newRegex(), true);
    it(title, function() {
      var regex = newRegex();
      var copy = vitals.copy(regex, true);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global === copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

  });

  title = 'should return new array with same values as input';
  title = titleStr('array', title);
  describe(title, function() {

    title = callStr( newArr() );
    it(title, function() {
      var arr = newArr();
      var copy = vitals.copy(arr);
      assert(arr !== copy);
      each(arr, function(val, i) {
        assert( arr[i] === copy[i] );
      });
    });

    title = callStr(newArr(), true);
    it(title, function() {
      var arr = newArr();
      var copy = vitals.copy(arr, true);
      assert(arr !== copy);
      assert(arr[0] === copy[0]);
      assert(arr[1] !== copy[1]);
      assert(arr[2] === copy[2]);
    });

  });

  title = 'should return new function with same body ';
  title += 'and key => value pairs as input';
  title = titleStr('function', title);
  describe(title, function() {

    title = callStr( newFunc() );
    it(title, function() {
      var func = newFunc();
      var copy = vitals.copy(func);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b === copy.b);
      assert( func() === copy() );
    });

    title = callStr(newFunc(), true);
    it(title, function() {
      var func = newFunc();
      var copy = vitals.copy(func, true);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b !== copy.b);
      assert( func() === copy() );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy();
      });
    });

    title = callStr({}, 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy({}, 'fail');
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 1);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('copy', arguments, 3);
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
