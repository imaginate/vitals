/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fuse.string
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fuse docs](https://github.com/imaginate/vitals/wiki/vitals.fuse)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('fuse.string', 'fuse.str', function() {

  should('append values to dest string', function() {

    test('', 5, function() {
      var str = vitals.fuse.str('', 5);
      assert( str === '5' );
    });

    test('', 'a', 5, function() {
      var str = vitals.fuse.str('', 'a', 5);
      assert( str === 'a5' );
    });

    test('', [ 'a', 5 ], function() {
      var str = vitals.fuse.str('', [ 'a', 5 ]);
      assert( str === 'a5' );
    });

    test('', 5, [ 'a', 'b' ], function() {
      var str = vitals.fuse.str('', 5, [ 'a', 'b' ]);
      assert( str === '5a,b' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fuse.str();
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.fuse.str('str');
      }, validErr);
    });

    test({}, 5, function() {
      assert.throws(function() {
        vitals.fuse.str({}, 5);
      }, validTypeErr);
    });
  });
});
