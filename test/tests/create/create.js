/**
 * ---------------------------------------------------------------------------
 * VITALS.CREATE UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.create
 * @submethod main
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

/// #{{{ @suite create
method('create', function createTests() {

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
  should('A', 'make new object with given prototype', function createTestsA() {

    /// #{{{ @test A1
    test('A1', [ null ], function createTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {?Object} */
      var proto;

      result = vitals.create(null);
      proto = getPrototype(result);

      assert( isObject(result) );
      assert( isNull(proto) );
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ {} ], function createTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create(proto1);
      proto2 = getPrototype(result);

      assert( isObject(result) );
      assert( isObject(proto1) );
      assert( isObject(proto2) );

      assert(proto1 === proto2);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ '<Array.prototype>' ], function createTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = Array.prototype;
      result = vitals.create(proto1);
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
  should('B', 'make new object with prototype and properties', function createTestsB() {

    /// #{{{ @test B1
    test('B1', [ {}, { 'a': 1, 'b': 2, 'c': 3 } ], function createTestB1() {

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

      result = vitals.create(proto1, props);
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
    test('B2', [ {}, [ 'a', 'b', 'c' ], 5 ], function createTestB2() {

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

      result = vitals.create(proto1, keys, 5);
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
    test('B3', [ {}, 'a,b,c', 5 ], function createTestB3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create(proto1, 'a,b,c', 5);
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
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ {}, '<descriptors>' ], function createTestB4() {

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

      result = vitals.create(proto1, props);
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

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'make object with prototype, properties, and descriptors', function createTestsC() {

    /// #{{{ @test C1
    test('C1', [ 
      {}, { 'a': 1, 'b': 2, 'c': 3 }, '<descriptor>'
    ], function createTestC1() {

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

      result = vitals.create(proto1, props, desc);
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
    test('C2', [ {}, [ 'a','b' ], 5, '<descriptor>' ], function createTestC2() {

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

      result = vitals.create(proto1, keys, 5, desc);
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
    test('C3', [ {}, 'a,b', 5, '<descriptor>' ], function createTestC3() {

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

      result = vitals.create(proto1, 'a,b', 5, desc);
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
    /// #}}} @test C3

    /// #{{{ @test C4
    test('C4', [ {}, '<varied-props>', '<descriptor>' ], function createTestC4() {

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
        'b': 2
      }, true);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.create(proto1, props, desc);
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
    });
    /// #}}} @test C4

  });
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'make object with prototype, properties, and strong type check', function createTestsD() {

    /// #{{{ @test D1
    test('D1', [ {}, { 'a': 1, 'b': 2 }, 'number' ], function createTestD1() {

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

      result = vitals.create(proto1, props, 'number');
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
    test('D2', [ {}, [ 'a', 'b' ], 5, 'number' ], function createTestD2() {

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
      result = vitals.create(proto1, keys, 5, 'number');
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
    test('D3', [ {}, 'a,b', 5, 'number' ], function createTestD3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create(proto1, 'a,b', 5, 'number');
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
    /// #}}} @test D3

    /// #{{{ @test D4
    test('D4', [ {}, '<descriptors>', 'number' ], function createTestD4() {

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

      result = vitals.create(proto1, props, 'number');
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
    ], function createTestD5() {

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

      result = vitals.create(proto1, props, desc, 'number');
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
  should('E', 'make object with prototype, properties, and setter', function createTestsE() {

    /// #{{{ @test E1
    test('E1', [ {}, { 'a': 1, 'b': 2 }, '<setter>' ], function createTestE1() {

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

      result = vitals.create(proto1, props, setter);
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
    test('E2', [ {}, [ 'a', 'b' ], 5, '<setter>' ], function createTestE2() {

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
      result = vitals.create(proto1, keys, 5, setter);
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
    test('E3', [ {}, 'a,b', 5, '<setter>' ], function createTestE3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var proto1;
      /** @type {!Object} */
      var proto2;

      proto1 = {};
      result = vitals.create(proto1, 'a,b', 5, setter);
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
    /// #}}} @test E3

    /// #{{{ @test E4
    test('E4', [ {}, '<descriptors>', '<setter>' ], function createTestE4() {

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

      result = vitals.create(proto1, props, setter);
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
    ], function createTestE5() {

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

      result = vitals.create(proto1, props, desc, setter);
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
    ], function createTestE6() {

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

      result = vitals.create(proto1, props, desc, 'number', setter);
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
  should('F', 'should throw a vitals error', function createTestsF() {

    /// #{{{ @test F1
    test('F1', [], function createTestF1() {

      throws(function() {
        vitals.create();
      });

    });
    /// #}}} @test F1

    /// #{{{ @test F2
    test('F2', [ 'string' ], function createTestF2() {

      throws.type(function() {
        vitals.create('string');
      });

    });
    /// #}}} @test F2

    /// #{{{ @test F3
    test('F3', [ {}, 5, 5 ], function createTestF3() {

      throws.type(function() {
        vitals.create({}, 5, 5);
      });

    });
    /// #}}} @test F3

    /// #{{{ @test F4
    test('F4', [ {}, 'a,b,c' ], function createTestF4() {

      throws(function() {
        vitals.create({}, 'a,b,c');
      });

    });
    /// #}}} @test F4

    /// #{{{ @test F5
    test('F5', [ {}, 'a,b,c', 5, 'string' ], function createTestF5() {

      throws.type(function() {
        vitals.create({}, 'a,b,c', 5, 'string');
      });

    });
    /// #}}} @test F5

    /// #{{{ @test F6
    test('F6', [ {}, 'a,b,c', 5, 'number', {} ], function createTestF6() {

      throws.type(function() {
        vitals.create({}, 'a,b,c', 5, 'number', {});
      });

    });
    /// #}}} @test F6

  });
  /// #}}} @tests F

});
/// #}}} @suite create

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
