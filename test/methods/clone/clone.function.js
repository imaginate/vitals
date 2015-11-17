/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE.FUNCTION
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

describe('clone.function (sections:js,base)', function() {
  var title;

  title = 'basic tests should return a new function with ';
  title += 'the same body and key => value pairs as the input';
  describe(title, function() {

    title = callStr( newFunc() );
    it(title, function() {
      var func = newFunc();
      var copy = vitals.clone.func(func);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b === copy.b);
      assert( func() === copy() );
    });

    title = callStr(newFunc(), true);
    it(title, function() {
      var func = newFunc();
      var copy = vitals.clone.func(func, true);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b !== copy.b);
      assert( func() === copy() );
    });

    title = callStr(newFunc(), false);
    it(title, function() {
      var func = newFunc();
      var copy = vitals.clone.func(func, false);
      assert(func !== copy);
      assert(func.a === copy.a);
      assert(func.b === copy.b);
      assert( func() === copy() );
    });

  });

  describe('error tests should throw an error', function() {

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.clone.func(null);
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.clone.func({});
      });
    });

    title = callStr(newFunc(true), 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.clone.func(newFunc(true), 'fail');
      });
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
function callStr() {
  return testCall('clone.func', arguments, 4, true);
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
