/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.DIRECTORY
 * -----------------------------------------------------------------------------
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/wiki/vitals.is}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

if (BROWSER_TESTS) return;

describe('vitals.is.directory (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    before('setup dummy dirs and files', function() {
      mkDummy({ 'subdir1': null, 'subdir2': null, 'subdir3': null });
    });

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('subdir1');
      it(title, function() {
        var dir = addBase('subdir1');
        var result = vitals.is.dir(dir);
        assert( result === true );
      });

      title = callStr('subdir1', 'subdir2', 'subdir3');
      it(title, function() {
        var dir1 = addBase('subdir1');
        var dir2 = addBase('subdir2');
        var dir3 = addBase('subdir3');
        var result = vitals.is.dir(dir1, dir2, dir3);
        assert( result === true );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr(null);
      it(title, function() {
        var result = vitals.is.dir(null);
        assert( result === false );
      });

      title = callStr('invalid');
      it(title, function() {
        var dir = addBase('invalid');
        var result = vitals.is.dir(dir);
        assert( result === false );
      });

      title = callStr('subdir1', 'invalid', 'subdir3');
      it(title, function() {
        var dir1 = addBase('subdir1');
        var dir2 = addBase('invalid');
        var dir3 = addBase('subdir3');
        var result = vitals.is.dir(dir1, dir2, dir3);
        assert( result === false );
      });

    });

    after('clean up dummy dirs and files', rmDummy);

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.is.dir();
        });
      });

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
    return val && addBase(val);
  });
  return testCall('is.dir', args, 4);
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
