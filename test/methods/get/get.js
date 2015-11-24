/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET
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

describe('vitals.get (sections:js,base)', function() {
  var title;

  describe('object tests', function() {

    title = titleStr('should ');
    describe(title, function() {

      title = callStr();
      it(title, function() {
        // ...
      });

    });

  });

  describe('array tests', function() {

    title = titleStr('should ');
    describe(title, function() {

      title = callStr();
      it(title, function() {
        // ...
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should ');
    describe(title, function() {

      title = callStr();
      it(title, function() {
        // ...
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get();
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
  return testCall('get', arguments, 5, true);
}
