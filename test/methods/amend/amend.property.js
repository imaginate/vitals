/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.property
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.amend docs](https://github.com/imaginate/vitals/wiki/vitals.amend)
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

method('amend.property', function() {

  should('add prop to obj', function() {

    test({}, 'a', 1, function() {
      var obj = vitals.amend.prop({}, 'a', 1);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });
  });

  should('add prop to obj with valid descriptor', function() {

    test({}, 'a', '<descriptor>', function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });

    test({}, 'a', 1, '<descriptor>', function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });
  });

  should('add prop to obj with strong type check', function() {

    test({}, 'a', 1, 'number', function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number');
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });

    test({}, 'a', 1, '<descriptor>', 'number', function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number');
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });

    test({}, 'a', '<descriptor>', 'number', function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number');
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });
  });

  should('add prop to obj with valid setter', function() {

    test({}, 'a', 1, '<setter>', function() {
      var obj = vitals.amend.prop({}, 'a', 1, setter);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    test({}, 'a', 1, '<descriptor>', '<setter>', function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    test({}, 'a', '<descriptor>', '<setter>', function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    test({}, 'a', 1, 'number', '<setter>', function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number', setter);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });

    test({}, 'a', 1, '<descriptor>', 'number', '<setter>', function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number', setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });

    test({}, 'a', '<descriptor>', 'number', '<setter>', function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number', setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });
  });

  should('throw an error', function() {

    test({}, function() {
      assert.throws(function() {
        vitals.amend({});
      }, validTypeErr);
    });

    test({}, 'a', function() {
      assert.throws(function() {
        vitals.amend({}, 'a');
      }, validErr);
    });

    test('string', 'a', 5, function() {
      assert.throws(function() {
        vitals.amend('string', 'a', 5);
      }, validTypeErr);
    });

    test({}, 5, 5, function() {
      assert.throws(function() {
        vitals.amend({}, 5, 5);
      }, validTypeErr);
    });

    test({}, 'a', 5, 'string', function() {
      assert.throws(function() {
        vitals.amend({}, 'a', 5, 'string');
      }, validErr);
    });

    test({}, 'a', 5, 'number', {}, function() {
      assert.throws(function() {
        vitals.amend({}, 'a', 5, 'number', {});
      }, validTypeErr);
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} newVal
 * @param {number=} oldVal
 * @return {number}
 */
function setter(newVal, oldVal) {
  oldVal = oldVal || 1;
  return newVal + oldVal;
}
