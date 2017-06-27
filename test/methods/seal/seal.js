/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.seal
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.seal docs](https://github.com/imaginate/vitals/wiki/vitals.seal)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('seal', function() {

  should('shallowly seal the object', function() {

    test(null, function() {
      var obj = vitals.seal(null);
      assert( obj === null );
    });

    test({}, function() {
      var obj = vitals.seal({});
      assert( is.sealed(obj) );
    });

    test('<function>', function() {
      var func = function(){};
      func = vitals.seal(func);
      assert( is.sealed(func) );
    });

    test({ a: {} }, function() {
      var obj = vitals.seal({ a: {} });
      assert(  is.sealed(obj)   );
      assert( !is.sealed(obj.a) );
    });

    test(null, false, function() {
      var obj = vitals.seal(null, false);
      assert( obj === null );
    });

    test({}, false, function() {
      var obj = vitals.seal({}, false);
      assert( is.sealed(obj) );
    });

    test('<function>', false, function() {
      var func = function(){};
      func = vitals.seal(func, false);
      assert( is.sealed(func) );
    });

    test({ a: {} }, false, function() {
      var obj = vitals.seal({ a: {} }, false);
      assert(  is.sealed(obj)   );
      assert( !is.sealed(obj.a) );
    });
  });

  should('deeply seal the object', function() {

    test(null, true, function() {
      var obj = vitals.seal(null, true);
      assert( obj === null );
    });

    test({}, true, function() {
      var obj = vitals.seal({}, true);
      assert( is.sealed(obj) );
    });

    test('<function>', true, function() {
      var func = function(){};
      func = vitals.seal(func, true);
      assert( is.sealed(func) );
    });

    test({ a: {} }, true, function() {
      var obj = vitals.seal({ a: {} }, true);
      assert( is.sealed(obj)   );
      assert( is.sealed(obj.a) );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.seal();
      }, validTypeErr);
    });

    test('invalid', function() {
      assert.throws(function() {
        vitals.seal('invalid');
      }, validTypeErr);
    });

    test({}, 'invalid', function() {
      assert.throws(function() {
        vitals.seal({}, 'invalid');
      }, validTypeErr);
    });
  });
});
