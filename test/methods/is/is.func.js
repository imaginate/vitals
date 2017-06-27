/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.func
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.func', function() {

  should('return true', function() {

    test('<Func>', function() {
      var func = function(){};
      var result = vitals.is.func(func);
      assert( result === true );
    });

    test('<Func>', '<Func>', '<Func>', function() {
      var func1 = function(){};
      var func2 = function(){};
      var func3 = function(){};
      var result = vitals.is.func(func1, func2, func3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.func(null);
      assert( result === false );
    });

    test('<Func>', '<Func>', {}, function() {
      var func1 = function(){};
      var func2 = function(){};
      var result = vitals.is.func(func1, func2, {});
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.func();
      }, validErr);
    });
  });
});
