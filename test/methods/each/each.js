/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - EACH
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

describe('vitals.each (sections:js,base)', function() {
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

    title = titleStr('should iterate over every key => value pair');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = newObj();
        vitals.each(newObj(), function(val, key) {
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
        var obj2 = vitals.each(obj1, function(val, key) {});
        assert( obj1 === obj2 );
      });

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        var obj2 = vitals.each(obj1, function(val, key, obj) {});
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
        vitals.each(obj, function(val, key) {
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

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.each(newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should return the valid array');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        var arr2 = vitals.each(arr1, function(val, i) {});
        assert( arr1 === arr2 );
      });

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        var arr2 = vitals.each(arr1, function(val, i, arr) {});
        assert( arr1 !== arr2 );
        assert( arr1.join() === arr2.join() );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(8);
        vitals.each(arr, function(val, i) {
          this[i] = val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
      });

    });

  });

  describe('cycle tests', function() {

    title = titleStr('should call the iteratee x times');
    describe(title, function() {

      title = callStr(8, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.each(8, function() {
          ++times;
        });
        assert( times === 8 );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var times = 0;
        var thisArg = {};
        vitals.each(5, function() {
          this.times = ++times;
        }, thisArg);
        assert( times === 5 );
        assert( thisArg.times === 5 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.each();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.each({});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.each({}, function(){}, 'fail');
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
  return testCall('each', arguments, 5, true);
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
