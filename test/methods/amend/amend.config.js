/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS METHOD - AMEND.CONFIG
 * -----------------------------------------------------------------------------
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
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

describe('vitals.amend.config (section:strict)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should correctly change the props config');
    describe(title, function() {

      // newObj()= {
      //   "a":  1,
      //   "b":  2,
      //   "c":  3
      // }

      title = callStr(newObj(), '<props>');
      it(title, function() {
        var result = {
          a: { configurable: false, enumerable: true  },
          b: { configurable: true,  enumerable: false },
          c: { configurable: false, enumerable: true  }
        };
        var props = {
          a: { configurable: false },
          b: { enumerable:   false },
          c: { configurable: false }
        };
        var obj = vitals.amend.config(newObj(), props);
        each(newObj(), function(val, key) {
          var desc = getDescriptor(obj, key);
          assert( obj[key] === val );
          assert( key in obj );
          each(result[key], function(val, key) {
            assert( desc[key] === val );
          });
        });
      });

      title = callStr(newObj(), [ 'a', 'b' ], '<descriptor>');
      it(title, function() {
        var result = {
          a: { configurable: false, enumerable: true },
          b: { configurable: false, enumerable: true },
          c: { configurable: true,  enumerable: true }
        };
        var keys = [ 'a', 'b' ];
        var desc = { configurable: false };
        var obj = vitals.amend.config(newObj(), keys, desc);
        each(newObj(), function(val, key) {
          var desc = getDescriptor(obj, key);
          assert( obj[key] === val );
          assert( key in obj );
          each(result[key], function(val, key) {
            assert( desc[key] === val );
          });
        });
      });

      title = callStr(newObj(), 'a,b', '<descriptor>');
      it(title, function() {
        var result = {
          a: { configurable: false, enumerable: true },
          b: { configurable: false, enumerable: true },
          c: { configurable: true,  enumerable: true }
        };
        var desc = { configurable: false };
        var obj = vitals.amend.config(newObj(), 'a,b', desc);
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

      title = callStr('fail', 'a,b,c', '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.config('fail', 'a,b,c', { configurable: false });
        });
      });

      title = callStr({ '5': 1 }, 5, '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.config({ '5': 1 }, 5, { configurable: false });
        });
      });

      title = callStr(newObj(), 'a,b,c');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.config(newObj(), 'a,b,c');
        });
      });

      title = callStr(newObj(), { a: 1 });
      it(title, function() {
        assert.throws(function() {
          vitals.amend.config(newObj(), { a: 1 });
        });
      });

      title = callStr(newObj(), 'a,d', '<descriptor>');
      it(title, function() {
        assert.throws(function() {
          vitals.amend.config(newObj(), 'a,d', { configurable: false });
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
  return breakStr(shouldMsg, 4, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('amend.config', arguments, 5, true);
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
