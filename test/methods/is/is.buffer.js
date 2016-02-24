/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.BUFFER
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

if (BROWSER_TESTS) return;

describe('vitals.is.buffer (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('<Buffer>');
      it(title, function() {
        var buffer = newBuffer();
        var result = vitals.is.buf(buffer);
        assert( result === true );
      });

      title = callStr('<Buffer>', '<Buffer>', '<Buffer>');
      it(title, function() {
        var buf1 = newBuffer();
        var buf2 = newBuffer();
        var buf3 = newBuffer();
        var result = vitals.is.buf(buf1, buf2, buf3);
        assert( result === true );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr('fail');
      it(title, function() {
        var result = vitals.is.buf('fail');
        assert( result === false );
      });

      title = callStr('<Buffer>', '<Buffer>', null);
      it(title, function() {
        var buf1 = newBuffer();
        var buf2 = newBuffer();
        var result = vitals.is.buf(buf1, buf2, null);
        assert( result === false );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.is.buf();
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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('is.buf', arguments, 4);
}

/**
 * @private
 * @return {!Buffer}
 */
function newBuffer() {
  return new Buffer('test');
}
