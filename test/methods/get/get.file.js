/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.FILE
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
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

describe('vitals.get.file (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    before('setup dummy dirs and files', function() {
      mkDummy('fake.js');
    });

    title = titleStr('should return a buffer of the file');
    describe(title, function() {

      title = callStr('fake.js', true);
      it(title, function() {
        var file = addBase('fake.js');
        var result = vitals.get.file(file, true);
        assert( is.buffer(result) );
        result = result.toString();
        assert( result === DUMMY.content );
        result = fs.readFileSync(file);
        result = result.toString();
        assert( result === DUMMY.content );
      });

    });

    title = titleStr('should return a valid string of the file');
    describe(title, function() {

      title = callStr('fake.js');
      it(title, function() {
        var file = addBase('fake.js');
        var result = vitals.get.file(file);
        assert( result === DUMMY.content );
        result = fs.readFileSync(file, 'utf8');
        assert( result === DUMMY.content );
      });

      title = callStr('fake.js', { eol: 'CRLF' });
      it(title, function() {
        var file = addBase('fake.js');
        var result = vitals.get.file(file, { eol: 'CRLF' });
        var content = setEol(DUMMY.content, 'CRLF');
        assert( result === content );
        result = fs.readFileSync(file, 'utf8');
        result = setEol(result, 'CRLF');
        assert( result === content );
      });

    });

    after('clean up dummy dirs and files', rmDummy);

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      before('setup dummy dirs and files', function() {
        mkDummy('fake.js');
      });

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.file();
        });
      });

      title = callStr('invalid.js');
      it(title, function() {
        assert.throws(function() {
          var file = addBase('invalid.js');
          vitals.get.file(file);
        });
      });

      title = callStr('fake.js', 'fail');
      it(title, function() {
        assert.throws(function() {
          var file = addBase('fake.js');
          vitals.get.file(file, 'fail');
        });
      });

      after('clean up dummy dirs and files', rmDummy);

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
  return testCall('get.file', args, 4);
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
