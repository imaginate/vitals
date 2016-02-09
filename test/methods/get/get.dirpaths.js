/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.DIRPATHS
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/get.js}
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

if (BROWSER_TESTS) return;

var fs = require('fs');

describe('vitals.get.dirpaths (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({
        'root':    files,
        'subdir1': files,
        'subdir2': files,
        'subdir3': files,
        'subdir': {
          'root':    files,
          'subdir1': files,
          'subdir2': files,
          'subdir3': files
        }
      });
    });

    title = titleStr('should shallowly return all of the dirs');
    describe(title, function() {

      title = callStr('');
      it(title, function() {
        var base = addBase('');
        var dirs = vitals.get.dirpaths(base);
        assert( is.arr(dirs) );
        assert( dirs.length === 4 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
      });

    });

    title = titleStr('should deeply return all of the dirs');
    describe(title, function() {

      title = callStr('', true);
      it(title, function() {
        var base = addBase('');
        var dirs = vitals.get.dirpaths(base, true);
        assert( is.arr(dirs) );
        assert( dirs.length === 7 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
        assert( has(dirs, 'subdir/subdir1') );
        assert( has(dirs, 'subdir/subdir2') );
        assert( has(dirs, 'subdir/subdir3') );
      });

      title = callStr('', { deep: true });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 7 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
        assert( has(dirs, 'subdir/subdir1') );
        assert( has(dirs, 'subdir/subdir2') );
        assert( has(dirs, 'subdir/subdir3') );
      });

      title = callStr('', { recursive: true });
      it(title, function() {
        var base = addBase('');
        var opts = { recursive: true };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 7 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
        assert( has(dirs, 'subdir/subdir1') );
        assert( has(dirs, 'subdir/subdir2') );
        assert( has(dirs, 'subdir/subdir3') );
      });

    });

    title = titleStr('should only return the valid dirs');
    describe(title, function() {

      title = callStr('', { validDirs: 'subdir' });
      it(title, function() {
        var base = addBase('');
        var opts = { validDirs: 'subdir' };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 1 );
        assert( has(dirs, 'subdir') );
      });

      title = callStr('', { validDirs: 'subdir*' });
      it(title, function() {
        var base = addBase('');
        var opts = { validDirs: 'subdir*' };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 4 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
      });

      title = callStr('', { validDirs: [ 'subdir1', 'subdir2' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { validDirs: [ 'subdir1', 'subdir2' ] };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 2 );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
      });

      title = callStr('', { validDirs: /^subdir[0-9]$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { validDirs: /^subdir[0-9]$/ };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 3 );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
      });

    });

    title = titleStr('should not return the invalid dirs');
    describe(title, function() {

      title = callStr('', { invalidDirs: 'subdir' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidDirs: 'subdir' };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 3 );
        assert( has(dirs, 'subdir1') );
        assert( has(dirs, 'subdir2') );
        assert( has(dirs, 'subdir3') );
      });

      title = callStr('', { invalidDirs: 'subdir*' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidDirs: 'subdir*' };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 0 );
      });

      title = callStr('', { invalidDirs: [ 'subdir1', 'subdir2' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidDirs: [ 'subdir1', 'subdir2' ] };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 2 );
        assert( has(dirs, 'subdir') );
        assert( has(dirs, 'subdir3') );
      });

      title = callStr('', { invalidDirs: /^subdir[0-9]$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidDirs: /^subdir[0-9]$/ };
        var dirs = vitals.get.dirpaths(base, opts);
        assert( is.arr(dirs) );
        assert( dirs.length === 1 );
        assert( has(dirs, 'subdir') );
      });

    });

    after('clean up dummy dirs and dirpathss', rmDummy);

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir': null });
    });

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.dirpaths();
        });
      });

      title = callStr('invalid');
      it(title, function() {
        assert.throws(function() {
          var base = addBase('invalid');
          vitals.get.dirpaths(base);
        });
      });

      title = callStr('', 'fail');
      it(title, function() {
        assert.throws(function() {
          var base = addBase('');
          vitals.get.dirpaths(base, 'fail');
        });
      });

      title = callStr('', { validDirs: false });
      it(title, function() {
        assert.throws(function() {
          var base = addBase('');
          var opts = { validDirs: false };
          vitals.get.dirpaths(base, opts);
        });
      });

      after('clean up dummy dirs and dirpathss', rmDummy);

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
function callStr(args) {
  args = remap(arguments, function(val, i) {
    return i ? val : addBase(val);
  });
  return testCall('get.dirpaths', args, 4);
}

/**
 * @private
 * @param {string=} dir
 * @return {string}
 */
function addBase(dir) {

  /** @type {string} */
  var base;

  base = cut(DUMMY.base, /\/$/);
  return dir ? fuse(base, '/', dir) : base;
}
