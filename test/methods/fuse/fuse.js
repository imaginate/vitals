/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fuse
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fuse docs](https://github.com/imaginate/vitals/wiki/vitals.fuse)
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

method('fuse', function() {

  should('merge all obj props to dest obj', function() {

    test({ a: 1 }, { a: 10, z: 10 }, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse(dest, { a: 10, z: 10 });
      assert( obj.a === 10 );
      assert( obj.z === 10 );
      assert( obj === dest );
    });

    test({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 }, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse(dest, { a: 5 }, { b: 5 }, null, { c: 5 });
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      assert( obj.c === 5 );
      assert( obj === dest );
    });

    test({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ], function() {
      var dest = { a: 1 };
      var obj = vitals.fuse(dest, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      assert( obj.c === 5 );
      assert( obj === dest );
    });
  });

  should('add new props to dest obj', function() {

    test({ a: 1 }, 'z', function() {
      var dest = { a: 1 };
      assert(  hasOwn(dest, 'a') );
      assert( !hasOwn(dest, 'z') );
      var obj = vitals.fuse(dest, 'z');
      assert( obj === dest );
      assert( hasOwn(obj, 'a') );
      assert( hasOwn(obj, 'z') );
      assert( obj.a === 1 );
      assert( obj.z === undefined );
    });

    test({ a: 1 }, 'a', null, 'b', function() {
      var dest = { a: 1 };
      assert(  hasOwn(dest, 'a') );
      assert( !hasOwn(dest, 'b') );
      var obj = vitals.fuse(dest, 'a', null, 'b'); // `null` values are skipped
      assert( obj === dest );
      assert( hasOwn(obj, 'a') );
      assert( hasOwn(obj, 'b') );
      assert( obj.a === undefined );
      assert( obj.b === undefined );
    });

    test({ a: 1 }, [ 'a', 'b' ], function() {
      var dest = { a: 1 };
      assert(  hasOwn(dest, 'a') );
      assert( !hasOwn(dest, 'b') );
      var obj = vitals.fuse(dest, [ 'a', 'b' ]);
      assert( obj === dest );
      assert( hasOwn(obj, 'a') );
      assert( hasOwn(obj, 'b') );
      assert( obj.a === undefined );
      assert( obj.b === undefined );
    });
  });

  should('push new properties to dest array', function() {

    test([], 5, function() {
      var dest = [];
      var arr = vitals.fuse(dest, 5);
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 5 );
      assert( arr.length === 1 );
    });

    test([], 5, true, null, function() {
      var dest = [];
      var arr = vitals.fuse(dest, 5, true, null); // `null` values are skipped
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 5 );
      assert( arr[1] === true );
      assert( arr.length === 2 );
    });
  });

  should('concatenate arrays to dest array', function() {

    test([], [ 5 ], function() {
      var dest = [];
      var arr = vitals.fuse(dest, [ 5 ]);
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr.length === 1 );
    });

    test([], [ 5, true, null ], function() {
      var dest = [];
      var arr = vitals.fuse(dest, [ 5, true, null ]);
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr[1] === true );
      assert( arr[2] === null );
      assert( arr.length === 3 );
    });

    test([], [ 5 ], [ 6 ], null, function() {
      var dest = [];
      var arr = vitals.fuse(dest, [ 5 ], [ 6 ], null); // `null` values are skipped
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr[1] === 6 );
      assert( arr.length === 2 );
    });
  });

  should('append strings to dest string', function() {

    test('', 5, function() {
      var str = vitals.fuse('', 5);
      assert( str === '5' );
    });

    test('', 'a', 5, function() {
      var str = vitals.fuse('', 'a', 5);
      assert( str === 'a5' );
    });

    test('', [ 'a', 5 ], function() {
      var str = vitals.fuse('', [ 'a', 5 ]);
      assert( str === 'a5' );
    });

    test('', 5, [ 'a', 'b' ], function() {
      var str = vitals.fuse('', 5, [ 'a', 'b' ]);
      assert( str === '5a,b' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fuse();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.fuse({});
      }, validErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.fuse(null, 5);
      }, validTypeErr);
    });
  });
});
