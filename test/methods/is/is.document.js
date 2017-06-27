/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.document
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

method('is.document', 'is.doc', function() {

  should('return true', function() {

    test('<Document>', function() {
      var doc = { nodeType: 9 };
      var result = vitals.is.doc(doc);
      assert( result === true );
    });

    test('<Document>', '<Document>', '<Document>', function() {
      var doc1 = { nodeType: 9 };
      var doc2 = { nodeType: 9 };
      var doc3 = { nodeType: 9 };
      var result = vitals.is.doc(doc1, doc2, doc3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.doc(null);
      assert( result === false );
    });

    test('<Document>', '<Document>', '<Object>', function() {
      var doc1 = { nodeType: 9 };
      var doc2 = { nodeType: 9 };
      var obj3 = { nodeType: 3 };
      var result = vitals.is.doc(doc1, doc2, obj3);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.doc();
      }, validErr);
    });
  });
});
