/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.object
 * -----------------------------------------------------------------------------
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.copy.object (section:base)', function() {
  var title;

  title = titleStr('should return a clone of the object');
  describe(title, function() {

    title = callStr('<object>');
    it(title, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    title = callStr('<object>', true);
    it(title, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj, true);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b !== cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    title = callStr('<object>', false);
    it(title, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy.obj(obj, false);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.obj();
      }, validTypeErr);
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.obj(null);
      }, validTypeErr);
    });

    title = callStr({}, 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.obj({}, 'fail');
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
  return testCall('copy.obj', arguments, 3);
}
