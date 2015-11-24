/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - EACH.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/blob/master/src/methods/each.js}
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

describe('vitals.each.object (section:base)', function() {
  var title;

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

  describe('basic tests', function() {

    title = titleStr('should iterate over every key => value pair');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = newObj();
        vitals.each.obj(newObj(), function(val, key) {
          assert( has(obj, key)    );
          assert( obj[key] === val );
        });
      });

    });

    title = titleStr('should return the valid object');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        var obj2 = vitals.each.obj(obj1, function(val, key) {});
        assert( obj1 === obj2 );
      });

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        var obj2 = vitals.each.obj(obj1, function(val, key, obj) {});
        assert( obj1 !== obj2 );
        each(obj1, function(val, key) {
          assert( has(obj2, key)    );
          assert( obj2[key] === val );
        });
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.each.obj(obj, function(val, key) {
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
          vitals.each.obj();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.each.obj({});
        });
      });

      title = callStr(5, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.obj(5, function(){});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.obj(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.each.obj({}, function(){}, 'fail');
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
  return testCall('each.obj', arguments, 5, true);
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
