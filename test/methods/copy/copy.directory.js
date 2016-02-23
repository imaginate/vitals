/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.directory
 * -----------------------------------------------------------------------------
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

if (BROWSER_TESTS) return;

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files
var fs = require('fs');

describe('vitals.copy.directory (section:fs)', function() {
  var title;

  title = titleStr('should shallowly copy files from dir to dir');
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir1': null });
    });
    after('clean up dummy dirs and files', rmDummy);

    title = callStr('', 'subdir1');
    it(title, function() {
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

    title = callStr('', 'subdir2/');
    it(title, function() {
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

  title = titleStr('should deeply copy files from dir to dir');
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({
        'subdir1': files,
        'subdir2': files,
        'root':    files
      });
    });
    after('clean up dummy dirs and files', rmDummy);

    title = callStr('', 'subdir/', true);
    it(title, function() {
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

  title = titleStr('should throw an error');
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir1': null });
    });
    after('clean up dummy dirs and files', rmDummy);

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.dir();
      }, validTypeErr);
    });

    title = callStr('');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.dir(BASE);
      }, validTypeErr);
    });

    title = callStr('', 'invalid');
    it(title, function() {
      assert.throws(function() {
        var dest = addBase('invalid');
        vitals.copy.dir(BASE, dest);
      }, validTypeErr);
    });

    title = callStr('invalid', 'subdir1');
    it(title, function() {
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
  if (arguments.length) {
    if (arguments.length > 1) arguments[1] = addBase(arguments[1]);
    arguments[0] = addBase(arguments[0]);
  }
  return testCall('copy.dir', arguments, 3);
}

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
