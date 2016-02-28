/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.frozen
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

method('is.frozen', function() {

  should('return true', function() {

    test('<FrozenObj>', function() {
      var obj = freeze({});
      var result = vitals.is.frozen(obj);
      assert( result === true );
    });

    test('<FrozenObj>', '<FrozenObj>', '<FrozenFunc>', function() {
      var obj1 = freeze({});
      var obj2 = freeze({});
      var obj3 = freeze(function(){});
      var result = vitals.is.frozen(obj1, obj2, obj3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.frozen(null);
      assert( result === false );
    });

    test('<FrozenObj>', '<FrozenObj>', {}, function() {
      var obj1 = freeze({});
      var obj2 = freeze({});
      var result = vitals.is.frozen(obj1, obj2, {});
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.frozen();
      }, validErr);
    });

    test('fail', function() {
      assert.throws(function() {
        vitals.is.frozen('fail');
      }, validTypeErr);
    });
  });
});
