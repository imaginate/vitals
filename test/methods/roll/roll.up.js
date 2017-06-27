/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.roll.up
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.roll docs](https://github.com/imaginate/vitals/wiki/vitals.roll)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('roll.up', function() {

  should('reduce the source object to a result', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.roll.up(obj, function(val) {
        return val;
      });
      assert( result === 6 );
    });

    test(1, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.roll.up(1, obj, function(val) {
        return val;
      });
      assert( result === 7 );
    });
  });

  should('reduce the source array to a result', function() {

    test('<array>', '<iteratee>', function() {
      var arr = [ 'a', 'b', 'c' ];
      var result = vitals.roll.up(arr, function(val) {
        return val;
      });
      assert( result === 'abc' );
    });

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.roll.up(arr, function(val) {
        return val;
      });
      assert( result === 6 );
    });

    test(1, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.roll.up(1, arr, function(val) {
        return val;
      });
      assert( result === 7 );
    });
  });

  should('return the valid result after x cycles', function() {

    test(0, 8, '<iteratee>', function() {
      var result = vitals.roll.up(0, 8, function() {
        return 5;
      });
      assert( result === 40 );
    });
  });

  should('iterate over all key => value pairs', function() {

    test(0, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.roll.up(0, obj, function(val, key) {
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
      vitals.roll.up(arr, function(val, i) {
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
      vitals.roll.up(0, arr, function(val, i) {
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
      vitals.roll.up(0, 3, function(i) {
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
      vitals.roll.up(obj, function(val, key, src) {
        assert( obj !== src );
        return 0;
      });
    });

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.roll.up(arr, function(val, i, src) {
        assert( arr !== src );
        return 0;
      });
    });
  });

  should('bind the iteratee correctly', function() {

    test(0, '<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.roll.up(0, obj, function(val, key) {
        this[key] = val;
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
      vitals.roll.up(0, arr, function(val, i) {
        this[i] = val;
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
      vitals.roll.up(0, 3, function(i) {
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
        vitals.roll.up();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.roll.up({});
      }, validErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.roll.up(null, function(){});
      }, validTypeErr);
    });

    test({}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.roll.up({}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
