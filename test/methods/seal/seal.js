/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - SEAL
 * -----------------------------------------------------------------------------
 * @see [vitals.seal]{@link https://github.com/imaginate/vitals/wiki/vitals.seal}
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

describe('vitals.seal (section:strict)', function() {
  var title;

  title = titleStr('basic', 'should shallowly seal the object');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var obj = vitals.seal(null);
      assert( obj === null );
    });

    title = callStr({});
    it(title, function() {
      var obj = vitals.seal({});
      assert( isSealed(obj) );
    });

    title = callStr(function(){});
    it(title, function() {
      var func = vitals.seal(function(){});
      assert( isSealed(func) );
    });

    title = callStr({ a: {} });
    it(title, function() {
      var obj = vitals.seal({ a: {} });
      assert(  isSealed(obj)   );
      assert( !isSealed(obj.a) );
    });

    title = callStr(null, false);
    it(title, function() {
      var obj = vitals.seal(null, false);
      assert( obj === null );
    });

    title = callStr({}, false);
    it(title, function() {
      var obj = vitals.seal({}, false);
      assert( isSealed(obj) );
    });

    title = callStr(function(){}, false);
    it(title, function() {
      var func = vitals.seal(function(){}, false);
      assert( isSealed(func) );
    });

    title = callStr({ a: {} }, false);
    it(title, function() {
      var obj = vitals.seal({ a: {} }, false);
      assert(  isSealed(obj)   );
      assert( !isSealed(obj.a) );
    });

  });

  title = titleStr('deep', 'should deeply seal the object');
  describe(title, function() {

    title = callStr(null, true);
    it(title, function() {
      var obj = vitals.seal(null, true);
      assert( obj === null );
    });

    title = callStr({}, true);
    it(title, function() {
      var obj = vitals.seal({}, true);
      assert( isSealed(obj) );
    });

    title = callStr(function(){}, true);
    it(title, function() {
      var func = vitals.seal(function(){}, true);
      assert( isSealed(func) );
    });

    title = callStr({ a: {} }, true);
    it(title, function() {
      var obj = vitals.seal({ a: {} }, true);
      assert( isSealed(obj)   );
      assert( isSealed(obj.a) );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.seal();
      });
    });

    title = callStr('invalid source');
    it(title, function() {
      assert.throws(function() {
        vitals.seal('invalid source');
      });
    });

    title = callStr({}, 'invalid deep');
    it(title, function() {
      assert.throws(function() {
        vitals.seal({}, 'invalid deep');
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
  return testCall('seal', arguments, 3);
}

/**
 * @private
 * @param {!(Object|function)} obj
 * @return {boolean}
 */
function isSealed(obj) {
  return Object.isSealed(obj);
}
