/**
 * ---------------------------------------------------------------------------
 * VITALS.CREATE.OBJECT UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.create.object
 * @alias vitals.create.obj
 * @submethod object
 * @super create
 * @section strict
 * @section all
 * @build browser
 * @build node
 *
 * @see [vitals.create](https://github.com/imaginate/vitals/wiki/vitals.create)
 *
 * @author Adam Smith <adam@imaginate.life> (http://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = global.VITALS_TEST.loadHelper;
/// #}}} @func loadHelper

/// #{{{ @func assert
/**
 * @private
 * @param {boolean} result
 * @return {void}
 */
var assert = require('assert');
/// #}}} @func assert

/// #{{{ @func freeze
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freeze = loadHelper('freeze-object');
/// #}}} @func freeze

/// #{{{ @func getPrototype
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {?Object}
 */
var getPrototype = loadHelper('get-prototype');
/// #}}} @func getPrototype

/// #{{{ @func hasEnum
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasEnum = loadHelper('has-enum-property');
/// #}}} @func hasEnum

/// #{{{ @func hasOwn
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwn = loadHelper('has-own-property');
/// #}}} @func hasOwn

/// #{{{ @func hasOwnEnum
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnum = loadHelper('has-own-enum-property');
/// #}}} @func hasOwnEnum

/// #{{{ @func hasOwnNoEnum
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
function hasOwnNoEnum(src, key) {
  return hasOwn(src, key) && !hasEnum(src, key);
}
/// #}}} @func hasOwnNoEnum

/// #{{{ @func incrementProps
/**
 * @private
 * @param {!Object} src
 * @param {number} amount
 * @return {!Object}
 */
function incrementProps(src, amount) {

  if ('a' in src) {
    src.a += amount;
  }
  if ('b' in src) {
    src.b += amount;
  }
  if ('c' in src) {
    src.c += amount;
  }
  if ('a,b' in src) {
    src['a,b'] += amount;
  }
  if ('a,b,c' in src) {
    src['a,b,c'] += amount;
  }

  return src;
}
/// #}}} @func incrementProps

/// #{{{ @const is
/**
 * @private
 * @const {!Object<string, !function>}
 */
var is = loadHelper('is');
/// #}}} @const is

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = is.nil;
/// #}}} @func isNull

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = is.number;
/// #}}} @func isNumber

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = is.object;
/// #}}} @func isObject

/// #{{{ @func throws
/**
 * @private
 * @param {!function} action
 * @return {void}
 */
var throws = loadHelper('throws-error');
/// #}}} @func throws

/// #{{{ @const vitals
/**
 * @private
 * @const {(!Object|!Function)}
 */
var vitals = global.VITALS_TEST.VITALS;
/// #}}} @const vitals

/// #}}} @group HELPERS

