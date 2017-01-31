/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.remap.array
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.remap docs](https://github.com/imaginate/vitals/wiki/vitals.remap)
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

method('remap.array', 'remap.arr', function() {

  should('make new array by iterating over all index => value pairs in source', function() {

    test('<array>', '<iteratee>', function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.remap.arr(arr1, function(val) {
        return ++val;
      });
      assert( arr2 !== arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 4 );
      assert( arr2.length === 3 );
    });

    test('<array>', '<iteratee>', function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.remap.arr(arr1, function(val, i) {
        return i;
      });
      assert( arr2 !== arr1 );
      assert( arr2[0] === 0 );
      assert( arr2[1] === 1 );
      assert( arr2[2] === 2 );
      assert( arr2.length === 3 );
    });
  });

  should('iterate over every index in order', function() {

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.remap.arr(arr, function(val, i) {
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

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.remap.arr(arr, function(val, i, src) {
        assert( arr !== src );
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test('<array>', '<iteratee>', '<this>', function() {
      var arr = [ 1, 2, 3 ];
      var self = [];
      vitals.remap.arr(arr, function(val, i) {
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
        vitals.remap.arr();
      }, validTypeErr);
    });

    test([], function() {
      assert.throws(function() {
        vitals.remap.arr([]);
      }, validTypeErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.remap.arr(null, function(){});
      }, validTypeErr);
    });

    test([], '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.remap.arr([], function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
