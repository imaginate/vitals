/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.FILE
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/to.js}
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

describe('vitals.to.file (section:fs)', function() {
  var title;

  describe('basic tests', function() {

    before('setup dummy dirs and files', function() {
      mkDummy('fake.js');
    });

    title = titleStr('should overwrite file with buffer');
    describe(title, function() {

      title = callStr('<Buffer>', 'fake.js');
      it(title, function() {
        var content = '// overwrite test 1';
        var buf = new Buffer(content);
        var file = addBase('fake.js');
        var result = vitals.to.file(buf, file);
        assert( is.buffer(result) );
        result = result.toString();
        assert( result === content );
        result = fs.readFileSync(file);
        result = result.toString();
        assert( result === content );
      });

    });

    title = titleStr('should make new file with buffer');
    describe(title, function() {

      title = callStr('<Buffer>', 'fake1.js');
      it(title, function() {
        var buf = new Buffer(DUMMY.content);
        var file = addBase('fake1.js');
        var result = vitals.to.file(buf, file);
        assert( is.buffer(result) );
        result = result.toString();
        assert( result === DUMMY.content );
        result = fs.readFileSync(file);
        result = result.toString();
        assert( result === DUMMY.content );
      });

      title = callStr('<Buffer>', 'fake2.js', 'utf8');
      it(title, function() {
        var buf = new Buffer(DUMMY.content);
        var file = addBase('fake2.js');
        var result = vitals.to.file(buf, file, 'utf8');
        assert( is.buffer(result) );
        result = result.toString();
        assert( result === DUMMY.content );
        result = fs.readFileSync(file, 'utf8');
        assert( result === DUMMY.content );
      });

    });

    title = titleStr('should overwrite file with string');
    describe(title, function() {

      title = callStr('// overwrite test 2', 'fake.js');
      it(title, function() {
        var content = '// overwrite test 2';
        var file = addBase('fake.js');
        var result = vitals.to.file(content, file);
        assert( result === content );
        result = fs.readFileSync(file, 'utf8');
        assert( result === content );
      });

    });

    title = titleStr('should make new file with string');
    describe(title, function() {

      title = callStr(DUMMY.content, 'fake3.js');
      it(title, function() {
        var content = DUMMY.content;
        var file = addBase('fake3.js');
        var result = vitals.to.file(content, file);
        assert( result === content );
        result = fs.readFileSync(file, 'utf8');
        assert( result === content );
      });

      title = callStr(DUMMY.content, 'fake4.js');
      it(title, function() {
        var content = DUMMY.content;
        var file = addBase('fake4.js');
        var result = vitals.to.file(content, file, null);
        assert( result === content );
        result = fs.readFileSync(file);
        result = result.toString();
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
          vitals.to.file();
        });
      });

      title = callStr('content');
      it(title, function() {
        assert.throws(function() {
          vitals.to.file('content');
        });
      });

      title = callStr(null, 'fake.js');
      it(title, function() {
        assert.throws(function() {
          var file = addBase('fake.js');
          vitals.to.file(null, file);
        });
      });

      title = callStr('content', 'fake.js', false);
      it(title, function() {
        assert.throws(function() {
          var file = addBase('fake.js');
          vitals.to.file('content', file, false);
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
    return i === 1 ? addBase(val) : val;
  });
  return testCall('to.file', args, 4);
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
