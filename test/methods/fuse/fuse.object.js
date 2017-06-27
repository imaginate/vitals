/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fuse.object
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

method('fuse.object', 'fuse.obj', function() {

  should('merge all obj props to dest obj', function() {

    test({ a: 1 }, { a: 10, z: 10 }, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.obj(dest, { a: 10, z: 10 });
      assert( obj.a === 10 );
      assert( obj.z === 10 );
      assert( obj === dest );
    });

    test({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 }, function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.obj(dest, { a: 5 }, { b: 5 }, null, { c: 5 });
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      assert( obj.c === 5 );
      assert( obj === dest );
    });

    test({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ], function() {
      var dest = { a: 1 };
      var obj = vitals.fuse.obj(dest, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
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
      var obj = vitals.fuse.obj(dest, 'z');
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
      var obj = vitals.fuse.obj(dest, 'a', null, 'b'); // `null` values are skipped
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
      var obj = vitals.fuse.obj(dest, [ 'a', 'b' ]);
      assert( obj === dest );
      assert( hasOwn(obj, 'a') );
      assert( hasOwn(obj, 'b') );
      assert( obj.a === undefined );
      assert( obj.b === undefined );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fuse.obj();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.fuse.obj({});
      }, validErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.fuse.obj(null, 5);
      }, validTypeErr);
    });

    test('str', 5, function() {
      assert.throws(function() {
        vitals.fuse.obj('str', 5);
      }, validTypeErr);
    });
  });
});
