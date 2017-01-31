/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.until.array
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.until docs](https://github.com/imaginate/vitals/wiki/vitals.until)
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

method('until.array', 'until.arr', function() {

  should('return valid boolean', function() {

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var pass = vitals.until.arr(true, arr, function(val, i) {
        return i === 2;
      });
      assert( pass === true );
    });

    test(3, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var pass = vitals.until.arr(3, arr, function(val) {
        return val;
      });
      assert( pass === true );
    });

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var fail = vitals.until.arr(true, arr, function(val, i) {
        return i === 5;
      });
      assert( fail === false );
    });

    test(5, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var fail = vitals.until.arr(5, arr, function(val) {
        return val;
      });
      assert( fail === false );
    });
  });

  should('iterate from 0 to length over all props in array', function() {

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.until.arr(true, arr, function(val, i) {
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

  should('correctly clone the source', function() {

    test(true, '<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.until.arr(true, arr, function(val, i, src) {
        assert( arr !== src );
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test(true, '<array>', '<iteratee>', '<this>', function() {
      var arr = [ 1, 2, 3 ];
      var self = [];
      vitals.until.arr(true, arr, function(val, i) {
        this[i] = val;
      }, self);
      assert( self !== arr );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.until.arr();
      }, validTypeErr);
    });

    test(true, function() {
      assert.throws(function() {
        vitals.until.arr(true);
      }, validTypeErr);
    });

    test(true, [], function() {
      assert.throws(function() {
        vitals.until.arr(true, []);
      }, validTypeErr);
    });

    test(true, null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.until.arr(true, null, function(){});
      }, validTypeErr);
    });

    test(true, [], '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.until.arr(true, [], function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
