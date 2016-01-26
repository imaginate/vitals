/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - REMAP
 * -----------------------------------------------------------------------------
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/blob/master/src/methods/remap.js}
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

describe('vitals.remap (section:base)', function() {
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

    title = titleStr('should iterate over every prop and return valid obj');
    describe(title, function() {

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = vitals.remap(newObj(), function(val, key) {
          return val;
        });
        each(newObj(), function(val, key) {
          assert( obj[key] === val );
        });
      });

      title = callStr('<object>', '<iteratee>');
      it(title, function() {
        var obj = vitals.remap(newObj(), function(val, key) {
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
        vitals.remap(obj1, function(val, key, obj) {
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
        vitals.remap(obj, function(val, key) {
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
        vitals.remap(newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should iterate over every prop and return valid array');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = vitals.remap(newArr(), function(val, i) {
          return val;
        });
        each(newArr(), function(val, i) {
          assert( arr[i] === val );
        });
      });

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = vitals.remap(newArr(), function(val, i) {
          return val + i;
        });
        each(newArr(), function(val, i) {
          val += i;
          assert( arr[i] === val );
        });
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.remap(arr1, function(val, i, arr) {
          assert( arr !== arr1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(9);
        vitals.remap(arr, function(val, i) {
          this[i] = val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
      });

    });

  });

  describe('string tests', function() {

    title = 'should work same as String.prototype.replace with flexible params';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('abc123a1b2c3', 3, 5);
      it(title, function() {
        var str = vitals.remap('abc123a1b2c3', 3, 5);
        assert( str === 'abc123a1b2c3'.replace('3', '5') );
      });

      title = callStr('abc123a1b2c3', /[a-z]/, 'z');
      it(title, function() {
        var str = vitals.remap('abc123a1b2c3', /[a-z]/, 'z');
        assert( str === 'abc123a1b2c3'.replace(/[a-z]/, 'z') );
      });

    });

    title = titleStr('should correctly bind the replacer');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /a/, '<replacer>', '<thisArg>');
      it(title, function() {
        var replacer = function(match) {
          this[match] = true;
          return match;
        };
        var thisArg = {};
        vitals.remap('abc123a1b2c3', /a/, replacer, thisArg);
        assert( thisArg.a === true );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.remap();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.remap({});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.remap(null, function(){});
        });
      });

      title = callStr({}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.remap({}, function(){}, 'fail');
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
  return testCall('remap', arguments, 5, true);
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
