/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FUSE.STRING
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

describe('vitals.fuse.string (sections:js,base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should append strings to dest string');
    describe(title, function() {

      title = callStr('', 5);
      it(title, function() {
        var str = vitals.fuse.str('', 5);
        assert( str === '5' );
      });

      title = callStr('', 'a', 5);
      it(title, function() {
        var str = vitals.fuse.str('', 'a', 5);
        assert( str === 'a5' );
      });

      title = callStr('', [ 'a', 5 ]);
      it(title, function() {
        var str = vitals.fuse.str('', [ 'a', 5 ]);
        assert( str === 'a5' );
      });

      title = callStr('', 5, [ 'a', 'b' ]);
      it(title, function() {
        var str = vitals.fuse.str('', 5, [ 'a', 'b' ]);
        assert( str === '5a,b' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.str();
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.str('str');
        });
      });

      title = callStr({}, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.str({}, 5);
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
  return testCall('fuse.str', arguments, 5, true);
}
