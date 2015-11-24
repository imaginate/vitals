/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FUSE
 * -----------------------------------------------------------------------------
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fuse.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.fuse (sections:js,base)', function() {
  var title;

  describe('object tests', function() {

    title = titleStr('should merge all obj props to dest obj');
    describe(title, function() {

      title = callStr({ a: 1 }, { a: 10, z: 10 });
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, { a: 10, z: 10 });
        assert( obj.a === 10 );
        assert( obj.z === 10 );
      });

      title = callStr({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 });
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 });
        assert( obj.a === 5 );
        assert( obj.b === 5 );
        assert( obj.c === 5 );
      });

      title = callStr({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
        assert( obj.a === 5 );
        assert( obj.b === 5 );
        assert( obj.c === 5 );
      });

    });

    title = titleStr('should add new props to dest obj');
    describe(title, function() {

      title = callStr({ a: 1 }, 'z');
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, 'z');
        assert( obj.a === 1 );
        assert( has(obj, 'z') );
        assert( obj.z === undefined );
      });

      title = callStr({ a: 1 }, 'a', 'b', 'c', null);
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, 'a', 'b', 'c', null);
        each([ 'a','b','c' ], function(key) {
          assert( has(obj, key) );
          assert( obj[key] === undefined );
        });
      });

      title = callStr({ a: 1 }, [ 'a', 'b', 'c' ]);
      it(title, function() {
        var obj = vitals.fuse({ a: 1 }, [ 'a', 'b', 'c' ]);
        each([ 'a','b','c' ], function(key) {
          assert( has(obj, key) );
          assert( obj[key] === undefined );
        });
      });

    });

  });

  describe('array tests', function() {

    title = titleStr('should push new properties to dest array');
    describe(title, function() {

      title = callStr([], 5);
      it(title, function() {
        var arr = vitals.fuse([], 5);
        assert( arr.length === 1 );
        assert( arr[0] === 5 );
      });

      title = callStr([], 5, true, null);
      it(title, function() {
        var arr = vitals.fuse([], 5, true, null);
        assert( arr.length === 2 );
        assert( arr[0] === 5 );
        assert( arr[1] === true );
      });

    });

    title = titleStr('should concatenate arrays to dest array');
    describe(title, function() {

      title = callStr([], [ 5 ]);
      it(title, function() {
        var arr = vitals.fuse([], [ 5 ]);
        assert( arr.length === 1 );
        assert( arr[0] === 5 );
      });

      title = callStr([], [ 5, true, null ]);
      it(title, function() {
        var arr = vitals.fuse([], [ 5, true, null ]);
        assert( arr.length === 3 );
        assert( arr[0] === 5 );
        assert( arr[1] === true );
        assert( arr[2] === null );
      });

      title = callStr([], [ 5 ], [ 6 ], null);
      it(title, function() {
        var arr = vitals.fuse([], [ 5 ], [ 6 ], null);
        assert( arr.length === 2 );
        assert( arr[0] === 5 );
        assert( arr[1] === 6 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should append strings to dest string');
    describe(title, function() {

      title = callStr('', 5);
      it(title, function() {
        var str = vitals.fuse('', 5);
        assert( str === '5' );
      });

      title = callStr('', 'a', 5);
      it(title, function() {
        var str = vitals.fuse('', 'a', 5);
        assert( str === 'a5' );
      });

      title = callStr('', [ 'a', 5 ]);
      it(title, function() {
        var str = vitals.fuse('', [ 'a', 5 ]);
        assert( str === 'a5' );
      });

      title = callStr('', 5, [ 'a', 'b' ]);
      it(title, function() {
        var str = vitals.fuse('', 5, [ 'a', 'b' ]);
        assert( str === '5a,b' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fuse();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.fuse({});
        });
      });

      title = callStr(null, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse(null, 5);
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
  return testCall('fuse', arguments, 5, true);
}
