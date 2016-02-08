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
  var content = '// test\n';
  var fakes = [ 'fake1.js', 'fake2.js', 'fake3.js' ];

  title = 'should copy files from dir to dir';
  title = titleStr('basic', title);
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      var base = './test/dummy/';
      fs.mkdirSync(base);
      each(fakes, function(fake) {
        fake = fuse(base, fake);
        fs.writeFileSync(fake, content);
      });
      base = fuse(base, 'subdir1');
      fs.mkdirSync(base);
    });

    title = callStr('./test/dummy', './test/dummy/subdir1');
    it(title, function() {
      var src = './test/dummy';
      var dest = './test/dummy/subdir1';
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

    title = callStr('./test/dummy', './test/dummy/subdir2/');
    it(title, function() {
      var src = './test/dummy';
      var dest = './test/dummy/subdir2/';
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

    title = callStr('./test/dummy', './test/dummy/subdir3/', true);
    it(title, function() {
      var src = './test/dummy';
      var dest = './test/dummy/subdir3/';
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

    after('clean up dummy dirs and files', function() {
      var base = './test/dummy/';
      var dirs = get.dirpaths(base, true);
      var files = get.filepaths(base, true);
      each(files, function(file) {
        file = fuse(base, file);
        fs.unlinkSync(file);
      });
      dirs = dirs.reverse();
      each(dirs, function(dir) {
        dir = fuse(base, dir);
        fs.rmdirSync(dir);
      });
      fs.rmdirSync(base);
    });

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
function callStr() {
  return testCall('copy.dir', arguments, 3);
}

/**
 * @private
 * @param {string} str
 * @return {string}
 */
function normalize(str) {
  return remap(str, /\r\n?/g, '\n');
}
