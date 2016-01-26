/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FUSE.VALUE.START
 * -----------------------------------------------------------------------------
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fuse.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.fuse.value.start (section:base)', function() {
  var title;

  describe('object tests', function() {

    title = titleStr('should add new props to dest obj');
    describe(title, function() {

      title = callStr({ a: 1 }, 'a');
      it(title, function() {
        var obj = vitals.fuse.val.top({ a: 1 }, 'a');
        assert( obj.a === 1 );
      });

      title = callStr({ a: 1 }, { a: 10, z: 10 });
      it(title, function() {
        var obj = { a: 10, z: 10 };
        var dest = vitals.fuse.val.top({ a: 1 }, obj);
        assert( dest.a === 1 );
        assert( has(dest, obj) );
        assert( dest[obj] === undefined );
      });

      title = callStr({ a: 1 }, 'z');
      it(title, function() {
        var obj = vitals.fuse.val.top({ a: 1 }, 'z');
        assert( obj.a === 1 );
        assert( has(obj, 'z') );
        assert( obj.z === undefined );
      });

      title = callStr({ a: 1 }, 'a', 'b', 'c', null);
      it(title, function() {
        var obj = vitals.fuse.val.top({ a: 1 }, 'a', 'b', 'c', null);
        assert( obj.a === 1 );
        each([ 'b','c','null' ], function(key) {
          assert( has(obj, key) );
          assert( obj[key] === undefined );
        });
      });

      title = callStr({ a: 1 }, [ 'a', 'b', 'c' ]);
      it(title, function() {
        var arr = [ 'a', 'b', 'c' ];
        var obj = vitals.fuse.val.top({ a: 1 }, arr);
        assert( obj.a === 1 );
        assert( has(obj, arr) );
        assert( obj[arr] === undefined );
      });

    });

  });

  describe('array tests', function() {

    title = titleStr('should unshift new properties to dest array');
    describe(title, function() {

      title = callStr([ 8 ], 5);
      it(title, function() {
        var arr = vitals.fuse.val.top([ 8 ], 5);
        assert( arr.length === 2 );
        assert( arr[0] === 5 );
        assert( arr[1] === 8 );
      });

      title = callStr([ 8 ], [ 5 ]);
      it(title, function() {
        var arr = [ 5 ];
        var dest = vitals.fuse.val.top([ 8 ], arr);
        assert( dest.length === 2 );
        assert( dest[0] === arr );
        assert( dest[1] === 8 );
      });

      title = callStr([ 8 ], 5, true, null);
      it(title, function() {
        var arr = vitals.fuse.val.top([ 8 ], 5, true, null);
        assert( arr.length === 4 );
        assert( arr[0] === null );
        assert( arr[1] === true );
        assert( arr[2] === 5 );
        assert( arr[3] === 8 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should append strings to dest string');
    describe(title, function() {

      title = callStr('z', 5);
      it(title, function() {
        var str = vitals.fuse.val.top('z', 5);
        assert( str === '5z' );
      });

      title = callStr('z', 'a', 5);
      it(title, function() {
        var str = vitals.fuse.val.top('z', 'a', 5);
        assert( str === '5az' );
      });

      title = callStr('z', [ 'a', 5 ]);
      it(title, function() {
        var str = vitals.fuse.val.top('z', [ 'a', 5 ]);
        assert( str === 'a,5z' );
      });

      title = callStr('z', 5, [ 'a', 'b' ]);
      it(title, function() {
        var str = vitals.fuse.val.top('z', 5, [ 'a', 'b' ]);
        assert( str === 'a,b5z' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.val.top();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.val.top({});
        });
      });

      title = callStr(null, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.val.top(null, 5);
        });
      });

    });
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 4, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('fuse.val.top', arguments, 5, true);
}
