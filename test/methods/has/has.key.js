/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - HAS.KEY
 * -----------------------------------------------------------------------------
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}
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

describe('vitals.has.key (sections:js,base)', function() {
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

    title = titleStr('should return true (key owned by obj)');
    describe(title, function() {

      title = callStr('<object>', 'a');
      it(title, function() {
        assert( vitals.has.key(newObj(), 'a') );
      });

      title = callStr('<object>', 1);
      it(title, function() {
        assert( vitals.has.key(newObj(), 1) );
      });

    });

    title = titleStr('should return false (key not owned by obj)');
    describe(title, function() {

      title = callStr(null);
      it(title, function() {
        assert( !vitals.has.key(null, 'key') );
      });

      title = callStr('<object>', 'd');
      it(title, function() {
        assert( !vitals.has.key(newObj(), 'd') );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.has.key();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.has.key({});
        });
      });

      title = callStr('str', 'key');
      it(title, function() {
        assert.throws(function() {
          vitals.has.key('str', 'key');
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
  return testCall('has.key', arguments, 5, true);
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
