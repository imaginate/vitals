/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.empty
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.empty', function() {

  should('return true', function() {

    test([], function() {
      var result = vitals.is.empty([]);
      assert( result === true );
    });

    test(0, '', {}, null, undefined, false, NaN, function(){}, function() {
      var func = function(){};
      var result = vitals.is.empty(0, '', {}, null, undefined, false, NaN, func);
      assert( result === true );
    });
  });

  should('return false', function() {

    test([ 1 ], function() {
      var result = vitals.is.empty([ 1 ]);
      assert( result === false );
    });

    test({ a: 1 }, function() {
      var result = vitals.is.empty({ a: 1 });
      assert( result === false );
    });

    test(function(a){}, function() {
      var func = function(a){};
      var result = vitals.is.empty(func);
      assert( result === false );
    });

    test(1, null, undefined, false, NaN, function() {
      var result = vitals.is.empty(1, null, undefined, false, NaN);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.empty();
      }, validErr);
    });
  });
});
