/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.properties
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

method('amend.properties', function() {

  should('add props to obj', function() {

    test({}, { a: 1, b: 2, c: 3 }, function() {
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.amend.props({}, props);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert( obj.c === 4 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert( hasEnum(obj, 'c') );
    });

    test({}, [ 'a', 'b', 'c' ], 5, function() {
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.amend.props({}, props, 5);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      assert( obj.c === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( obj.c === 6 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert( hasEnum(obj, 'c') );
    });

    test({}, 'a,b,c', 5, function() {
      var obj = vitals.amend.props({}, 'a,b,c', 5);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      assert( obj.c === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( obj.c === 6 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert( hasEnum(obj, 'c') );
    });

    test({}, '<descriptors>', function() {
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.amend.props({}, props);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });
  });

  should('add props to obj with valid descriptor', function() {

    test({}, { a: 1, b: 2, c: 3 }, '<descriptor>', function() {
      var props = freeze({ a: 1, b: 2, c: 3 });
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert( obj.c === 4 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
      assert( !hasEnum(obj, 'c') );
    });

    test({}, [ 'a', 'b' ], 5, '<descriptor>', function() {
      var props = freeze([ 'a', 'b' ]);
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, 5, desc);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, 'a,b', 5, '<descriptor>', function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, 'a,b', 5, desc);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<varied props>', '<descriptor>', function() {
      var props = freeze({ a: { value: 1, enumerable: true }, b: 2 });
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });
  });

  should('add props to obj with strong type check', function() {

    test({}, { a: 1, b: 2 }, 'number', function() {
      var props = freeze({ a: 1, b: 2 });
      var obj = vitals.amend.props({}, props, 'number');
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
    });

    test({}, [ 'a', 'b' ], 5, 'number', function() {
      var props = freeze([ 'a', 'b' ]);
      var obj = vitals.amend.props({}, props, 5, 'number');
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
    });

    test({}, 'a,b', 5, 'number', function() {
      var obj = vitals.amend.props({}, 'a,b', 5, 'number');
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
    });

    test({}, '<descriptors>', 'number', function() {
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.amend.props({}, props, 'number');
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
    });

    test({}, '<descriptors>', '<descriptor>', 'number', function() {
      var props = freeze({
        a: { value: 1, enumerable: true },
        b: { value: 2 }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, desc, 'number');
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
    });
  });

  should('add props to obj with valid setter', function() {

    test({}, { a: 1, b: 2 }, '<setter>', function() {
      var props = freeze({ a: 1, b: 2 });
      var obj = vitals.amend.props({}, props, setter);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, [ 'a', 'b' ], 5, '<setter>', function() {
      var props = freeze([ 'a', 'b' ]);
      var obj = vitals.amend.props({}, props, 5, setter);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 11 );
      assert( obj.b === 11 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, 'a,b', 5, '<setter>', function() {
      var obj = vitals.amend.props({}, 'a,b', 5, setter);
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 11 );
      assert( obj.b === 11 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<setter>', function() {
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.amend.props({}, props, setter);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<descriptor>', '<setter>', function() {
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, desc, setter);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<descriptor>', 'number', '<setter>', function() {
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.props({}, props, desc, 'number', setter);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert.throws(function() { obj.b = 'string'; }, validSetErr);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.amend.props();
      }, validTypeErr);
    });

    test('string', 'a,b,c', 5, function() {
      assert.throws(function() {
        vitals.amend.props('string', 'a,b,c', 5);
      }, validTypeErr);
    });

    test({}, 5, 5, function() {
      assert.throws(function() {
        vitals.amend.props({}, 5, 5);
      }, validTypeErr);
    });

    test({}, 'a,b,c', function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c');
      }, validErr);
    });

    test({}, 'a,b,c', 5, 'string', function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c', 5, 'string');
      }, validErr);
    });

    test({}, 'a,b,c', 5, 'number', {}, function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c', 5, 'number', {});
      }, validTypeErr);
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @param {number} amount
 * @return {!Object}
 */
function incrementProps(obj, amount) {
  if ('a' in obj) obj.a += amount;
  if ('b' in obj) obj.b += amount;
  if ('c' in obj) obj.c += amount;
  return obj;
}

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
