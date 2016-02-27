/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fill.object
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fill docs](https://github.com/imaginate/vitals/wiki/vitals.fill)
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

method('fill.object', 'fill.obj', function() {

  should('fill object properties with val', function() {

    test('<object>', 5, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.fill.obj(obj1, 5);
      assert( obj2.a === 5 );
      assert( obj2.b === 5 );
      assert( obj2.c === 5 );
      assert( obj2 === obj1 );
    });

    test('<object>', 'a,b,c', 6, function() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      var obj2 = vitals.fill.obj(obj1, 'a,b,c', 6);
      assert( obj2.a === 6 );
      assert( obj2.b === 6 );
      assert( obj2.c === 6 );
      assert( obj2.d === 4 );
      assert( obj2.e === 5 );
      assert( obj2 === obj1 );
    });

    test('<object>', [ 'a', 'b', 'c' ], 6, function() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      var keys = [ 'a', 'b', 'c' ];
      var obj2 = vitals.fill.obj(obj1, keys, 6);
      assert( obj2.a === 6 );
      assert( obj2.b === 6 );
      assert( obj2.c === 6 );
      assert( obj2.d === 4 );
      assert( obj2.e === 5 );
      assert( obj2 === obj1 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fill.obj();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.fill.obj({});
      }, validErr);
    });

    test(5, 5, function() {
      assert.throws(function() {
        vitals.fill.obj(5, 5);
      }, validTypeErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.fill.obj(null, 5);
      }, validTypeErr);
    });
  });
});
