/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.args
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.args', function() {

  should('return true', function() {

    test('<args>', function() {
      var args = (function(){ return arguments; })();
      var result = vitals.is.args(args);
      assert( result === true );
    });

    test('<args>', '<args>', '<args>', function() {
      var args1 = (function(){ return arguments; })();
      var args2 = (function(){ return arguments; })();
      var args3 = (function(){ return arguments; })();
      var result = vitals.is.args(args1, args2, args3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.args(null);
      assert( result === false );
    });

    test('<args>', '<args>', [], function() {
      var args1 = (function(){ return arguments; })();
      var args2 = (function(){ return arguments; })();
      var result = vitals.is.args(args1, args2, []);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.args();
      }, validErr);
    });
  });
});
