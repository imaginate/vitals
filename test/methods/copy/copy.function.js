/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - COPY.FUNCTION
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/copy.js}
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

describe('vitals.copy.function (section:base)', function() {
  var title;

  title = 'should return new function with same body ';
  title += 'and key => value pairs as input';
  title = titleStr('basic', title);
  describe(title, function() {

    title = callStr( newFunc() );
    it(title, function() {
      var func = newFunc();
      var copy = vitals.copy.func(func);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b === copy.b);
      assert( func() === copy() );
    });

    title = callStr(newFunc(), true);
    it(title, function() {
      var func = newFunc();
      var copy = vitals.copy.func(func, true);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b !== copy.b);
      assert( func() === copy() );
    });

    title = callStr(newFunc(), false);
    it(title, function() {
      var func = newFunc();
      var copy = vitals.copy.func(func, false);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b === copy.b);
      assert( func() === copy() );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func(null);
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func({});
      });
    });

    title = callStr(newFunc(true), 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.func(newFunc(true), 'fail');
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
  return testTitle(section, shouldMsg, 2, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('copy.func', arguments, 4, true);
}

/**
 * @private
 * @param {boolean=} noProps
 * @return {function}
 */
function newFunc(noProps) {

  /** @type {function} */
  var func;

  func = function testFunc() { return 5; };
  if (!noProps) {
    func.a = 1
    func.b = { b: 2 };
  }
  return freeze(func, true);
}
