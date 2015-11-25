/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - REMAP.STRING
 * -----------------------------------------------------------------------------
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/blob/master/src/methods/remap.js}
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

describe('vitals.remap.string (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = 'should work same as String.prototype.replace with flexible params';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('abc123a1b2c3', 3, 5);
      it(title, function() {
        var str = vitals.remap.str('abc123a1b2c3', 3, 5);
        assert( str === 'abc123a1b2c3'.replace('3', '5') );
      });

      title = callStr('abc123a1b2c3', /[a-z]/, 'z');
      it(title, function() {
        var str = vitals.remap.str('abc123a1b2c3', /[a-z]/, 'z');
        assert( str === 'abc123a1b2c3'.replace(/[a-z]/, 'z') );
      });

    });

    title = titleStr('should correctly bind the replacer');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /a/, '<replacer>', '<thisArg>');
      it(title, function() {
        var replacer = function(match) {
          this[match] = true;
          return match;
        };
        var thisArg = {};
        vitals.remap.str('abc123a1b2c3', /a/, replacer, thisArg);
        assert( thisArg.a === true );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.remap.str();
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.remap.str('str');
        });
      });

      title = callStr('str', 'z');
      it(title, function() {
        assert.throws(function() {
          vitals.remap.str('str', 'z');
        });
      });

      title = callStr(null, 'a', 'z');
      it(title, function() {
        assert.throws(function() {
          vitals.remap.str(null, 'a', 'z');
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
  return testCall('remap.str', arguments, 5, true);
}
