/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - UNTIL
 * -----------------------------------------------------------------------------
 * @see [vitals.until]{@link https://github.com/imaginate/vitals/blob/master/src/methods/until.js}
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

describe('vitals.until (section:base)', function() {
  var title;

  describe('object tests', function() {

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

    title = titleStr('should iterate over every prop');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var obj = {};
        vitals.until(true, newObj(), function(val, key) {
          obj[key] = val;
        });
        each(newObj(), function(val, key) {
          assert( obj[key] === val );
        });
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until(true, newObj(), function(val, key) {
          return val === 5;
        });
        assert( pass === true );
      });

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until(true, newObj(), function(val, key) {
          return val === '5';
        });
        assert( fail === false );
      });

      title = callStr(5, '<object>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until(5, newObj(), function(val, key) {
          return val;
        });
        assert( pass === true );
      });

      title = callStr('5', '<object>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until('5', newObj(), function(val, key) {
          return val;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        vitals.until(true, obj1, function(val, key, obj) {
          assert( obj !== obj1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.until(true, obj, function(val, key) {
          this[key] = val;
        }, thisArg);
        each(obj, function(val, key) {
          assert( has(thisArg, key)    );
          assert( thisArg[key] === val );
        });
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should iterate over every index in order');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.until(true, newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until(true, newArr(), function(val, i) {
          return val === 3;
        });
        assert( pass === true );
      });

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until(true, newArr(), function(val, i) {
          return val === '3';
        });
        assert( fail === false );
      });

      title = callStr(3, '<array>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until(3, newArr(), function(val, i) {
          return val;
        });
        assert( pass === true );
      });

      title = callStr('3', '<array>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until('3', newArr(), function(val, i) {
          return val;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.until(true, arr1, function(val, i, arr) {
          assert( arr !== arr1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(9);
        vitals.until(true, arr, function(val, i) {
          this[i] = val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
      });

    });

  });

  describe('cycle tests', function() {

    title = titleStr('should call the iteratee x times');
    describe(title, function() {

      title = callStr(true, 8, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.until(true, 8, function() {
          ++times;
        });
        assert( times === 8 );
      });

      title = callStr(true, 15, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.until(true, 15, function(time) {
          assert( times++ === time );
        });
        assert( times === 15 );
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, 5, '<iteratee>');
      it(title, function() {
        var pass = vitals.until(true, 5, function(time) {
          return time === 3;
        });
        assert( pass === true );
      });

      title = callStr(true, 3, '<iteratee>');
      it(title, function() {
        var fail = vitals.until(true, 3, function(time) {
          return time === 3;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, 5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var times = 0;
        var thisArg = {};
        vitals.until(true, 5, function() {
          this.times = ++times;
        }, thisArg);
        assert( times === 5 );
        assert( thisArg.times === 5 );
      });

    });

  });

  describe('generic tests', function() {

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, '<iteratee>');
      it(title, function() {
        var count = 0;
        var pass = vitals.until(true, function() {
          return ++count === 5;
        });
        assert( pass === true );
      });

      title = callStr(true, '<iteratee>');
      it(title, function() {
        var pass = vitals.until(true, function(time) {
          return time === 100;
        });
        assert( pass === true );
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, '<iteratee>', '<thisArg>');
      it(title, function() {
        var times = 0;
        var thisArg = {};
        vitals.until(true, function(time) {
          this.times = ++times;
          return time === 5;
        }, thisArg);
        assert( times === 6 );
        assert( thisArg.times === 6 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.until();
        });
      });

      title = callStr(true);
      it(title, function() {
        assert.throws(function() {
          vitals.until(true);
        });
      });

      title = callStr(true, {});
      it(title, function() {
        assert.throws(function() {
          vitals.until(true, {});
        });
      });

      title = callStr(true, null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.until(true, null, function(){});
        });
      });

      title = callStr(true, {}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.until(true, {}, function(){}, 'fail');
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
  return testCall('until', arguments, 5, true);
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

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
