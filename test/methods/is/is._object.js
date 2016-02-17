/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS._OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/wiki/vitals.is}
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

describe('vitals.is._object (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr({});
    it(title, function() {
      var result = vitals.is._obj({});
      assert( result === true );
    });

    title = callStr(function(){}, {}, {});
    it(title, function() {
      var result = vitals.is._obj(function(){}, {}, {});
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is._obj(null);
      assert( result === false );
    });

    title = callStr(function(){}, {}, undefined);
    it(title, function() {
      var result = vitals.is._obj(function(){}, {}, undefined);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is._obj();
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
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('is._obj', arguments, 3);
}
