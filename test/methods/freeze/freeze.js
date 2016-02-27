/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.freeze
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.freeze docs](https://github.com/imaginate/vitals/wiki/vitals.freeze)
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

method('freeze', function() {

  should('shallowly freeze the object', function() {

    test(null, function() {
      var obj = vitals.freeze(null);
      assert( obj === null );
    });

    test({}, function() {
      var obj = vitals.freeze({});
      assert( is.frozen(obj) );
    });

    test('<function>', function() {
      var func = function(){};
      func = vitals.freeze(func);
      assert( is.frozen(func) );
    });

    test({ a: {} }, function() {
      var obj = vitals.freeze({ a: {} });
      assert(  is.frozen(obj)   );
      assert( !is.frozen(obj.a) );
    });

    test(null, false, function() {
      var obj = vitals.freeze(null, false);
      assert( obj === null );
    });

    test({}, false, function() {
      var obj = vitals.freeze({}, false);
      assert( is.frozen(obj) );
    });

    test('<function>', false, function() {
      var func = function(){};
      func = vitals.freeze(func, false);
      assert( is.frozen(func) );
    });

    test({ a: {} }, false, function() {
      var obj = vitals.freeze({ a: {} }, false);
      assert(  is.frozen(obj)   );
      assert( !is.frozen(obj.a) );
    });
  });

  should('deeply freeze the object', function() {

    test(null, true, function() {
      var obj = vitals.freeze(null, true);
      assert( obj === null );
    });

    test({}, true, function() {
      var obj = vitals.freeze({}, true);
      assert( is.frozen(obj) );
    });

    test('<function>', true, function() {
      var func = function(){};
      func = vitals.freeze(func, true);
      assert( is.frozen(func) );
    });

    test({ a: {} }, true, function() {
      var obj = vitals.freeze({ a: {} }, true);
      assert( is.frozen(obj)   );
      assert( is.frozen(obj.a) );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.freeze();
      }, validTypeErr);
    });

    test('invalid', function() {
      assert.throws(function() {
        vitals.freeze('invalid');
      }, validTypeErr);
    });

    test({}, 'invalid', function() {
      assert.throws(function() {
        vitals.freeze({}, 'invalid');
      }, validTypeErr);
    });
  });
});
