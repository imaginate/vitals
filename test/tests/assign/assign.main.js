/**
 * ---------------------------------------------------------------------------
 * VITALS.ASSIGN UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.assign
 * @alias vitals.assign.main
 * @submethod main
 * @super assign
 * @section strict
 * @section all
 * @build browser
 * @build node
 *
 * @see [vitals.assign](https://github.com/imaginate/vitals/wiki/vitals.assign)
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

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = is.number;
/// #}}} @func isNumber

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

/// #{{{ @suite assign.main
method('assign.main', function assignMainTests() {

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
  should('A', 'add new properties to an object', function assignMainTestsA() {

    /// #{{{ @test A1
    test('A1', [ {}, { 'a': 1, 'b': 2, 'c': 3 } ], function assignMainTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
      props = freeze({
        'a': 1,
        'b': 2,
        'c': 3
      });

      result = vitals.assign(obj, props);

      assert(result === obj);

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
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ {}, [ 'a', 'b', 'c' ], 5 ], function assignMainTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;

      obj = {};
      keys = freeze([ 'a', 'b', 'c' ]);

      result = vitals.assign(obj, keys, 5);

      assert(result === obj);

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
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ {}, 'a,b,c', 5 ], function assignMainTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign(obj, 'a,b,c', 5);

      assert(result === obj);

      assert(result['a,b,c'] === 5);

      incrementProps(result, 1);

      assert(result['a,b,c'] === 6);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( !hasOwn(result, 'c') );
      assert( hasOwnEnum(result, 'a,b,c') );
    });
    /// #}}} @test A3

    /// #{{{ @test A4
    test('A4', [ {}, '<descriptors>' ], function assignMainTestA4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 2);
      assert(result.b === 3);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test A4

    /// #{{{ @test A5
    test('A5', [ {}, [ 'a', 'b', 'c' ] ], function assignMainTestA5() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;

      obj = {};
      keys = freeze([ 'a', 'b', 'c' ]);

      result = vitals.assign(obj, keys);

      assert(result === obj);

      assert(result.a === undefined);
      assert(result.b === undefined);
      assert(result.c === undefined);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test A5

    /// #{{{ @test A6
    test('A6', [ {}, [ 'a', 'b', 'c' ], {} ], function assignMainTestA6() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;
      /** @type {!Object} */
      var val;

      obj = {};
      val = freeze({});
      keys = freeze([ 'a', 'b', 'c' ]);

      result = vitals.assign(obj, keys, val);

      assert(result === obj);

      assert(result.a === val);
      assert(result.b === val);
      assert(result.c === val);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
      assert( hasOwnEnum(result, 'c') );
    });
    /// #}}} @test A6

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'add new properties to an object with valid descriptors', function assignMainTestsB() {

    /// #{{{ @test B1
    test('B1', [
      {}, { 'a': 1, 'b': 2, 'c': 3 }, '<descriptor>'
    ], function assignMainTestB1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      props = freeze({
        'a': 1,
        'b': 2,
        'c': 3
      });
      desc = freeze({
        'enumerable': false
      });

      result = vitals.assign(obj, props, desc);

      assert(result === obj);

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
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [
      {}, [ 'a', 'b' ], 5, '<descriptor>'
    ], function assignMainTestB2() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      keys = freeze([ 'a', 'b' ]);
      desc = freeze({
        'enumerable': false
      });

      result = vitals.assign(obj, keys, 5, desc);

      assert(result === obj);

      assert(result.a === 5);
      assert(result.b === 5);

      incrementProps(result, 1);

      assert(result.a === 6);
      assert(result.b === 6);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ {}, 'a,b', 5, '<descriptor>' ], function assignMainTestB3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      desc = freeze({
        'enumerable': false
      });

      result = vitals.assign(obj, 'a,b', 5, desc);

      assert(result === obj);

      assert(result['a,b'] === 5);

      incrementProps(result, 1);

      assert(result['a,b'] === 6);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( hasOwnNoEnum(result, 'a,b') );
    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [
      {}, '<varied-props>', '<descriptor>'
    ], function assignMainTestB4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, desc);

      assert(result === obj);

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
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [
      {}, '<varied-props>', 5, '<descriptor>'
    ], function assignMainTestB5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, 5, desc);

      assert(result === obj);

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
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [
      {}, [ 'a', 'b', 'c' ], '<descriptor>', '<descriptor>'
    ], function assignMainTestB6() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;
      /** @type {!Object} */
      var val;

      obj = {};
      keys = freeze([ 'a', 'b', 'c' ]);
      val = freeze({
        'enumerable': true
      });
      desc = freeze({
        'enumerable': false
      });

      result = vitals.assign(obj, keys, val, desc);

      assert(result === obj);

      assert(result.a === val);
      assert(result.b === val);
      assert(result.c === val);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
      assert( hasOwnNoEnum(result, 'c') );
    });
    /// #}}} @test B6

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'add new properties to an object with a strong type check', function assignMainTestsC() {

    /// #{{{ @test C1
    test('C1', [
      {}, { 'a': 1, 'b': 2 }, 5, 'number'
    ], function assignMainTestC1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
      props = freeze({
        'a': 1,
        'b': 2
      });

      result = vitals.assign(obj, props, 5, 'number');

      assert(result === obj);

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
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [
      {}, [ 'a', 'b' ], 5, 'number'
    ], function assignMainTestC2() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;

      obj = {};
      keys = freeze([ 'a', 'b' ]);

      result = vitals.assign(obj, keys, 5, 'number');

      assert(result === obj);

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
    /// #}}} @test C2

    /// #{{{ @test C3
    test('C3', [
      {}, 'a,b', 5, 'number'
    ], function assignMainTestC3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign(obj, 'a,b', 5, 'number');

      assert(result === obj);

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
    /// #}}} @test C3

    /// #{{{ @test C4
    test('C4', [
      {}, '<descriptors>', 5, 'number'
    ], function assignMainTestC4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, 5, 'number');

      assert(result === obj);

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
    /// #}}} @test C4

    /// #{{{ @test C5
    test('C5', [
      {}, '<descriptors>', '<descriptor>', 'number'
    ], function assignMainTestC5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, desc, 'number');

      assert(result === obj);

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
    /// #}}} @test C5

  });
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'add new properties to an object with a valid setter', function assignMainTestsD() {

    /// #{{{ @test D1
    test('D1', [
      {}, { 'a': 1, 'b': 2 }, 5, '<setter>'
    ], function assignMainTestD1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
      props = freeze({
        'a': 1,
        'b': 2
      });

      result = vitals.assign(obj, props, 5, setter);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
    });
    /// #}}} @test D1

    /// #{{{ @test D2
    test('D2', [
      {}, [ 'a', 'b' ], 5, '<setter>'
    ], function assignMainTestD2() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;

      obj = {};
      keys = freeze([ 'a', 'b' ]);

      result = vitals.assign(obj, keys, 5, setter);

      assert(result === obj);

      assert(result.a === 5);
      assert(result.b === 5);

      incrementProps(result, 1);

      assert(result.a === 11);
      assert(result.b === 11);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnEnum(result, 'b') );
    });
    /// #}}} @test D2

    /// #{{{ @test D3
    test('D3', [ {}, 'a,b', 5, '<setter>' ], function assignMainTestD3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign(obj, 'a,b', 5, setter);

      assert(result === obj);

      assert(result['a,b'] === 5);

      incrementProps(result, 1);

      assert(result['a,b'] === 11);

      assert( !hasOwn(result, 'a') );
      assert( !hasOwn(result, 'b') );
      assert( hasOwnEnum(result, 'a,b') );
    });
    /// #}}} @test D3

    /// #{{{ @test D4
    test('D4', [
      {}, '<descriptors>', 5, '<setter>'
    ], function assignMainTestD4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, 5, setter);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnNoEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test D4

    /// #{{{ @test D5
    test('D5', [
      {}, '<descriptors>', '<descriptor>', '<setter>'
    ], function assignMainTestD5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, desc, setter);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);

      incrementProps(result, 1);

      assert(result.a === 3);
      assert(result.b === 5);

      assert( hasOwnEnum(result, 'a') );
      assert( hasOwnNoEnum(result, 'b') );
    });
    /// #}}} @test D5

    /// #{{{ @test D6
    test('D6', [
      {}, '<descriptors>', '<descriptor>', 'number', '<setter>'
    ], function assignMainTestD6() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
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

      result = vitals.assign(obj, props, desc, 'number', setter);

      assert(result === obj);

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
    /// #}}} @test D6

  });
  /// #}}} @tests D

  /// #{{{ @tests E
  should('E', 'should throw a vitals error', function assignMainTestsE() {

    /// #{{{ @test E1
    test('E1', [], function assignMainTestE1() {

      throws(function() {
        vitals.assign();
      });

    });
    /// #}}} @test E1

    /// #{{{ @test E2
    test('E2', [ 'fail', 'a,b,c', 5 ], function assignMainTestE2() {

      throws.type(function() {
        vitals.assign('fail', 'a,b,c', 5);
      });

    });
    /// #}}} @test E2

    /// #{{{ @test E3
    test('E3', [ {}, 5, 5 ], function assignMainTestE3() {

      throws.type(function() {
        vitals.assign({}, 5, 5);
      });

    });
    /// #}}} @test E3

    /// #{{{ @test E4
    test('E4', [
      {}, 'a,b', 5, { 'fail': true }
    ], function assignMainTestE4() {

      throws.range(function() {
        vitals.assign({}, 'a,b', 5, {
          'fail': true
        });
      });

    });
    /// #}}} @test E4

    /// #{{{ @test E5
    test('E5', [
      {}, 'a,b,c', [ 'not-string' ], 'string'
    ], function assignMainTestE5() {

      throws.type(function() {
        vitals.assign({}, 'a,b,c', [ 'not-string' ], 'string');
      });

    });
    /// #}}} @test E5

    /// #{{{ @test E6
    test('E6', [
      {}, 'a,b,c', 5, 'number', [ 'not-function' ]
    ], function assignMainTestE6() {

      throws.type(function() {
        vitals.assign({}, 'a,b,c', 5, 'number', [ 'not-function' ]);
      });

    });
    /// #}}} @test E6

    /// #{{{ @test E7
    test('E7', [ {}, '', 5 ], function assignMainTestE7() {

      throws(function() {
        vitals.assign({}, '', 5);
      });

    });
    /// #}}} @test E7

    /// #{{{ @test E8
    test('E8', [
      {}, [ 'a', '', 'c' ], 5
    ], function assignMainTestE8() {

      throws(function() {
        vitals.assign({}, [ 'a', '', 'c' ], 5);
      });

    });
    /// #}}} @test E8

    /// #{{{ @test E9
    test('E9', [
      {}, 'a,b', 5, '<descriptor>', 'number'
    ], function assignMainTestE9() {

      throws(function() {
        vitals.assign({}, 'a,b', 5, {
          'writable': false
        }, 'number');
      });

    });
    /// #}}} @test E9

  });
  /// #}}} @tests E

});
/// #}}} @suite assign.main

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
