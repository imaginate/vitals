/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fuse.value
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fuse docs](https://github.com/imaginate/vitals/wiki/vitals.fuse)
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

method('fuse.value', 'fuse.val', function() {

  should('add new props to dest obj', function() {

    test({ a: 1 }, { a: 10, z: 10 }, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.val(dest, { a: 10, z: 10 });
      assert( obj === dest );
      assert(  hasOwn(dest, 'a') );
      assert( !hasOwn(dest, 'z') );
      assert(  hasOwn(dest, '[object Object]') );
      assert( obj.a === 1 );
      assert( obj['[object Object]'] === undefined );
    });

    test({ a: 1 }, 'z', function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.val(dest, 'z');
      assert( obj === dest );
      assert( hasOwn(dest, 'a') );
      assert( hasOwn(dest, 'z') );
      assert( obj.a === 1 );
      assert( obj.z === undefined );
    });

    test({ a: 1 }, 'a', 'b', null, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.val(dest, 'a', 'b', null);
      assert( obj === dest );
      assert( hasOwn(dest, 'a') );
      assert( hasOwn(dest, 'b') );
      assert( hasOwn(dest, 'null') );
      assert( obj.a === undefined );
      assert( obj.b === undefined );
      assert( obj['null'] === undefined );
    });

    test({ a: 1 }, [ 'a', 'b' ], function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.val(dest, [ 'a', 'b' ]);
      assert( obj === dest );
      assert(  hasOwn(dest, 'a') );
      assert( !hasOwn(dest, 'b') );
      assert(  hasOwn(dest, 'a,b') );
      assert( obj.a === 1 );
      assert( obj['a,b'] === undefined );
    });
  });

  should('push new properties to dest array', function() {

    test([ 1 ], 5, function() {
      var dest = [ 1 ];
      var arr = vitals.fuse.val(dest, 5);
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 1 );
      assert( arr[1] === 5 );
      assert( arr.length === 2 );
    });

    test([ 1 ], 5, true, null, function() {
      var dest = [ 1 ];
      var arr = vitals.fuse.val(dest, 5, true, null);
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 1 );
      assert( arr[1] === 5 );
      assert( arr[2] === true );
      assert( arr[3] === null );
      assert( arr.length === 4 );
    });

    test([ 1 ], [ 5, true, null ], function() {
      var dest = [ 1 ];
      var prop = [ 5, true, null ];
      var arr = vitals.fuse.val(dest, prop);
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 1 );
      assert( arr[1] === prop );
      assert( arr.length === 2 );
    });
  });

  should('append values to dest string', function() {

    test('v', 5, function() {
      var str = vitals.fuse.val('v', 5);
      assert( str === 'v5' );
    });

    test('v', 'a', 5, function() {
      var str = vitals.fuse.val('v', 'a', 5);
      assert( str === 'va5' );
    });

    test('v', [ 'a', 5 ], function() {
      var str = vitals.fuse.val('v', [ 'a', 5 ]);
      assert( str === 'va,5' );
    });

    test('v', 5, [ 'a', 'b' ], function() {
      var str = vitals.fuse.val('v', 5, [ 'a', 'b' ]);
      assert( str === 'v5a,b' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fuse.val();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.fuse.val({});
      }, validErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.fuse.val(null, 5);
      }, validTypeErr);
    });
  });
});
