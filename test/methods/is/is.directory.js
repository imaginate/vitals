/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.directory
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

var addBase = DUMMY.addBase;

method('is.directory', 'is.dir', function() {

  before('setup dummy dirs and files', function() {
    mkDummy({ 'subdir1': null, 'subdir2': null, 'subdir3': null });
  });

  after('clean up dummy dirs and files', rmDummy);

  should('return true', function() {

    test('subdir1', function() {
      var dir = addBase('subdir1');
      var result = vitals.is.dir(dir);
      assert( result === true );
    });

    test('subdir1', 'subdir2', 'subdir3', function() {
      var dir1 = addBase('subdir1');
      var dir2 = addBase('subdir2');
      var dir3 = addBase('subdir3');
      var result = vitals.is.dir(dir1, dir2, dir3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.dir(null);
      assert( result === false );
    });

    test('invalid', function() {
      var dir = addBase('invalid');
      var result = vitals.is.dir(dir);
      assert( result === false );
    });

    test('subdir1', 'invalid', 'subdir3', function() {
      var dir1 = addBase('subdir1');
      var dir2 = addBase('invalid');
      var dir3 = addBase('subdir3');
      var result = vitals.is.dir(dir1, dir2, dir3);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.dir();
      }, validErr);
    });
  });
});
