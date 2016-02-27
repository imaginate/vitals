/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fill
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

method('fill', function() {

  should('fill object properties with val', function() {

    test('<object>', 5, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.fill(obj1, 5);
      assert( obj2.a === 5 );
      assert( obj2.b === 5 );
      assert( obj2.c === 5 );
      assert( obj2 === obj1 );
    });

    test('<object>', 'a,b,c', 6, function() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      var obj2 = vitals.fill(obj1, 'a,b,c', 6);
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
      var obj2 = vitals.fill(obj1, keys, 6);
      assert( obj2.a === 6 );
      assert( obj2.b === 6 );
      assert( obj2.c === 6 );
      assert( obj2.d === 4 );
      assert( obj2.e === 5 );
      assert( obj2 === obj1 );
    });
  });

  should('fill array properties with val', function() {

    test('<array>', 5, function() {
      var obj1 = [ 1, 2, 3 ];
      var obj2 = vitals.fill(obj1, 5);
      assert( obj2[0] === 5 );
      assert( obj2[1] === 5 );
      assert( obj2[2] === 5 );
      assert( obj2 === obj1 );
      assert( obj2.length === 3 );
    });

    test('<array>', 6, 2, function() {
      var obj1 = [ 1, 2, 3, 4, 5 ];
      var obj2 = vitals.fill(obj1, 6, 2);
      assert( obj2[0] === 1 );
      assert( obj2[1] === 2 );
      assert( obj2[2] === 6 );
      assert( obj2[3] === 6 );
      assert( obj2[4] === 6 );
      assert( obj2 === obj1 );
      assert( obj2.length === 5 );
    });

    test('<array>', 6, -2, function() {
      var obj1 = [ 1, 2, 3, 4, 5 ];
      var obj2 = vitals.fill(obj1, 6, -2);
      assert( obj2[0] === 1 );
      assert( obj2[1] === 2 );
      assert( obj2[2] === 3 );
      assert( obj2[3] === 6 );
      assert( obj2[4] === 6 );
      assert( obj2 === obj1 );
      assert( obj2.length === 5 );
    });

    test('<array>', 6, 0, 3, function() {
      var obj1 = [ 1, 2, 3, 4, 5 ];
      var obj2 = vitals.fill(obj1, 6, 0, 3);
      assert( obj2[0] === 6 );
      assert( obj2[1] === 6 );
      assert( obj2[2] === 6 );
      assert( obj2[3] === 4 );
      assert( obj2[4] === 5 );
      assert( obj2 === obj1 );
      assert( obj2.length === 5 );
    });

    test('<array>', 6, 0, -3, function() {
      var obj1 = [ 1, 2, 3, 4, 5 ];
      var obj2 = vitals.fill(obj1, 6, 0, -3);
      assert( obj2[0] === 6 );
      assert( obj2[1] === 6 );
      assert( obj2[2] === 3 );
      assert( obj2[3] === 4 );
      assert( obj2[4] === 5 );
      assert( obj2 === obj1 );
      assert( obj2.length === 5 );
    });

    test('<array>', 6, -3, -1, function() {
      var obj1 = [ 1, 2, 3, 4, 5 ];
      var obj2 = vitals.fill(obj1, 6, -3, -1);
      assert( obj2[0] === 1 );
      assert( obj2[1] === 2 );
      assert( obj2[2] === 6 );
      assert( obj2[3] === 6 );
      assert( obj2[4] === 5 );
      assert( obj2 === obj1 );
      assert( obj2.length === 5 );
    });
  });

  should('fill new string with val x times', function() {

    test(3, 'str', function() {
      var str = vitals.fill(3, '-str-');
      assert( str === '-str--str--str-' );
    });

    test(5, 5, function() {
      var str = vitals.fill(5, 5);
      assert( str === '55555' );
    });

    test(0, 5, function() {
      var str = vitals.fill(0, 5);
      assert( str === '' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fill();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.fill({});
      }, validErr);
    });

    test(false, 5, function() {
      assert.throws(function() {
        vitals.fill(false, 5);
      }, validTypeErr);
    });

    test([], 'keys', 'val', function() {
      assert.throws(function() {
        vitals.fill([], 'keys', 'val');
      }, validTypeErr);
    });
  });
});
