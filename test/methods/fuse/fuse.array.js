/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FUSE.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/wiki/vitals.fuse}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.fuse.array (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should push new properties to dest array');
    describe(title, function() {

      title = callStr([], 5);
      it(title, function() {
        var arr = vitals.fuse.arr([], 5);
        assert( arr.length === 1 );
        assert( arr[0] === 5 );
      });

      title = callStr([], 5, true, null);
      it(title, function() {
        var arr = vitals.fuse.arr([], 5, true, null);
        assert( arr.length === 2 );
        assert( arr[0] === 5 );
        assert( arr[1] === true );
      });

    });

    title = titleStr('should concatenate arrays to dest array');
    describe(title, function() {

      title = callStr([], [ 5 ]);
      it(title, function() {
        var arr = vitals.fuse.arr([], [ 5 ]);
        assert( arr.length === 1 );
        assert( arr[0] === 5 );
      });

      title = callStr([], [ 5, true, null ]);
      it(title, function() {
        var arr = vitals.fuse.arr([], [ 5, true, null ]);
        assert( arr.length === 3 );
        assert( arr[0] === 5 );
        assert( arr[1] === true );
        assert( arr[2] === null );
      });

      title = callStr([], [ 5 ], [ 6 ], null);
      it(title, function() {
        var arr = vitals.fuse.arr([], [ 5 ], [ 6 ], null);
        assert( arr.length === 2 );
        assert( arr[0] === 5 );
        assert( arr[1] === 6 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.arr();
        });
      });

      title = callStr([]);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.arr([]);
        });
      });

      title = callStr({}, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.arr({}, 5);
        });
      });

      title = callStr(null, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.arr(null, 5);
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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('fuse.arr', arguments, 4);
}
