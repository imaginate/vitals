/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.KEYS.BY-KEY
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

describe('vitals.get.keys.byKey (section:base)', function() {
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

    title = titleStr('should return array of keys where key matches pattern');
    describe(title, function() {

      title = callStr('<object>', /^[a-z]$/);
      it(title, function() {
        var vals = vitals.get.keys.byKey(newObj(), /^[a-z]$/).sort();
        assert( vals.length === 3 );
        each([ 'a','b','c' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('<object>', 'a');
      it(title, function() {
        var vals = vitals.get.keys.byKey(newObj(), 'a').sort();
        assert( vals.length === 2 );
        each([ 'a','a1' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('<object>', 1);
      it(title, function() {
        var vals = vitals.get.keys.byKey(newObj(), 1).sort();
        assert( vals.length === 2 );
        each([ '1','a1' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('<object>', 'd');
      it(title, function() {
        var vals = vitals.get.keys.byKey(newObj(), 'd');
        assert( vals.length === 0 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byKey();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byKey({});
        });
      });

      title = callStr(null, 'str');
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byKey(null, 'str');
        });
      });

      title = callStr('str', 'str');
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byKey('str', 'str');
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
  return testCall('get.keys.byKey', arguments, 5, true);
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
