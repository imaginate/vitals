/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.DATE
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

describe('vitals.is.date (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr( new Date() );
    it(title, function() {
      var date = new Date();
      var result = vitals.is.date(date);
      assert( result === true );
    });

    title = callStr(new Date(), new Date(), new Date());
    it(title, function() {
      var date1 = new Date();
      var date2 = new Date();
      var date3 = new Date();
      var result = vitals.is.date(date1, date2, date3);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is.date(null);
      assert( result === false );
    });

    title = callStr(new Date(), new Date(), {});
    it(title, function() {
      var date1 = new Date();
      var date2 = new Date();
      var result = vitals.is.date(date1, date2, {});
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.date();
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
  return testCall('is.date', arguments, 3);
}
