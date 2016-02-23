/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.create
 * -----------------------------------------------------------------------------
 * @see [vitals.create docs](https://github.com/imaginate/vitals/wiki/vitals.create)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.create (section:strict)', function() {
  var title;

  title = titleStr('should create new obj with given prototype');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var obj = vitals.create(null);
      var proto = getPrototype(obj);
      assert( proto === null );
    });

    title = callStr({});
    it(title, function() {
      var proto1 = { a: function(){} };
      var obj = vitals.create(proto1);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
    });

    title = callStr('<Array.prototype>');
    it(title, function() {
      var proto1 = Array.prototype;
      var obj = vitals.create(proto1);
      var proto2 = getPrototype(obj);
      assert( proto1 === proto2 );
    });
  });

  title = titleStr('should create new obj with given prototype and props');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 });
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b', 'c' ], 5);
    it(title, function() {
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

    title = callStr({}, 'a,b,c', 5);
    it(title, function() {
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

    title = callStr({}, '<descriptors>');
    it(title, function() {
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

  title = titleStr('should create new obj with given prototype and props with valid descriptor');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 }, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, '<varied props>', '<descriptor>');
    it(title, function() {
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

  title = titleStr('should create new obj with given prototype and props with strong type check');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2 }, 'number');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, 'number');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, 'number');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', 'number');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<descriptor>', 'number');
    it(title, function() {
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

  title = titleStr('should create new obj with given prototype and props with valid setter');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2 }, '<setter>');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, '<setter>');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, '<setter>');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<setter>');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<descriptor>', '<setter>');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<descriptor>', 'number', '<setter>');
    it(title, function() {
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

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.create();
      }, validTypeErr);
    });

    title = callStr('string');
    it(title, function() {
      assert.throws(function() {
        vitals.create('string');
      }, validTypeErr);
    });

    title = callStr({}, 5, 5);
    it(title, function() {
      assert.throws(function() {
        vitals.create({}, 5, 5);
      }, validTypeErr);
    });

    title = callStr({}, 'a,b,c');
    it(title, function() {
      assert.throws(function() {
        vitals.create({}, 'a,b,c');
      }, validErr);
    });

    title = callStr({}, 'a,b,c', 5, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.create({}, 'a,b,c', 5, 'string');
      }, validErr);
    });

    title = callStr({}, 'a,b,c', 5, 'number', {});
    it(title, function() {
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
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('create', arguments, 3);
}

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
