/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.roll
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.roll docs](https://github.com/imaginate/vitals/wiki/vitals.roll)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('roll', function() {

  should('reduce the source object to a result', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.roll(obj, function(prevVal, currVal) {
        return prevVal + currVal;
      });
      assert( result === 6 );
    });

    test(1, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.roll(1, obj, function(prevVal, currVal) {
        return prevVal + currVal;
      });
      assert( result === 7 );
    });
  });

  should('reduce the source array to a result', function() {

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.roll(arr, function(prevVal, currVal) {
        return prevVal + currVal;
      });
      assert( result === 6 );
    });

    test(1, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.roll(1, arr, function(prevVal, currVal) {
        return prevVal + currVal;
      });
      assert( result === 7 );
    });
  });

  should('return the valid result after x cycles', function() {

    test(0, 8, '<iteratee>', function() {
      var result = vitals.roll(0, 8, function(prevVal) {
        return prevVal + 5;
      });
      assert( result === 40 );
    });
  });

  should('iterate over all key => value pairs', function() {

    test(0, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.roll(0, obj, function(prev, val, key) {
        vals.push(val);
        keys.push(key);
        return 0;
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

  should('iterate over all index => value pairs', function() {

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.roll(arr, function(prev, val, i) {
        vals.push(val);
        keys.push(i);
        return 0;
      });
      assert( vals[0] === 2 );
      assert( vals[1] === 3 );
      assert( vals.length === 2 );
      assert( keys[0] === 1 );
      assert( keys[1] === 2 );
      assert( keys.length === 2 );
    });

    test(0, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.roll(0, arr, function(prev, val, i) {
        vals.push(val);
        keys.push(i);
        return 0;
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

  should('call the iteratee x times', function() {

    test(0, 3, '<iteratee>', function() {
      var keys = [];
      vitals.roll(0, 3, function(prev, i) {
        keys.push(i);
        return 0;
      });
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('correctly clone the source', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      vitals.roll(obj, function(prevVal, currVal, key, src) {
        assert( obj !== src );
        return 0;
      });
    });

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.roll(arr, function(prevVal, currVal, i, src) {
        assert( arr !== src );
        return 0;
      });
    });
  });

  should('bind the iteratee correctly', function() {

    test(0, '<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.roll(0, obj, function(prevVal, currVal, key) {
        this[key] = currVal;
        return 0;
      }, self);
      assert( self !== obj );
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });

    test(0, '<array>', '<iteratee>', '<this>', function() {
      var arr = [ 1, 2, 3 ];
      var self = [];
      vitals.roll(0, arr, function(prevVal, currVal, i) {
        this[i] = currVal;
        return 0;
      }, self);
      assert( self !== arr );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });

    test(0, 3, '<iteratee>', '<this>', function() {
      var cycle = 0;
      var self = [];
      vitals.roll(0, 3, function(prevVal, i) {
        this[i] = ++cycle;
        return 0;
      }, self);
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.roll();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.roll({});
      }, validErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.roll(null, function(){});
      }, validTypeErr);
    });

    test({}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.roll({}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
