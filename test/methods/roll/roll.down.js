/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - ROLL.DOWN
 * -----------------------------------------------------------------------------
 * @see [vitals.roll]{@link https://github.com/imaginate/vitals/blob/master/src/methods/roll.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Sdownporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.roll.down (section:base)', function() {
  var title;

  describe('object tests', function() {

    // newObj()= {
    //   a: 1,
    //   b: 2,
    //   c: 3
    // }

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(0, newObj(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll.down(0, newObj(), function(val) {
          return val;
        });
        assert( result === -6 );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(newObj(), '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        vitals.roll.down(obj1, function(val, key, obj) {
          assert( obj !== obj1 );
          return val;
        });
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, newObj(), '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.roll.down(0, obj, function(val, key) {
          this[key] = val;
          return val;
        }, thisArg);
        each(obj, function(val, key) {
          assert( has(thisArg, key)    );
          assert( thisArg[key] === val );
        });
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ 1, 2, 3 ]

    title = titleStr('should iterate over every index in order');
    describe(title, function() {

      title = callStr(newArr(), '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.roll.down(newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ++ii === i );
          return val;
        });
      });

      title = callStr(0, newArr(), '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.roll.down(0, newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
          return val;
        });
      });

    });

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(newArr(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll.down(newArr(), function(val) {
          return val;
        });
        assert( result === -4 );
      });

      title = callStr(1, newArr(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll.down(1, newArr(), function(val) {
          return val;
        });
        assert( result === -5 );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(newArr(), '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.roll.down(arr1, function(val, i, arr) {
          assert( arr !== arr1 );
          return val;
        });
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, newArr(), '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(3);
        vitals.roll.down(0, arr, function(val, i) {
          this[i] = val;
          return val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
      });

    });

  });

  describe('cycle tests', function() {

    title = titleStr('should call the iteratee x times');
    describe(title, function() {

      title = callStr(0, 8, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.roll.down(0, 8, function() {
          ++times;
          return 0;
        });
        assert( times === 8 );
      });

      title = callStr(0, 15, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.roll.down(0, 15, function(time) {
          assert( times++ === time );
          return 0;
        });
        assert( times === 15 );
      });

    });

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(0, 8, '<iteratee>');
      it(title, function() {
        var result = vitals.roll.down(0, 8, function() {
          return 5;
        });
        assert( result === -40 );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, 5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var thisArg = { times: 0 };
        vitals.roll.down(0, 5, function() {
          ++this.times;
        }, thisArg);
        assert( thisArg.times === 5 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.roll.down();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.roll.down({});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.roll.down(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.roll.down({}, function(){}, 'fail');
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
  return testCall('roll.down', arguments, 4);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return { a: 1, b: 2, c: 3 };
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 1, 2, 3 ];
}
