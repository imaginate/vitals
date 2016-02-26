/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.object
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

method('copy.object', 'copy.obj', function() {

  should('return a clone of the object', function() {

    test('<object>', function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    test('<object>', true, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj, true);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b !== cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    test('<object>', false, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj, false);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.copy.obj();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.copy.obj(null);
      }, validTypeErr);
    });

    test({}, 'fail', function() {
      assert.throws(function() {
        vitals.copy.obj({}, 'fail');
      }, validTypeErr);
    });
  });
});
