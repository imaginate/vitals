/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.INDEXES
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/blob/master/src/methods/get.js}
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

describe('vitals.get.indexes (sections:js,base)', function() {
  var title;

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should return array of all indexes');
    describe(title, function() {

      title = callStr('<array>');
      it(title, function() {
        var inds = vitals.get.indexes( newArr() );
        assert( inds.length === 9 );
        each(9, function(i) {
          assert( inds[i] === i );
        });
      });

    });

    title = titleStr('should return array of indexes where value === val');
    describe(title, function() {

      title = callStr('<array>', 2);
      it(title, function() {
        var vals = vitals.get.indexes(newArr(), 2);
        assert( vals.length === 1 );
        assert( vals[0] === 4 );
      });

      title = callStr('<array>', '2');
      it(title, function() {
        var vals = vitals.get.indexes(newArr(), '2');
        assert( vals.length === 0 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should return array of indexes where substr matches val');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        var vals = vitals.get.indexes('abc123a1b2c3', /[a-z]/);
        assert( vals.length === 6 );
        each([ 0,1,2,6,8,10 ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        var vals = vitals.get.indexes('abc123a1b2c3', 5);
        assert( vals.length === 0 );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        var vals = vitals.get.indexes('abc123a1b2c3', 'a');
        assert( vals.length === 2 );
        assert( vals[0] === 0 );
        assert( vals[1] === 6 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.indexes();
        });
      });

      title = callStr(null);
      it(title, function() {
        assert.throws(function() {
          vitals.get.indexes(null);
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.get.indexes('str');
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
  return testCall('get.indexes', arguments, 5, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
