/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.KEYS
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
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

describe('vitals.get.keys (section:base)', function() {
  var title;

  describe('basic tests', function() {

    // newObj()= {
    //   'a':  'd',
    //   'b':  'e',
    //   'c':  'f',
    //   '1':   4,
    //   '2':   5,
    //   '3':   6,
    //   'a1': '1',
    //   'b2': '2',
    //   'c3': '3'
    // }

    title = titleStr('should return array of all keys');
    describe(title, function() {

      title = callStr('<object>');
      it(title, function() {
        var keys = vitals.get.keys( newObj() ).sort();
        assert( keys.length === 9 );
        each(newObj(true).sort(), function(key, i) {
          assert( keys[i] === key );
        });
      });

    });

    title = titleStr('should return array of keys where key matches val');
    describe(title, function() {

      title = callStr('<object>', /^[a-z]$/);
      it(title, function() {
        var vals = vitals.get.keys(newObj(), /^[a-z]$/).sort();
        assert( vals.length === 3 );
        each([ 'a','b','c' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

    });

    title = titleStr('should return array of keys where value === val');
    describe(title, function() {

      title = callStr('<object>', 5);
      it(title, function() {
        var vals = vitals.get.keys(newObj(), 5);
        assert( vals.length === 1 );
        assert( vals[0] === '2' );
      });

      title = callStr('<object>', 10);
      it(title, function() {
        var vals = vitals.get.keys(newObj(), 10);
        assert( vals.length === 0 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys();
        });
      });

      title = callStr(null);
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys(null);
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys('str');
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
  return testCall('get.keys', arguments, 4);
}

/**
 * @private
 * @param {boolean=} keys
 * @return {!Object}
 */
function newObj(keys) {
  return keys
    ? [ 'a', 'b', 'c', '1', '2', '3', 'a1', 'b2', 'c3' ]
    : {
      'a':  'd',
      'b':  'e',
      'c':  'f',
      '1':   4,
      '2':   5,
      '3':   6,
      'a1': '1',
      'b2': '2',
      'c3': '3'
    };
}