/// #{{{ @group TESTS
//////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @suite create.object
method('create.object', 'create.obj', function createObjectTests() {

  /// #{{{ @func setter
  /**
   * @private
   * @param {number} newVal
   * @param {number=} oldVal = `1`
   * @return {number}
   */
  function setter(newVal, oldVal) {
    newVal += isNumber(oldVal)
      ? oldVal
      : 1;
    return newVal;
  }
  /// #}}} @func setter

  /// #{{{ @tests A
  should('A', 'make new object with given prototype', function createObjectTestsA() {

    /// #{{{ @test A1
    test('A1', [ null ], function createObjectTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {?Object} */
      var proto;

      result = vitals.create.object(null);
      proto = getPrototype(result);

      assert( isObject(result) );
      assert( isNull(proto) );
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ {} ], function createObjectTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create.object(proto1);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ '<Array.prototype>' ], function createObjectTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = Array.prototype;
      result = vitals.create.object(proto1);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'make new object with prototype and properties', function createObjectTestsB() {

    /// #{{{ @test B1
    test('B1', [ {}, { 'a': 1, 'b': 2, 'c': 3 } ], function createObjectTestB1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': 1,
        'b': 2,
        'c': 3
      });

      result = vitals.create.object(proto1, props);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);
      assert(result.c === 4);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ {}, [ 'a', 'b', 'c' ], 5 ], function createObjectTestB2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;

      proto1 = {};
      keys = freeze([
        'a',
        'b',
        'c'
      ]);

      result = vitals.create.object(proto1, keys, 5);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 5);
      assert(result.b === 5);
      assert(result.c === 5);

      incrementProps(result, 1);

      assert(result.a === 6);
      assert(result.b === 6);
      assert(result.c === 6);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ {}, 'a,b,c', 5 ], function createObjectTestB3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create.object(proto1, 'a,b,c', 5);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result['a,b,c'] === 5);

      incrementProps(result, 1);

      assert(result['a,b,c'] === 6);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( !hasOwn(result, 'c') );
      assert( hasOwnEnum(result, 'a,b,c') );
    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ {}, '<descriptors>' ], function createObjectTestB4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': false
        },
        'b': {
          'value': 2,
          'enumerable': false
        }
      }, true);

      result = vitals.create.object(proto1, props);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [ {}, [ 'a', 'b', 'c' ] ], function createObjectTestB5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;

      proto1 = {};
      keys = freeze([ 'a', 'b', 'c' ]);

      result = vitals.create.object(proto1, keys);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === undefined);
      assert(result.b === undefined);
      assert(result.c === undefined);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [ {}, [ 'a', 'b', 'c' ], {} ], function createObjectTestB6() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var val;

      proto1 = {};
      val = freeze({});
      keys = freeze([ 'a', 'b', 'c' ]);

      result = vitals.create.object(proto1, keys, val);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === val);
      assert(result.b === val);
      assert(result.c === val);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test B6

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'make object with prototype, properties, and descriptors', function createObjectTestsC() {

    /// #{{{ @test C1
    test('C1', [ 
      {}, { 'a': 1, 'b': 2, 'c': 3 }, '<descriptor>'
    ], function createObjectTestC1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = {};
      props = freeze({
        'a': 1,
        'b': 2,
        'c': 3
      });
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);
      assert(result.c === 4);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
      assert( hasOwnNoEnum(result, 'c') );
    });
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [
      {}, [ 'a','b' ], 5, '<descriptor>'
    ], function createObjectTestC2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var desc;
      /** @type {!Array} */
      var keys;

      proto1 = {};
      keys = freeze([ 'a', 'b' ]);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, keys, 5, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 5);
      assert(result.b === 5);

      incrementProps(result, 1);

      assert(result.a === 6);
      assert(result.b === 6);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test C2

    /// #{{{ @test C3
    test('C3', [ {}, 'a,b', 5, '<descriptor>' ], function createObjectTestC3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var desc;

      proto1 = {};
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, 'a,b', 5, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result['a,b'] === 5);

      incrementProps(result, 1);

      assert(result['a,b'] === 6);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( hasOwnNoEnum(result, 'a,b') );
    });
    /// #}}} @test C3

    /// #{{{ @test C4
    test('C4', [
      {}, '<varied-props>', '<descriptor>'
    ], function createObjectTestC4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': 2,
        'c': {
          'value': 3,
          'enumerable': true
        }
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);
      assert(result.c === 4);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test C4

    /// #{{{ @test C5
    test('C5', [
      {}, '<varied-props>', 5, '<descriptor>'
    ], function createObjectTestC5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': 2,
        'c': {
          'enumerable': true
        }
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, 5, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 5);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);
      assert(result.c === 6);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test C5

    /// #{{{ @test C6
    test('C6', [
      {}, [ 'a', 'b', 'c' ], '<descriptor>', '<descriptor>'
    ], function createObjectTestC6() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var val;

      proto1 = {};
      keys = freeze([ 'a', 'b', 'c' ]);
      val = freeze({
        'enumerable': true
      });
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, keys, val, desc);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === val);
      assert(result.b === val);
      assert(result.c === val);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
      assert( hasOwnNoEnum(result, 'c') );
    });
    /// #}}} @test C6

  });
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'make object with prototype, properties, and strong type check', function createObjectTestsD() {

    /// #{{{ @test D1
    test('D1', [
      {}, { 'a': 1, 'b': 2 }, 5, 'number'
    ], function createObjectTestD1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': 1,
        'b': 2
      });

      result = vitals.create.object(proto1, props, 5, 'number');
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );

      throws.setter(function() {
        result.a = 'string';
      });
      throws.setter(function() {
        result.b = 'string';
      });

      assert(result.a === 2);
      assert(result.b === 3);
    });
    /// #}}} @test D1

    /// #{{{ @test D2
    test('D2', [
      {}, [ 'a', 'b' ], 5, 'number'
    ], function createObjectTestD2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;

      proto1 = {};
      keys = freeze([ 'a', 'b' ]);
      result = vitals.create.object(proto1, keys, 5, 'number');
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 5);
      assert(result.b === 5);

      incrementProps(result, 1);

      assert(result.a === 6);
      assert(result.b === 6);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );

      throws.setter(function() {
        result.a = 'string';
      });
      throws.setter(function() {
        result.b = 'string';
      });

      assert(result.a === 6);
      assert(result.b === 6);
    });
    /// #}}} @test D2

    /// #{{{ @test D3
    test('D3', [ {}, 'a,b', 5, 'number' ], function createObjectTestD3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create.object(proto1, 'a,b', 5, 'number');
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result['a,b'] === 5);

      incrementProps(result, 1);

      assert(result['a,b'] === 6);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( hasOwnEnum(result, 'a,b') );

      throws.setter(function() {
        result['a,b'] = 'string';
      });

      assert(result['a,b'] === 6);
    });
    /// #}}} @test D3

    /// #{{{ @test D4
    test('D4', [
      {}, '<descriptors>', 5, 'number'
    ], function createObjectTestD4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': {
          'value': 2,
          'enumerable': false
        }
      }, true);

      result = vitals.create.object(proto1, props, 5, 'number');
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );

      throws.setter(function() {
        result.a = 'string';
      });
      throws.setter(function() {
        result.b = 'string';
      });

      assert(result.a === 2);
      assert(result.b === 3);
    });
    /// #}}} @test D4

    /// #{{{ @test D5
    test('D5', [
      {}, '<descriptors>', '<descriptor>', 'number'
    ], function createObjectTestD5() {

      /** @type {!Object} */
      var result;
      /** @type {?Object} */
      var proto1;
      /** @type {?Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = null;
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': {
          'value': 2
        }
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, desc, 'number');
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isNull(proto1) );
      assert( isNull(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );

      throws.setter(function() {
        result.a = 'string';
      });
      throws.setter(function() {
        result.b = 'string';
      });

      assert(result.a === 2);
      assert(result.b === 3);
    });
    /// #}}} @test D5

  });
  /// #}}} @tests D

  /// #{{{ @tests E
  should('E', 'make object with prototype, properties, and setter', function createObjectTestsE() {

    /// #{{{ @test E1
    test('E1', [
      {}, { 'a': 1, 'b': 2 }, 5, '<setter>'
    ], function createObjectTestE1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': 1,
        'b': 2
      });

      result = vitals.create.object(proto1, props, 5, setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
    });
    /// #}}} @test E1

    /// #{{{ @test E2
    test('E2', [
      {}, [ 'a', 'b' ], 5, '<setter>'
    ], function createObjectTestE2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Array} */
      var keys;

      proto1 = {};
      keys = freeze([ 'a', 'b' ]);

      result = vitals.create.object(proto1, keys, 5, setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 5);
      assert(result.b === 5);

      incrementProps(result, 1);

      assert(result.a === 11);
      assert(result.b === 11);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
    });
    /// #}}} @test E2

    /// #{{{ @test E3
    test('E3', [ {}, 'a,b', 5, '<setter>' ], function createObjectTestE3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};

      result = vitals.create.object(proto1, 'a,b', 5, setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result['a,b'] === 5);

      incrementProps(result, 1);

      assert(result['a,b'] === 11);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( hasOwnEnum(result, 'a,b') );
    });
    /// #}}} @test E3

    /// #{{{ @test E4
    test('E4', [
      {}, '<descriptors>', 5, '<setter>'
    ], function createObjectTestE4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': false
        },
        'b': {
          'value': 2,
          'enumerable': false
        }
      }, true);

      result = vitals.create.object(proto1, props, 5, setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test E4

    /// #{{{ @test E5
    test('E5', [
      {}, '<descriptors>', '<descriptor>', '<setter>'
    ], function createObjectTestE5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = {};
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': {
          'value': 2,
          'enumerable': false
        }
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, desc, setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test E5

    /// #{{{ @test E6
    test('E6', [
      {}, '<descriptors>', '<descriptor>', 'number', '<setter>'
    ], function createObjectTestE6() {

      /** @type {!Object} */
      var result;
      /** @type {?Object} */
      var proto1;
      /** @type {?Object} */
      var proto2;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;

      proto1 = null;
      props = freeze({
        'a': {
          'value': 1,
          'enumerable': true
        },
        'b': {
          'value': 2,
          'enumerable': false
        }
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create.object(proto1, props, desc, 'number', setter);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isNull(proto1) );
      assert( isNull(proto2) );

      assert(proto1 === proto2);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );

      throws.setter(function() {
        result.a = 'string';
      });
      throws.setter(function() {
        result.b = 'string';
      });

      assert(result.a === 3);
      assert(result.b === 5);
    });
    /// #}}} @test E6

  });
  /// #}}} @tests E

  /// #{{{ @tests F
  should('F', 'should throw a vitals error', function createObjectTestsF() {

    /// #{{{ @test F1
    test('F1', [], function createObjectTestF1() {

      throws(function() {
        vitals.create.object();
      });

    });
    /// #}}} @test F1

    /// #{{{ @test F2
    test('F2', [ 'fail' ], function createObjectTestF2() {

      throws.type(function() {
        vitals.create.object('fail');
      });

    });
    /// #}}} @test F2

    /// #{{{ @test F3
    test('F3', [ {}, 5, 5 ], function createObjectTestF3() {

      throws.type(function() {
        vitals.create.object({}, 5, 5);
      });

    });
    /// #}}} @test F3

    /// #{{{ @test F4
    test('F4', [
      {}, 'a,b', 5, { 'fail': true }
    ], function createObjectTestF4() {

      throws.range(function() {
        vitals.create.object({}, 'a,b', 5, {
          'fail': true
        });
      });

    });
    /// #}}} @test F4

    /// #{{{ @test F5
    test('F5', [
      {}, 'a,b,c', [ 'not-string' ], 'string'
    ], function createObjectTestF5() {

      throws.type(function() {
        vitals.create.object({}, 'a,b,c', [ 'not-string' ], 'string');
      });

    });
    /// #}}} @test F5

    /// #{{{ @test F6
    test('F6', [
      {}, 'a,b,c', 5, 'number', [ 'not-function' ]
    ], function createObjectTestF6() {

      throws.type(function() {
        vitals.create.object({}, 'a,b,c', 5, 'number', [ 'not-function' ]);
      });

    });
    /// #}}} @test F6

    /// #{{{ @test F7
    test('F7', [ {}, '', 5 ], function createObjectTestF7() {

      throws(function() {
        vitals.create.object({}, '', 5);
      });

    });
    /// #}}} @test F7

    /// #{{{ @test F8
    test('F8', [ {}, [ 'a', '', 'c' ], 5 ], function createObjectTestF8() {

      throws(function() {
        vitals.create.object({}, [ 'a', '', 'c' ], 5);
      });

    });
    /// #}}} @test F8

    /// #{{{ @test F9
    test('F9', [
      {}, 'a,b', 5, '<descriptor>', 'number'
    ], function createObjectTestF9() {

      throws(function() {
        vitals.create.object({}, 'a,b', 5, {
          'writable': false
        }, 'number');
      });

    });
    /// #}}} @test F9

  });
  /// #}}} @tests F

});
/// #}}} @suite create.object

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
