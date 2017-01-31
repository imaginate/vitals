/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.seal.object
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.seal docs](https://github.com/imaginate/vitals/wiki/vitals.seal)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('seal.object', 'seal.obj', function() {

  should('shallowly seal the object', function() {

    test(null, function() {
      var obj = vitals.seal.obj(null);
      assert( obj === null );
    });

    test({}, function() {
      var obj = vitals.seal.obj({});
      assert( is.sealed(obj) );
    });

    test('<function>', function() {
      var func = function(){};
      func = vitals.seal.obj(func);
      assert( is.sealed(func) );
    });

    test({ a: {} }, function() {
      var obj = vitals.seal.obj({ a: {} });
      assert(  is.sealed(obj)   );
      assert( !is.sealed(obj.a) );
    });

    test(null, false, function() {
      var obj = vitals.seal.obj(null, false);
      assert( obj === null );
    });

    test({}, false, function() {
      var obj = vitals.seal.obj({}, false);
      assert( is.sealed(obj) );
    });

    test('<function>', false, function() {
      var func = function(){};
      func = vitals.seal.obj(func, false);
      assert( is.sealed(func) );
    });

    test({ a: {} }, false, function() {
      var obj = vitals.seal.obj({ a: {} }, false);
      assert(  is.sealed(obj)   );
      assert( !is.sealed(obj.a) );
    });
  });

  should('deeply seal the object', function() {

    test(null, true, function() {
      var obj = vitals.seal.obj(null, true);
      assert( obj === null );
    });

    test({}, true, function() {
      var obj = vitals.seal.obj({}, true);
      assert( is.sealed(obj) );
    });

    test('<function>', true, function() {
      var func = function(){};
      func = vitals.seal.obj(func, true);
      assert( is.sealed(func) );
    });

    test({ a: {} }, true, function() {
      var obj = vitals.seal.obj({ a: {} }, true);
      assert( is.sealed(obj)   );
      assert( is.sealed(obj.a) );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.seal.obj();
      }, validTypeErr);
    });

    test('invalid', function() {
      assert.throws(function() {
        vitals.seal.obj('invalid');
      }, validTypeErr);
    });

    test({}, 'invalid', function() {
      assert.throws(function() {
        vitals.seal.obj({}, 'invalid');
      }, validTypeErr);
    });
  });
});
