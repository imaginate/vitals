/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy
 * -----------------------------------------------------------------------------
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.copy (section:base)', function() {
  var title;

  title = titleStr('should return a clone of the primitive');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var val = vitals.copy(null);
      assert( val === null );
    });

    title = callStr(undefined);
    it(title, function() {
      var val = vitals.copy(undefined);
      assert( val === undefined );
    });

    title = callStr(true);
    it(title, function() {
      var val = vitals.copy(true);
      assert( val === true );
    });

    title = callStr('string');
    it(title, function() {
      var val = vitals.copy('string');
      assert( val === 'string' );
    });

    title = callStr(5);
    it(title, function() {
      var val = vitals.copy(5);
      assert( val === 5 );
    });

    title = callStr(NaN);
    it(title, function() {
      var val = vitals.copy(NaN);
      assert( is.nan(val) );
    });
  });

  title = titleStr('should return a clone of the object');
  describe(title, function() {

    title = callStr('<object>');
    it(title, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy(obj);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    title = callStr('<object>', true);
    it(title, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy(obj, true);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b !== cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });
  });

  title = titleStr('should return a clone of the regex');
  describe(title, function() {

    title = callStr(/re/);
    it(title, function() {
      var re = freeze(/re/);
      var cp = vitals.copy(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    title = callStr(/re/ig);
    it(title, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  title = titleStr('should return a clone of the array');
  describe(title, function() {

    title = callStr('<array>');
    it(title, function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy(arr);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] === cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });

    title = callStr('<array>', true);
    it(title, function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy(arr, true);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] !== cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });
  });

  title = titleStr('should return a clone of the function');
  describe(title, function() {

    title = callStr('<function>');
    it(title, function() {
      var func = newFunc();
      var cp = vitals.copy(func);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });

    title = callStr('<function>', true);
    it(title, function() {
      var func = newFunc();
      var cp = vitals.copy(func, true);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b !== cp.b );
      assert( func.b.c === cp.b.c );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy();
      }, validErr);
    });

    title = callStr({}, 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy({}, 'fail');
      }, validTypeErr);
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
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
 * @return {function}
 */
function newFunc() {

  /** @type {function} */
  var func;

  func = function testFunc() { return 5; };
  func.a = 1
  func.b = { c: 2 };
  return freeze(func, true);
}
