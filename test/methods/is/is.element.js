/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.element
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

method('is.element', 'is.elem', function() {

  should('return true', function() {

    test('<Element>', function() {
      var elem = { nodeType: 1 };
      var result = vitals.is.elem(elem);
      assert( result === true );
    });

    test('<Element>', '<Element>', '<Element>', function() {
      var elem1 = { nodeType: 1 };
      var elem2 = { nodeType: 1 };
      var elem3 = { nodeType: 1 };
      var result = vitals.is.elem(elem1, elem2, elem3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.elem(null);
      assert( result === false );
    });

    test('<Element>', '<Element>', '<Object>', function() {
      var elem1 = { nodeType: 1 };
      var elem2 = { nodeType: 1 };
      var misc3 = { nodeType: 3 };
      var result = vitals.is.elem(elem1, elem2, misc3);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.elem();
      }, validErr);
    });
  });
});
