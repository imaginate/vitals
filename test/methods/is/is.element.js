/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.ELEMENT
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
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.is.element (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr({ nodeType: 1 });
    it(title, function() {
      var elem = { nodeType: 1 };
      var result = vitals.is.elem(elem);
      assert( result === true );
    });

    title = callStr({ nodeType: 1 }, { nodeType: 1 }, { nodeType: 1 });
    it(title, function() {
      var elem1 = { nodeType: 1 };
      var elem2 = { nodeType: 1 };
      var elem3 = { nodeType: 1 };
      var result = vitals.is.elem(elem1, elem2, elem3);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is.elem(null);
      assert( result === false );
    });

    title = callStr({ nodeType: 1 }, { nodeType: 1 }, { nodeType: 3 });
    it(title, function() {
      var elem1 = { nodeType: 1 };
      var elem2 = { nodeType: 1 };
      var misc3 = { nodeType: 3 };
      var result = vitals.is.elem(elem1, elem2, misc3);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.elem();
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
  return testCall('is.elem', arguments, 3);
}
