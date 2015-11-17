/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CREATE.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.create]{@link https://github.com/imaginate/vitals/blob/master/src/methods/create.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('create.object (sections:js,configure)', function() {
  var title;

  title = 'basic tests should create a new obj with the given prototype';
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var obj = vitals.create.obj(null);
      assert(getProto(obj) === null);
    });

    title = callStr({});
    it(title, function() {
      var proto = { a: function(){} };
      var obj = vitals.create.obj(proto);
      assert(getProto(obj) === proto);
    });

    title = callStr('<Array.prototype>');
    it(title, function() {
      var obj = vitals.create.obj(Array.prototype);
      assert(getProto(obj) === Array.prototype);
    });

  });

  title = 'basic prop tests should create a new obj with the given ';
  title += 'prototype and amend the input props';
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 });
    it(title, function() {
      var proto = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.create.obj(proto, props);
      assert(getProto(obj) === proto);
      each(props, function(val, key) {
        assert(obj[key] === val);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
      });
    });

    title = callStr({}, [ 'a', 'b', 'c' ], 5);
    it(title, function() {
      var proto = {};
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.create.obj(proto, props, 5);
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = 6;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, 'a,b,c', 5);
    it(title, function() {
      var proto = {};
      var props = [ 'a', 'b', 'c' ];
      var obj = vitals.create.obj(proto, 'a,b,c', 5);
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = 6;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    });
    it(title, function() {
      var proto = {};
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create.obj(proto, props);
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
      });
    });

  });

  title = 'default descriptor tests should create a new obj with the given ';
  title += 'prototype and amend the input props with the correct config';
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 }, { enumerable: false });
    it(title, function() {
      var proto = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.create.obj(proto, props, { enumerable: false });
      assert(getProto(obj) === proto);
      each(props, function(val, key) {
        assert(obj[key] === val);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
      });
    });

    title = callStr({}, [ 'a', 'b', 'c' ], 5, { enumerable: false });
    it(title, function() {
      var proto = {};
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.create.obj(proto, props, 5, { enumerable: false });
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = 6;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, 'a,b,c', 5, { enumerable: false });
    it(title, function() {
      var proto = {};
      var props = [ 'a', 'b', 'c' ];
      var obj = vitals.create.obj(proto, 'a,b,c', 5, { enumerable: false });
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = 6;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: true },
      b: 2
    }, { enumerable: false });
    it(title, function() {
      var proto = {};
      var props = { a: { value: 1, enumerable: true }, b: 2 };
      var obj = vitals.create.obj(proto, props, { enumerable: false });
      assert(getProto(obj) === proto);
      each({ a: 1, b: 2 }, function(val, key) {
        assert(obj[key] === val);
        assert(key in obj);
        if (key === 'a') assert( has.enum(obj, key) );
        if (key === 'b') assert( !has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
      });
    });

  });

  title = 'static type tests should create a new obj with the given prototype ';
  title += 'and amend the input props with the correct static type setter';
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 }, 'number');
    it(title, function() {
      var proto = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.create.obj(proto, props, 'number');
      assert(getProto(obj) === proto);
      each(props, function(val, key) {
        assert(obj[key] === val);
        assert(key in obj);
        obj[key] = ++val;
        assert(obj[key] === val);
        obj[key] = 'string';
        assert(obj[key] === val);
      });
    });

    title = callStr({}, [ 'a', 'b', 'c' ], 5, 'number');
    it(title, function() {
      var proto = {};
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.create.obj(proto, props, 5, 'number');
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        obj[key] = 6;
        assert(obj[key] === 6);
        obj[key] = 'string';
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, 'a,b,c', 5, 'number');
    it(title, function() {
      var proto = {};
      var props = [ 'a', 'b', 'c' ];
      var obj = vitals.create.obj(proto, 'a,b,c', 5, 'number');
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        obj[key] = 6;
        assert(obj[key] === 6);
        obj[key] = 'string';
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    }, 'number');
    it(title, function() {
      var proto = {};
      var props = {
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      };
      var obj = vitals.create.obj(proto, props, 'number');
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
        obj[key] = 'string';
        assert(obj[key] === val);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: true },
      b: { value: 2 }
    }, { enumerable: false }, 'number');
    it(title, function() {
      var proto = null;
      var props = {
        a: { value: 1, enumerable: true },
        b: { value: 2 }
      };
      var obj = vitals.create.obj(proto, props, { enumerable: false }, 'number');
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        if (key === 'a') assert( has.enum(obj, key) );
        if (key === 'b') assert( !has.enum(obj, key) );
        obj[key] = ++val;
        assert(obj[key] === val);
        obj[key] = 'string';
        assert(obj[key] === val);
      });
    });

  });

  title = 'setter tests should create a new obj with the given prototype ';
  title += 'and amend the input props with the correct setter';
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 }, getSetter());
    it(title, function() {
      var proto = {};
      var props = freeze({ a: 1, b: 2, c: 3 });
      var obj = vitals.create.obj(proto, props, getSetter());
      assert(getProto(obj) === proto);
      each(props, function(val, key) {
        assert(obj[key] === val);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === ++val);
      });
    });

    title = callStr({}, [ 'a', 'b', 'c' ], 5, getSetter());
    it(title, function() {
      var proto = {};
      var props = freeze([ 'a', 'b', 'c' ]);
      var obj = vitals.create.obj(proto, props, 5, getSetter());
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, 'a,b,c', 5, getSetter());
    it(title, function() {
      var proto = {};
      var props = [ 'a', 'b', 'c' ];
      var obj = vitals.create.obj(proto, 'a,b,c', 5, getSetter());
      assert(getProto(obj) === proto);
      each(props, function(key) {
        assert(obj[key] === 5);
        assert(key in obj);
        assert( has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === 6);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    }, getSetter());
    it(title, function() {
      var proto = {};
      var props = freeze({
        a: { value: 1, enumerable: false },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create.obj(proto, props, getSetter());
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        assert( !has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === ++val);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: true },
      b: { value: 2, enumerable: false }
    }, { enumerable: false }, getSetter());
    it(title, function() {
      var proto = {};
      var props = freeze({
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false }
      });
      var obj = vitals.create.obj(proto, props, { enumerable: false }, getSetter());
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        if (key === 'a') assert( has.enum(obj, key) );
        if (key === 'b') assert( !has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === ++val);
      });
    });

    title = callStr({}, {
      a: { value: 1, enumerable: true },
      b: { value: 2, enumerable: false }
    }, { enumerable: false }, 'number', getSetter());
    it(title, function() {
      var proto = null;
      var props = freeze({
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false }
      });
      var desc = { enumerable: false };
      var obj = vitals.create.obj(proto, props, desc, 'number', getSetter());
      assert(getProto(obj) === proto);
      each(props, function(desc, key) {
        var val = desc.value;
        assert(obj[key] === val);
        assert(key in obj);
        if (key === 'a') assert( has.enum(obj, key) );
        if (key === 'b') assert( !has.enum(obj, key) );
        obj[key] = 1;
        assert(obj[key] === ++val);
        obj[key] = 'string';
        assert(obj[key] === val);
      });
    });

  });

  describe('error tests should throw an error', function() {

    title = callStr('string');
    it(title, function() {
      assert.throws(function() {
        vitals.create.obj('string');
      });
    });

    title = callStr({}, 5, 5);
    it(title, function() {
      assert.throws(function() {
        vitals.create.obj({}, 5, 5);
      });
    });

    title = callStr({}, 'a,b,c');
    it(title, function() {
      assert.throws(function() {
        vitals.create.obj({}, 'a,b,c');
      });
    });

    title = callStr({}, 'a,b,c', 5, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.create.obj({}, 'a,b,c', 5, 'string');
      });
    });

    title = callStr({}, 'a,b,c', 5, 'number', {});
    it(title, function() {
      assert.throws(function() {
        vitals.create.obj({}, 'a,b,c', 5, 'number', {});
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('create.obj', arguments, 4, true);
}

/**
 * @private
 * @param {!Object} obj
 * @return {Object}
 */
function getProto(obj) {
  return Object.getPrototypeOf(obj);
}

/**
 * @private
 * @return {function}
 */
function getSetter() {
  return function setter(newVal, oldVal) {
    oldVal = oldVal || 1;
    return newVal + oldVal;
  };
}
