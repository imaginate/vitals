/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.DOCUMENT
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

describe('vitals.is.document (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr({ nodeType: 9 });
    it(title, function() {
      var doc = { nodeType: 9 };
      var result = vitals.is.doc(doc);
      assert( result === true );
    });

    title = callStr({ nodeType: 9 }, { nodeType: 9 }, { nodeType: 9 });
    it(title, function() {
      var doc1 = { nodeType: 9 };
      var doc2 = { nodeType: 9 };
      var doc3 = { nodeType: 9 };
      var result = vitals.is.doc(doc1, doc2, doc3);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is.doc(null);
      assert( result === false );
    });

    title = callStr({ nodeType: 9 }, { nodeType: 9 }, { nodeType: 3 });
    it(title, function() {
      var doc1 = { nodeType: 9 };
      var doc2 = { nodeType: 9 };
      var obj3 = { nodeType: 3 };
      var result = vitals.is.doc(doc1, doc2, obj3);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.doc();
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
  return testCall('is.doc', arguments, 3);
}
