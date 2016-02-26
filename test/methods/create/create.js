/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.create
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.create docs](https://github.com/imaginate/vitals/wiki/vitals.create)
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

method('create', function() {

  should('create new obj with given prototype', function() {

    test(null, function() {
      var obj = vitals.create(null);
      var proto = getPrototype(obj);
      assert( proto === null );
    });

    test({}, function() {
      var proto1 = { a: function(){} };
      var obj = vitals.create(proto1);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
    });

    test('<Array.prototype>', function() {
      var proto1 = Array.prototype;
      var obj = vitals.create(proto1);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
    });
  });

  should('create new obj with given prototype and props', function() {

    test({}, { a: 1, b: 2, c: 3 }, function() {
      var proto1 = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.create(proto1, props);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.create(proto1, props, 5);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var obj = vitals.create(proto1, 'a,b,c', 5);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create(proto1, props);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });
  });

  should('create new obj with given prototype and props with valid descriptor', function() {

    test({}, { a: 1, b: 2, c: 3 }, '<descriptor>', function() {
      var proto1 = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, desc);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var props = freeze([ 'a', 'b' ]);
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, 5, desc);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, 'a,b', 5, '<descriptor>', function() {
      var proto1 = {};
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, 'a,b', 5, desc);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 6 );
      assert( obj.b === 6 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<varied props>', '<descriptor>', function() {
      var proto1 = {};
      var props = freeze({ a: { value: 1, enumerable: true }, b: 2 }, true);
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, desc);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 2 );
      assert( obj.b === 3 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });
  });

  should('create new obj with given prototype and props with strong type check', function() {

    test({}, { a: 1, b: 2 }, 'number', function() {
      var proto1 = {};
      var props = freeze({ a: 1, b: 2 });
      var obj = vitals.create(proto1, props, 'number');
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var props = freeze([ 'a', 'b' ]);
      var obj = vitals.create(proto1, props, 5, 'number');
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var obj = vitals.create(proto1, 'a,b', 5, 'number');
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = {};
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create(proto1, props, 'number');
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
      var proto1 = null;
      var props = freeze({
        a: { value: 1, enumerable: true },
        b: { value: 2 }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, desc, 'number');
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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

  should('create new obj with given prototype and props with valid setter', function() {

    test({}, { a: 1, b: 2 }, '<setter>', function() {
      var proto1 = {};
      var props = freeze({ a: 1, b: 2 });
      var obj = vitals.create(proto1, props, setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, [ 'a', 'b' ], 5, '<setter>', function() {
      var proto1 = {};
      var props = freeze([ 'a', 'b' ]);
      var obj = vitals.create(proto1, props, 5, setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 11 );
      assert( obj.b === 11 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, 'a,b', 5, '<setter>', function() {
      var proto1 = {};
      var obj = vitals.create(proto1, 'a,b', 5, setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 5 );
      assert( obj.b === 5 );
      incrementProps(obj, 1);
      assert( obj.a === 11 );
      assert( obj.b === 11 );
      assert( hasEnum(obj, 'a') );
      assert( hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<setter>', function() {
      var proto1 = {};
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create(proto1, props, setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert( !hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<descriptor>', '<setter>', function() {
      var proto1 = {};
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, desc, setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      incrementProps(obj, 1);
      assert( obj.a === 3 );
      assert( obj.b === 5 );
      assert(  hasEnum(obj, 'a') );
      assert( !hasEnum(obj, 'b') );
    });

    test({}, '<descriptors>', '<descriptor>', 'number', '<setter>', function() {
      var proto1 = null;
      var props = freeze({
        a: { value: 1, enumerable: true  },
        b: { value: 2, enumerable: false }
      });
      var desc = freeze({ enumerable: false });
      var obj = vitals.create(proto1, props, desc, 'number', setter);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
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
        vitals.create();
      }, validTypeErr);
    });

    test('string', function() {
      assert.throws(function() {
        vitals.create('string');
      }, validTypeErr);
    });

    test({}, 5, 5, function() {
      assert.throws(function() {
        vitals.create({}, 5, 5);
      }, validTypeErr);
    });

    test({}, 'a,b,c', function() {
      assert.throws(function() {
        vitals.create({}, 'a,b,c');
      }, validErr);
    });

    test({}, 'a,b,c', 5, 'string', function() {
      assert.throws(function() {
        vitals.create({}, 'a,b,c', 5, 'string');
      }, validErr);
    });

    test({}, 'a,b,c', 5, 'number', {}, function() {
      assert.throws(function() {
        vitals.create({}, 'a,b,c', 5, 'number', {});
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
