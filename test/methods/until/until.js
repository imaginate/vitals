/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.until
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.until docs](https://github.com/imaginate/vitals/wiki/vitals.until)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('until', function() {

  should('return valid boolean', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var pass = vitals.until(true, obj, function(val) {
        return val === 2;
      });
      assert( pass === true );
    });

    test('b', '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var pass = vitals.until('b', obj, function(val, key) {
        return key;
      });
      assert( pass === true );
    });

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var fail = vitals.until(true, obj, function(val) {
        return val === 4;
      });
      assert( fail === false );
    });

    test('d', '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var fail = vitals.until('d', obj, function(val, key) {
        return key;
      });
      assert( fail === false );
    });

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var pass = vitals.until(true, arr, function(val, i) {
        return i === 2;
      });
      assert( pass === true );
    });

    test(3, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var pass = vitals.until(3, arr, function(val) {
        return val;
      });
      assert( pass === true );
    });

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var fail = vitals.until(true, arr, function(val, i) {
        return i === 5;
      });
      assert( fail === false );
    });

    test(5, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var fail = vitals.until(5, arr, function(val) {
        return val;
      });
      assert( fail === false );
    });

    test(true, 3, '<iteratee>', function() {
      var pass = vitals.until(true, 3, function(i) {
        return i === 1;
      });
      assert( pass === true );
    });

    test(true, 3, '<iteratee>', function() {
      var fail = vitals.until(true, 3, function(i) {
        return i === 5;
      });
      assert( fail === false );
    });

    // Note that when `vitals.until` is used without a limiting object or cycle
    //   count that the _end_ value must be returned to stop the iteration and
    //   avoid an infinite loop error.

    test(true, '<iteratee>', function() {
      var cycle = 0;
      var pass = vitals.until(true, function() {
        return ++cycle === 5;
      });
      assert( pass === true );
    });

    test(true, '<iteratee>', function() {
      var pass = vitals.until(true, function(i) {
        return i === 10;
      });
      assert( pass === true );
    });
  });

  should('iterate over all key => value pairs in object', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.until(true, obj, function(val, key) {
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

  should('iterate from 0 to length over all props in array', function() {

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.until(true, arr, function(val, i) {
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

  should('call the iteratee x times', function() {

    test(true, 3, '<iteratee>', function() {
      var keys = [];
      vitals.until(true, 3, function(i) {
        keys.push(i);
      });
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('correctly clone the source', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      vitals.until(true, obj, function(val, key, src) {
        assert( obj !== src )
      });
    });

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.until(true, arr, function(val, i, src) {
        assert( arr !== src );
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test(true, '<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.until(true, obj, function(val, key) {
        this[key] = val;
      }, self);
      assert( self !== obj );
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });

    test(true, '<array>', '<iteratee>', '<this>', function() {
      var arr = [ 1, 2, 3 ];
      var self = [];
      vitals.until(true, arr, function(val, i) {
        this[i] = val;
      }, self);
      assert( self !== arr );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });

    test(true, 3, '<iteratee>', '<this>', function() {
      var cycle = 0;
      var self = [];
      var fail = vitals.until(true, 3, function(i) {
        this[i] = ++cycle;
      }, self);
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });

    test(true, '<iteratee>', '<this>', function() {
      var cycle = 0;
      var self = [];
      var fail = vitals.until(true, function(i) {
        this[i] = ++cycle;
        return cycle === 3;
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
        vitals.until();
      }, validErr);
    });

    test(true, function() {
      assert.throws(function() {
        vitals.until(true);
      }, validErr);
    });

    test(true, {}, function() {
      assert.throws(function() {
        vitals.until(true, {});
      }, validTypeErr);
    });

    test(true, null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.until(true, null, function(){});
      }, validTypeErr);
    });

    test(true, {}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.until(true, {}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
