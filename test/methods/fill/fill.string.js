/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fill.string
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fill docs](https://github.com/imaginate/vitals/wiki/vitals.fill)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('fill.string', 'fill.str', function() {

  should('fill new string with val x times', function() {

    test(3, 'str', function() {
      var str = vitals.fill.str(3, '-str-');
      assert( str === '-str--str--str-' );
    });

    test(3, 5, function() {
      var str = vitals.fill.str(3, 5);
      assert( str === '555' );
    });

    test(0, 5, function() {
      var str = vitals.fill.str(0, 5);
      assert( str === '' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fill.str();
      }, validTypeErr);
    });

    test(5, function() {
      assert.throws(function() {
        vitals.fill.str(5);
      }, validErr);
    });

    test('fail', 'val', function() {
      assert.throws(function() {
        vitals.fill.str('fail', 'val');
      }, validTypeErr);
    });
  });
});
