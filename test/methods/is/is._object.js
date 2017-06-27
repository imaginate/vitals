/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is._object
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

method('is._object', 'is._obj', function() {

  should('return true', function() {

    test({}, function() {
      var result = vitals.is._obj({});
      assert( result === true );
    });

    test(function(){}, {}, {}, function() {
      var result = vitals.is._obj(function(){}, {}, {});
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is._obj(null);
      assert( result === false );
    });

    test(function(){}, {}, undefined, function() {
      var result = vitals.is._obj(function(){}, {}, undefined);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is._obj();
      }, validErr);
    });
  });
});
