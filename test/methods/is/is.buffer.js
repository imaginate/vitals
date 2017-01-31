/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.buffer
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('is.buffer', 'is.buf', function() {

  should('return true', function() {

    test('<Buffer>', function() {
      var buffer = newBuffer();
      var result = vitals.is.buf(buffer);
      assert( result === true );
    });

    test('<Buffer>', '<Buffer>', '<Buffer>', function() {
      var buf1 = newBuffer();
      var buf2 = newBuffer();
      var buf3 = newBuffer();
      var result = vitals.is.buf(buf1, buf2, buf3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test('fail', function() {
      var result = vitals.is.buf('fail');
      assert( result === false );
    });

    test('<Buffer>', '<Buffer>', null, function() {
      var buf1 = newBuffer();
      var buf2 = newBuffer();
      var result = vitals.is.buf(buf1, buf2, null);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.buf();
      }, validErr);
    });
  });
});

/**
 * @private
 * @return {!Buffer}
 */
function newBuffer() {
  return new Buffer('test');
}
