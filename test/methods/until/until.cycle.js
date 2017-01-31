/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.until.cycle
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

method('until.cycle', function() {

  should('return valid boolean', function() {

    test(true, 3, '<iteratee>', function() {
      var pass = vitals.until.cycle(true, 3, function(i) {
        return i === 1;
      });
      assert( pass === true );
    });

    test(true, 3, '<iteratee>', function() {
      var fail = vitals.until.cycle(true, 3, function(i) {
        return i === 5;
      });
      assert( fail === false );
    });
  });

  should('call the iteratee x times', function() {

    test(true, 3, '<iteratee>', function() {
      var keys = [];
      vitals.until.cycle(true, 3, function(i) {
        keys.push(i);
      });
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('correctly bind the iteratee', function() {

    test(true, 3, '<iteratee>', '<this>', function() {
      var cycle = 0;
      var self = [];
      var fail = vitals.until.cycle(true, 3, function(i) {
        this[i] = ++cycle;
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
        vitals.until.cycle();
      }, validTypeErr);
    });

    test(true, function() {
      assert.throws(function() {
        vitals.until.cycle(true);
      }, validTypeErr);
    });

    test(true, 5, function() {
      assert.throws(function() {
        vitals.until.cycle(true, 5);
      }, validTypeErr);
    });

    test(true, {}, '<iteratee>', function() {
      assert.throws(function() {
        vitals.until.cycle(true, {}, function(){});
      }, validTypeErr);
    });

    test(true, 5, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.until.cycle(true, 5, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
