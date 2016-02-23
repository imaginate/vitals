/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.func
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

describe('vitals.copy.func (section:base)', function() {
  var title;

  title = titleStr('should return a clone of the function');
  describe(title, function() {

    title = callStr('<function>');
    it(title, function() {
      var func = newFunc();
      var cp = vitals.copy.func(func);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });

    title = callStr('<function>', true);
    it(title, function() {
      var func = newFunc();
      var cp = vitals.copy.func(func, true);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b !== cp.b );
      assert( func.b.c === cp.b.c );
    });

    title = callStr('<function>', false);
    it(title, function() {
      var func = newFunc();
      var cp = vitals.copy.func(func, false);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func();
      }, validTypeErr);
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func(null);
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func({});
      }, validTypeErr);
    });

    title = callStr('<function>', 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func(newFunc(), 'fail');
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
  return testCall('copy.func', arguments, 3);
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
