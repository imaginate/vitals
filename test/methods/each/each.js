/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.each
 * -----------------------------------------------------------------------------
 * @see [vitals.each docs](https://github.com/imaginate/vitals/wiki/vitals.each)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.each (section:base)', function() {
  var title;

  title = titleStr('should iterate over all key => value pairs in object');
  describe(title, function() {

    title = callStr('<object>', '<iteratee>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.each(obj, function(val, key) {
        vals.push(val);
        keys.push(key);
      });
      assert( hasVal(vals, 1) );
      assert( hasVal(vals, 2) );
      assert( hasVal(vals, 3) );
      assert( vals.length === 3 );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'b') );
      assert( hasVal(keys, 'c') );
      assert( keys.length === 3 );
    });
  });

  title = titleStr('should iterate in order over all index => value pairs in array');
  describe(title, function() {

    title = callStr('<array>', '<iteratee>');
    it(title, function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.each(arr, function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === 1 );
      assert( vals[1] === 2 );
      assert( vals[2] === 3 );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  title = titleStr('should iterate for x number of cycles');
  describe(title, function() {

    title = callStr(3, '<iteratee>');
    it(title, function() {
      var cycles = [];
      var cycle = 0;
      vitals.each(3, function(i) {
        cycles[i] = ++cycle;
      });
      assert( cycles[0] === 1 );
      assert( cycles[1] === 2 );
      assert( cycles[2] === 3 );
      assert( cycles.length === 3 );
    });
  });

  title = titleStr('should convert string to array & correctly iterate');
  describe(title, function() {

    title = callStr('1, 2, 3', '<iteratee>');
    it(title, function() {
      var vals = [];
      var keys = [];
      vitals.each('1, 2, 3', function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === '1' );
      assert( vals[1] === '2' );
      assert( vals[2] === '3' );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });

    title = callStr('1,2,3', '<iteratee>');
    it(title, function() {
      var vals = [];
      var keys = [];
      vitals.each('1,2,3', function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === '1' );
      assert( vals[1] === '2' );
      assert( vals[2] === '3' );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });

    title = callStr('1|2|3', '<iteratee>');
    it(title, function() {
      var vals = [];
      var keys = [];
      vitals.each('1|2|3', function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === '1' );
      assert( vals[1] === '2' );
      assert( vals[2] === '3' );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });

    title = callStr('1 2 3', '<iteratee>');
    it(title, function() {
      var vals = [];
      var keys = [];
      vitals.each('1 2 3', function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === '1' );
      assert( vals[1] === '2' );
      assert( vals[2] === '3' );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  title = titleStr('should return the valid result');
  describe(title, function() {

    title = callStr('<object>', '<iteratee>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.each(obj1, function(val, key){});
      assert( obj2 === obj1 );
      assert( obj2.a === 1 );
      assert( obj2.b === 2 );
      assert( obj2.c === 3 );
    });

    title = callStr('<object>', '<iteratee>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.each(obj1, function(val, key, obj){});
      assert( obj2 !== obj1 );
      assert( obj2.a === 1 );
      assert( obj2.b === 2 );
      assert( obj2.c === 3 );
    });

    title = callStr('<array>', '<iteratee>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.each(arr1, function(val, i){});
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2.length === 3 );
    });

    title = callStr('<array>', '<iteratee>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.each(arr1, function(val, i, arr){});
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2.length === 3 );
    });

    title = callStr('1,2,3', '<iteratee>');
    it(title, function() {
      var arr = vitals.each('1,2,3', function(val, i){});
      assert( is.arr(arr) );
      assert( arr[0] === '1' );
      assert( arr[1] === '2' );
      assert( arr[2] === '3' );
      assert( arr.length === 3 );
    });

    title = callStr('1,2,3', '<iteratee>');
    it(title, function() {
      var arr = vitals.each('1,2,3', function(val, i, arr){});
      assert( is.arr(arr) );
      assert( arr[0] === '1' );
      assert( arr[1] === '2' );
      assert( arr[2] === '3' );
      assert( arr.length === 3 );
    });

    title = callStr(3, '<iteratee>');
    it(title, function() {
      var result = vitals.each(3, function(i){});
      assert( is.undefined(result) );
    });
  });

  title = titleStr('should bind the iteratee correctly');
  describe(title, function() {

    title = callStr('<object>', '<iteratee>', '<this>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.each(obj, function(val, key) {
        this[key] = val;
      }, self);
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });

    title = callStr('<array>', '<iteratee>', '<this>');
    it(title, function() {
      var arr = [ 1, 2, 3 ];
      var self = new Array(3);
      vitals.each(arr, function(val, i) {
        this[i] = val;
      }, self);
      assert( is.arr(self) );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });

    title = callStr(3, '<iteratee>', '<this>');
    it(title, function() {
      var cycle = 0;
      var self = new Array(3);
      vitals.each(3, function(i) {
        this[i] = ++cycle;
      }, self);
      assert( is.arr(self) );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.each();
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.each({});
      }, validTypeErr);
    });

    title = callStr(null, '<iteratee>');
    it(title, function() {
      assert.throws(function() {
        vitals.each(null, function(){});
      }, validTypeErr);
    });

    title = callStr({}, '<iteratee>', 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.each({}, function(){}, 'fail');
      }, validTypeErr);
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
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('each', arguments, 3);
}
