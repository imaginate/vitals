/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.file
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

method('is.file', function() {

  before('setup dummy dirs and files', function() {
    mkDummy([ 'file1.js', 'file2.js', 'file3.js' ]);
  });

  after('clean up dummy dirs and files', rmDummy);

  should('return true', function() {

    test('file1.js', function() {
      var file = addBase('file1.js');
      var result = vitals.is.file(file);
      assert( result === true );
    });

    test('file1.js', 'file2.js', 'file3.js', function() {
      var file1 = addBase('file1.js');
      var file2 = addBase('file2.js');
      var file3 = addBase('file3.js');
      var result = vitals.is.file(file1, file2, file3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.file(null);
      assert( result === false );
    });

    test('fail.js', function() {
      var file = addBase('fail.js');
      var result = vitals.is.file(file);
      assert( result === false );
    });

    test('file1.js', 'fail.js', 'file3.js', function() {
      var file1 = addBase('file1.js');
      var file2 = addBase('fail.js');
      var file3 = addBase('file3.js');
      var result = vitals.is.file(file1, file2, file3);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.file();
      }, validErr);
    });
  });
});
