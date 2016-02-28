/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.func
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('copy.func', function() {

  should('return a clone of the function', function() {

    test('<function>', function() {
      var func = newFunc();
      var cp = vitals.copy.func(func);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });

    test('<function>', true, function() {
      var func = newFunc();
      var cp = vitals.copy.func(func, true);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b !== cp.b );
      assert( func.b.c === cp.b.c );
    });

    test('<function>', false, function() {
      var func = newFunc();
      var cp = vitals.copy.func(func, false);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.copy.func();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.copy.func(null);
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.copy.func({});
      }, validTypeErr);
    });

    test('<function>', 'fail', function() {
      assert.throws(function() {
        vitals.copy.func(newFunc(), 'fail');
      }, validTypeErr);
    });
  });
});

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
