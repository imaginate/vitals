/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FREEZE.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.freeze]{@link https://github.com/imaginate/vitals/blob/master/src/methods/create.js}
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

describe('vitals.freeze.object (section:strict)', function() {
  var title;

  title = titleStr('basic', 'should shallowly freeze the object');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var obj = vitals.freeze.obj(null);
      assert( obj === null );
    });

    title = callStr({});
    it(title, function() {
      var obj = vitals.freeze.obj({});
      assert( isFrozen(obj) );
    });

    title = callStr(function(){});
    it(title, function() {
      var func = vitals.freeze.obj(function(){});
      assert( isFrozen(func) );
    });

    title = callStr({ a: {} });
    it(title, function() {
      var obj = vitals.freeze.obj({ a: {} });
      assert(  isFrozen(obj)   );
      assert( !isFrozen(obj.a) );
    });

    title = callStr(null, false);
    it(title, function() {
      var obj = vitals.freeze.obj(null, false);
      assert( obj === null );
    });

    title = callStr({}, false);
    it(title, function() {
      var obj = vitals.freeze.obj({}, false);
      assert( isFrozen(obj) );
    });

    title = callStr(function(){}, false);
    it(title, function() {
      var func = vitals.freeze.obj(function(){}, false);
      assert( isFrozen(func) );
    });

    title = callStr({ a: {} }, false);
    it(title, function() {
      var obj = vitals.freeze.obj({ a: {} }, false);
      assert(  isFrozen(obj)   );
      assert( !isFrozen(obj.a) );
    });

  });

  title = titleStr('deep', 'should deeply freeze the object');
  describe(title, function() {

    title = callStr(null, true);
    it(title, function() {
      var obj = vitals.freeze.obj(null, true);
      assert( obj === null );
    });

    title = callStr({}, true);
    it(title, function() {
      var obj = vitals.freeze.obj({}, true);
      assert( isFrozen(obj) );
    });

    title = callStr(function(){}, true);
    it(title, function() {
      var func = vitals.freeze.obj(function(){}, true);
      assert( isFrozen(func) );
    });

    title = callStr({ a: {} }, true);
    it(title, function() {
      var obj = vitals.freeze.obj({ a: {} }, true);
      assert( isFrozen(obj)   );
      assert( isFrozen(obj.a) );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.freeze.obj();
      });
    });

    title = callStr('invalid source');
    it(title, function() {
      assert.throws(function() {
        vitals.freeze.obj('invalid source');
      });
    });

    title = callStr({}, 'invalid deep');
    it(title, function() {
      assert.throws(function() {
        vitals.freeze.obj({}, 'invalid deep');
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
  return testCall('freeze.obj', arguments, 4, true);
}

/**
 * @private
 * @param {!(Object|function)} obj
 * @return {boolean}
 */
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
