/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - REMAP.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/wiki/vitals.remap}
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

describe('vitals.remap.object (section:base)', function() {
  var title;

  describe('basic tests', function() {

    // newObj()= {
    //   'a':  'd',
    //   'b':  'e',
    //   'c':  'f',
    //   '1':   4,
    //   '2':   5,
    //   '3':   6,
    //   'a1': '1',
    //   'b2': '2',
    //   'c3': '3'
    // }

    title = titleStr('should iterate over every prop and return valid obj');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = vitals.remap.obj(newObj(), function(val, key) {
          return val;
        });
        each(newObj(), function(val, key) {
          assert( obj[key] === val );
        });
      });

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = vitals.remap.obj(newObj(), function(val, key) {
          return val + key;
        });
        each(newObj(), function(val, key) {
          val += key;
          assert( obj[key] === val );
        });
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        vitals.remap.obj(obj1, function(val, key, obj) {
          assert( obj !== obj1 )
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.remap.obj(obj, function(val, key) {
          this[key] = val;
        }, thisArg);
        each(obj, function(val, key) {
          assert( has(thisArg, key)    );
          assert( thisArg[key] === val );
        });
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.remap.obj();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.remap.obj({});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.remap.obj(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.remap.obj({}, function(){}, 'fail');
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
  return testCall('remap.obj', arguments, 4);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return {
    'a':  'd',
    'b':  'e',
    'c':  'f',
    '1':   4,
    '2':   5,
    '3':   6,
    'a1': '1',
    'b2': '2',
    'c3': '3'
  };
}
