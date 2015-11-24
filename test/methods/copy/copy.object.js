/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - COPY.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/copy.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.copy.object (sections:js,base)', function() {
  var title;

  title = 'should return new object with same key => value pairs as input';
  title = titleStr('basic', title);
  describe(title, function() {

    title = callStr( newObj() );
    it(title, function() {
      var obj = newObj();
      var copy = vitals.copy.obj(obj);
      assert(obj !== copy);
      each(obj, function(val, key) {
        assert( obj[key] === copy[key] );
      });
    });

    title = callStr(newObj(), true);
    it(title, function() {
      var obj = newObj();
      var copy = vitals.copy.obj(obj, true);
      assert(obj !== copy);
      assert(obj.a === copy.a);
      assert(obj.b !== copy.b);
      assert(obj.c === copy.c);
    });

    title = callStr(newObj(), false);
    it(title, function() {
      var obj = newObj();
      var copy = vitals.copy.obj(obj, false);
      assert(obj !== copy);
      each(obj, function(val, key) {
        assert( obj[key] === copy[key] );
      });
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.obj(null);
      });
    });

    title = callStr({}, 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.obj({}, 'fail');
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
  return testTitle(section, shouldMsg, 2, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('copy.obj', arguments, 4, true);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return freeze({ a: 1, b: { b: 2 }, c: 3 }, true);
}
