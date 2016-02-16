/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - IS.FILE
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
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

if (BROWSER_TESTS) return;

describe('vitals.is.file (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    before('setup dummy dirs and files', function() {
      mkDummy([ 'fake1.js', 'fake2.js', 'fake3.js' ]);
    });

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('fake1.js');
      it(title, function() {
        var file = addBase('fake1.js');
        var result = vitals.is.file(file);
        assert( result === true );
      });

      title = callStr('fake1.js', 'fake2.js', 'fake3.js');
      it(title, function() {
        var file1 = addBase('fake1.js');
        var file2 = addBase('fake2.js');
        var file3 = addBase('fake3.js');
        var result = vitals.is.file(file1, file2, file3);
        assert( result === true );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr(null);
      it(title, function() {
        var result = vitals.is.file(null);
        assert( result === false );
      });

      title = callStr('fail.js');
      it(title, function() {
        var file = addBase('fail.js');
        var result = vitals.is.file(file);
        assert( result === false );
      });

      title = callStr('fake1.js', 'fail.js', 'fake3.js');
      it(title, function() {
        var file1 = addBase('fake1.js');
        var file2 = addBase('fail.js');
        var file3 = addBase('fake3.js');
        var result = vitals.is.file(file1, file2, file3);
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
          vitals.is.file();
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
  return testCall('is.file', args, 4);
}

/**
 * @private
 * @param {string} file
 * @return {string}
 */
function addBase(file) {

  /** @type {string} */
  var base;

  base = cut(DUMMY.base, /\/$/);
  return fuse(base, '/', file);
}
