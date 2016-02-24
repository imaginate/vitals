/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.properties
 * -----------------------------------------------------------------------------
 * @see [vitals.amend docs](https://github.com/imaginate/vitals/wiki/vitals.amend)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.amend.properties (section:strict)', function() {
  var title;

  title = titleStr('should add props to obj');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 });
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b', 'c' ], 5);
    it(title, function() {
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

    title = callStr({}, 'a,b,c', 5);
    it(title, function() {
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

    title = callStr({}, '<descriptors>');
    it(title, function() {
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

  title = titleStr('should add props to obj with valid descriptor');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2, c: 3 }, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, '<descriptor>');
    it(title, function() {
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

    title = callStr({}, '<varied props>', '<descriptor>');
    it(title, function() {
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

  title = titleStr('should add props to obj with strong type check');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2 }, 'number');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, 'number');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, 'number');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', 'number');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<descriptor>', 'number');
    it(title, function() {
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

  title = titleStr('should add props to obj with valid setter');
  describe(title, function() {

    title = callStr({}, { a: 1, b: 2 }, '<setter>');
    it(title, function() {
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

    title = callStr({}, [ 'a', 'b' ], 5, '<setter>');
    it(title, function() {
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

    title = callStr({}, 'a,b', 5, '<setter>');
    it(title, function() {
      var obj = vitals.amend.props({}, 'a,b', 5, setter);
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

    title = callStr({}, '<descriptors>', '<descriptor>', '<setter>');
    it(title, function() {
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

    title = callStr({}, '<descriptors>', '<descriptor>', 'number', '<setter>');
    it(title, function() {
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

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props();
      }, validTypeErr);
    });

    title = callStr('string', 'a,b,c', 5);
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props('string', 'a,b,c', 5);
      });
    }, validTypeErr);

    title = callStr({}, 5, 5);
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props({}, 5, 5);
      });
    }, validTypeErr);

    title = callStr({}, 'a,b,c');
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c');
      });
    }, validErr);

    title = callStr({}, 'a,b,c', 5, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c', 5, 'string');
      });
    }, validErr);

    title = callStr({}, 'a,b,c', 5, 'number', {});
    it(title, function() {
      assert.throws(function() {
        vitals.amend.props({}, 'a,b,c', 5, 'number', {});
      });
    }, validTypeErr);
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
  return testCall('amend.props', arguments, 3);
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
