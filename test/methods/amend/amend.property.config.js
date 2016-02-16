/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS METHOD - AMEND.PROPERTY.CONFIG
 * -----------------------------------------------------------------------------
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/wiki/vitals.amend}
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

describe('vitals.amend.property.config (section:strict)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should correctly change the prop config');
    describe(title, function() {

      // newObj()= {
      //   "a":  1,
      //   "b":  2,
      //   "c":  3
      // }

      title = callStr(newObj(), 'a', '<descriptor>');
      it(title, function() {
        var result = {
          a: { configurable: false, enumerable: true },
          b: { configurable: true,  enumerable: true },
          c: { configurable: true,  enumerable: true }
        };
        var desc = { configurable: false };
        var obj = vitals.amend.prop.config(newObj(), 'a', desc);
        each(newObj(), function(val, key) {
          var desc = getDescriptor(obj, key);
          assert( obj[key] === val );
          assert( key in obj );
          each(result[key], function(val, key) {
            assert( desc[key] === val );
          });
        });
      });

    });

    title = titleStr('should throw an error');
    describe(title, function() {

      title = callStr('fail', 'a', '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.prop.config('fail', 'a', { configurable: false });
        });
      });

      title = callStr({ '5': 1 }, 5, '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.prop.config({ '5': 1 }, 5, { configurable: false });
        });
      });

      title = callStr(newObj(), 'a');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.prop.config(newObj(), 'a');
        });
      });

      title = callStr(newObj(), 'd', '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.prop.config(newObj(), 'd', { configurable: false });
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
function callStr() {
  return testCall('amend.prop.config', arguments, 4);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return {
    'a': 1,
    'b': 2,
    'c': 3
  };
}

/**
 * @private
 * @param {!Object} obj
 * @param {string} key
 * @return {!Object}
 */
function getDescriptor(obj, key) {
  return Object.getOwnPropertyDescriptor(obj, key);
}
