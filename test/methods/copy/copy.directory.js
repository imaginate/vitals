/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.directory
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
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

if (BROWSER_TESTS) return;

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files
var fs = require('fs');

method('copy.directory', function() {
  this.slow(25);

  should('shallowly copy files from dir to dir', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir1': null });
    });

    after('clean up dummy dirs and files', rmDummy);

    test('', 'subdir1', function() {
      var dest  = addBase('subdir1');
      var files = vitals.copy.dir(BASE, dest);
      assert( is.arr(files) );
      assert( files.length === 3 );
      assert( hasVal(files, 'file1.js') );
      assert( hasVal(files, 'file2.js') );
      assert( hasVal(files, 'file3.js') );
      assert( validFile(dest + '/file1.js') );
      assert( validFile(dest + '/file2.js') );
      assert( validFile(dest + '/file3.js') );
    });

    test('', 'subdir2/', function() {
      var dest = addBase('subdir2/');
      var files = vitals.copy.dir(BASE, dest);
      assert( is.arr(files) );
      assert( files.length === 3 );
      assert( hasVal(files, 'file1.js') );
      assert( hasVal(files, 'file2.js') );
      assert( hasVal(files, 'file3.js') );
      assert( validFile(dest + 'file1.js') );
      assert( validFile(dest + 'file2.js') );
      assert( validFile(dest + 'file3.js') );
    });
  });

  should('deeply copy files from dir to dir', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({
        'subdir1': files,
        'subdir2': files,
        'root':    files
      });
    });

    after('clean up dummy dirs and files', rmDummy);

    test('', 'subdir/', true, function() {
      var dest = addBase('subdir/');
      var files = vitals.copy.dir(BASE, dest, true);
      assert( is.arr(files) );
      assert( files.length === 9 );
      assert( hasVal(files, 'file1.js') );
      assert( hasVal(files, 'file2.js') );
      assert( hasVal(files, 'file3.js') );
      assert( hasVal(files, 'subdir1/file1.js') );
      assert( hasVal(files, 'subdir1/file2.js') );
      assert( hasVal(files, 'subdir1/file3.js') );
      assert( hasVal(files, 'subdir2/file1.js') );
      assert( hasVal(files, 'subdir2/file2.js') );
      assert( hasVal(files, 'subdir2/file3.js') );
      assert( validFile(dest + 'file1.js') );
      assert( validFile(dest + 'file2.js') );
      assert( validFile(dest + 'file3.js') );
      assert( validFile(dest + 'subdir1/file1.js') );
      assert( validFile(dest + 'subdir1/file2.js') );
      assert( validFile(dest + 'subdir1/file3.js') );
      assert( validFile(dest + 'subdir2/file1.js') );
      assert( validFile(dest + 'subdir2/file2.js') );
      assert( validFile(dest + 'subdir2/file3.js') );
    });
  });

  should('throw an error', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir1': null });
    });

    after('clean up dummy dirs and files', rmDummy);

    test(function() {
      assert.throws(function() {
        vitals.copy.dir();
      }, validTypeErr);
    });

    test('', function() {
      assert.throws(function() {
        vitals.copy.dir(BASE);
      }, validTypeErr);
    });

    test('', 'invalid', function() {
      assert.throws(function() {
        var dest = addBase('invalid');
        vitals.copy.dir(BASE, dest);
      }, validTypeErr);
    });

    test('invalid', 'subdir1', function() {
      assert.throws(function() {
        var src = addBase('invalid');
        var dest = addBase('subdir1');
        vitals.copy.dir(src, dest);
      }, validTypeErr);
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string=} dir
 * @return {string}
 */
function addBase(dir) {
  return dir ? BASE + '/' + dir : BASE;
}

/**
 * @private
 * @param {string} filepath
 * @return {boolean}
 */
function validFile(filepath) {

  /** @type {string} */
  var content;

  if ( !isFile(filepath) ) return false;

  content = fs.readFileSync(filepath, 'utf8');
  return CONTENT === content;
}
