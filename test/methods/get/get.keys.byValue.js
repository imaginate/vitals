/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.KEYS.BY-VALUE
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

describe('vitals.get.keys.byValue (section:base)', function() {
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

    title = titleStr('should return array of keys where value === val');
    describe(title, function() {

      title = callStr('<object>', 1);
      it(title, function() {
        var vals = vitals.get.keys.byValue(newObj(), 1);
        assert( vals.length === 0 );
      });

      title = callStr('<object>', '1');
      it(title, function() {
        var vals = vitals.get.keys.byValue(newObj(), '1');
        assert( vals.length === 1 );
        assert( vals[0] === 'a1' );
      });

      title = callStr('<object>', 5);
      it(title, function() {
        var vals = vitals.get.keys.byValue(newObj(), 5);
        assert( vals.length === 1 );
        assert( vals[0] === '2' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byValue();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byValue({});
        });
      });

      title = callStr(null, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byValue(null, 5);
        });
      });

      title = callStr('str', 5);
      it(title, function() {
        assert.throws(function() {
          vitals.get.keys.byValue('str', 5);
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
  return testCall('get.keys.byValue', arguments, 5, true);
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
