/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.each.cycle
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.each docs](https://github.com/imaginate/vitals/wiki/vitals.each)
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

method('each.cycle', 'each.time', function() {

  should('iterate for x number of cycles', function() {

    test(3, '<iteratee>', function() {
      var cycles = [];
      var cycle = 0;
      vitals.each.time(3, function(i) {
        cycles[i] = ++cycle;
      });
      assert( cycles[0] === 1 );
      assert( cycles[1] === 2 );
      assert( cycles[2] === 3 );
      assert( cycles.length === 3 );
    });
  });

  should('return the valid result', function() {

    test(3, '<iteratee>', function() {
      var result = vitals.each.time(3, function(i){});
      assert( is.undefined(result) );
    });
  });

  should('bind the iteratee correctly', function() {

    test(3, '<iteratee>', '<this>', function() {
      var cycle = 0;
      var self = new Array(3);
      vitals.each.time(3, function(i) {
        this[i] = ++cycle;
      }, self);
      assert( is.arr(self) );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.each.time();
      }, validTypeErr);
    });

    test(5, function() {
      assert.throws(function() {
        vitals.each.time(5);
      }, validTypeErr);
    });

    test({}, '<iteratee>', function() {
      assert.throws(function() {
        vitals.each.time({}, function(){});
      }, validTypeErr);
    });

    test(5, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.each.time(5, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
