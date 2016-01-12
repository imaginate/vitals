/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - ROLL
 * -----------------------------------------------------------------------------
 * @see [vitals.roll]{@link https://github.com/imaginate/vitals/blob/master/src/methods/roll.js}
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

describe('vitals.roll (section:base)', function() {
  var title;

  describe('object tests', function() {

    // newObj()= {
    //   a: 1,
    //   b: 2,
    //   c: 3
    // }

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(newObj(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll(newObj(), function(prevVal, currVal) {
          return prevVal + currVal;
        });
        assert( result === 6 );
      });

      title = callStr(1, newObj(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll(1, newObj(), function(prevVal, currVal) {
          return prevVal + currVal;
        });
        assert( result === 7 );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(newObj(), '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        vitals.roll(obj1, function(prevVal, currVal, key, obj) {
          assert( obj !== obj1 )
        });
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, newObj(), '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.roll(0, obj, function(prevVal, currVal, key) {
          this[key] = currVal;
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
        var ii = 1;
        vitals.roll(newArr(), function(prevVal, currVal, i) {
          assert( arr[i] === currVal );
          assert( ii++ === i );
        });
      });

      title = callStr(0, newArr(), '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.roll(0, newArr(), function(prevVal, currVal, i) {
          assert( arr[i] === currVal );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(newArr(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll(newArr(), function(prevVal, currVal) {
          return prevVal + currVal;
        });
        assert( result === 6 );
      });

      title = callStr(1, newArr(), '<iteratee>');
      it(title, function() {
        var result = vitals.roll(1, newArr(), function(prevVal, currVal) {
          return prevVal + currVal;
        });
        assert( result === 7 );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(newArr(), '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.roll(arr1, function(prevVal, currVal, i, arr) {
          assert( arr !== arr1 )
        });
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, newArr(), '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(3);
        vitals.roll(0, arr, function(prevVal, currVal, i) {
          this[i] = currVal;
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
        vitals.roll(0, 8, function() {
          ++times;
        });
        assert( times === 8 );
      });

      title = callStr(0, 15, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.roll(0, 15, function(prevVal, time) {
          assert( times++ === time );
        });
        assert( times === 15 );
      });

    });

    title = titleStr('should return the correct result');
    describe(title, function() {

      title = callStr(0, 8, '<iteratee>');
      it(title, function() {
        var result = vitals.roll(0, 8, function(prevVal) {
          return prevVal + 5;
        });
        assert( result === 40 );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(0, 5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var thisArg = { times: 0 };
        vitals.roll(0, 5, function() {
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
          vitals.roll();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.roll({});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.roll(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.roll({}, function(){}, 'fail');
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
  return testCall('roll', arguments, 5, true);
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
