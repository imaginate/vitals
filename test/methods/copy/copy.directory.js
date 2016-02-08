/**
 * -----------------------------------------------------------------------------
 * VITALS TESTS - COPY.DIRECTORY
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/copy.js}
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

describe('vitals.copy.directory (section:fs)', function() {
  var title;
  var content = DUMMY.content;
  var fakes = [ 'fake1.js', 'fake2.js', 'fake3.js' ];

  title = 'should copy files from dir to dir';
  title = titleStr('basic', title);
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      mkDummy({ 'root': fakes, 'subdir1': null });
    });

    title = callStr('', 'subdir1');
    it(title, function() {
      var src = addBase('');
      var dest = addBase('subdir1');
      var files = vitals.copy.dir(src, dest);
      assert( is.arr(files) );
      each(fakes, function(fake) {
        assert( has(files, fake) );
        fake = fuse(dest, '/', fake);
        assert( is.file(fake) );
        fake = fs.readFileSync(fake, 'utf8');
        assert( fake === content );
      });
    });

    title = callStr('', 'subdir2/');
    it(title, function() {
      var src = addBase('');
      var dest = addBase('subdir2/');
      var files = vitals.copy.dir(src, dest);
      assert( is.arr(files) );
      each(fakes, function(fake) {
        assert( has(files, fake) );
        fake = fuse(dest, fake);
        assert( is.file(fake) );
        fake = fs.readFileSync(fake, 'utf8');
        assert( fake === content );
      });
    });

    title = callStr('', 'subdir3/', true);
    it(title, function() {
      var src = addBase('');
      var dest = addBase('subdir3/');
      var dirs = [ '', 'subdir1/', 'subdir2/' ];
      var files = vitals.copy.dir(src, dest, true);
      assert( is.arr(files) );
      each(dirs, function(dir) {
        each(fakes, function(fake) {
          fake = fuse(dir, fake);
          assert( has(files, fake) );
          fake = fuse(dest, fake);
          assert( is.file(fake) );
          fake = fs.readFileSync(fake, 'utf8');
          assert( fake === content );
        });
      });
    });

    after('clean up dummy dirs and files', rmDummy);

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.dir();
      });
    });

    title = callStr('dir1');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.dir('dir1');
      });
    });

    title = callStr('invalid', 'dest');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.dir('invalid', 'dest');
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 1);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr(args) {
  args = remap(arguments, function(val, i) {
    return i < 2 ? addBase(val) : val;
  });
  return testCall('copy.dir', args, 3);
}

/**
 * @private
 * @param {string} dir
 * @return {string}
 */
function addBase(dir) {

  /** @type {string} */
  var base;

  dir = dir ? fuse('/', dir) : '';
  base = cut(DUMMY.base, /\/$/);
  return fuse(base, dir);
}

/**
 * @private
 * @param {string} str
 * @return {string}
 */
function normalize(str) {
  return remap(str, /\r\n?/g, '\n');
}
