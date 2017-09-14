/**
 * ---------------------------------------------------------------------------
 * VITALS.ASSIGN.PROPERTY UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.assign.property
 * @alias vitals.assign.prop
 * @submethod property
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

/// #{{{ @suite assign.property
method('assign.property', 'assign.prop', function assignPropertyTests() {

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
  should('A', 'add a new property to an object', function assignPropertyTestsA() {

    /// #{{{ @test A1
    test('A1', [ {}, 'a', 1 ], function assignPropertyTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign.property(obj, 'a', 1);

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ {}, 'a' ], function assignPropertyTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign.property(obj, 'a');

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === undefined);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ {}, 'a', {} ], function assignPropertyTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;
      /** @type {!Object} */
      var val;

      obj = {};
      val = freeze({});

      result = vitals.assign.property(obj, 'a', val);

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === val);
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'add a new property to an object with a valid descriptor', function assignPropertyTestsB() {

    /// #{{{ @test B1
    test('B1', [
      {}, 'a', '<descriptor>'
    ], function assignPropertyTestB1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      desc = freeze({
        'value': 1,
        'enumerable': false
      });

      result = vitals.assign.property(obj, 'a', desc);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);
    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [
      {}, 'a', 1, '<descriptor>'
    ], function assignPropertyTestB2() {

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

      result = vitals.assign.property(obj, 'a', 1, desc);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);
    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [
      {}, 'a', '<descriptor>', '<descriptor>'
    ], function assignPropertyTestB3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;
      /** @type {!Object} */
      var val;

      obj = {};
      val = freeze({
        'value': 1,
        'enumerable': true
      });
      desc = freeze({
        'value': 2,
        'enumerable': false
      });

      result = vitals.assign.property(obj, 'a', val, desc);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === val);
      assert(result.a.value === 1);
    });
    /// #}}} @test B3

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'add a new property to an object with a strong type check', function assignPropertyTestsC() {

    /// #{{{ @test C1
    test('C1', [
      {}, 'a', 1, 'number'
    ], function assignPropertyTestC1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign.property(obj, 'a', 1, 'number');

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 2);
    });
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [
      {}, 'a', 1, '<descriptor>', 'number'
    ], function assignPropertyTestC2() {

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

      result = vitals.assign.property(obj, 'a', 1, desc, 'number');

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 2);
    });
    /// #}}} @test C2

    /// #{{{ @test C3
    test('C3', [
      {}, 'a', '<descriptor>', 'number'
    ], function assignPropertyTestC3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      desc = freeze({
        'value': 1,
        'enumerable': false
      });

      result = vitals.assign.property(obj, 'a', desc, 'number');

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 2);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 2);
    });
    /// #}}} @test C3

  });
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'add a new property to an object with a valid setter', function assignPropertyTestsD() {

    /// #{{{ @test D1
    test('D1', [
      {}, 'a', 1, '<setter>'
    ], function assignPropertyTestD1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign.property(obj, 'a', 1, setter);

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);
    });
    /// #}}} @test D1

    /// #{{{ @test D2
    test('D2', [
      {}, 'a',  1, '<descriptor>', '<setter>'
    ], function assignPropertyTestD2() {

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

      result = vitals.assign.property(obj, 'a', 1, desc, setter);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);
    });
    /// #}}} @test D2

    /// #{{{ @test D3
    test('D3', [
      {}, 'a', '<descriptor>', '<setter>'
    ], function assignPropertyTestD3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      desc = freeze({
        'value': 1,
        'enumerable': false
      });

      result = vitals.assign.property(obj, 'a', desc, setter);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);
    });
    /// #}}} @test D3

    /// #{{{ @test D4
    test('D4', [
      {}, 'a', 1, 'number', '<setter>'
    ], function assignPropertyTestD4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {};

      result = vitals.assign.property(obj, 'a', 1, 'number', setter);

      assert(result === obj);

      assert( hasOwnEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 3);
    });
    /// #}}} @test D4

    /// #{{{ @test D5
    test('D5', [
      {}, 'a', 1, '<descriptor>', 'number', '<setter>'
    ], function assignPropertyTestD5() {

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

      result = vitals.assign.property(obj, 'a', 1, desc, 'number', setter);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 3);
    });
    /// #}}} @test D5

    /// #{{{ @test D6
    test('D6', [
      {}, 'a', '<descriptor>', 'number', '<setter>'
    ], function assignPropertyTestD6() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {};
      desc = freeze({
        'value': 1,
        'enumerable': false
      });

      result = vitals.assign.property(obj, 'a', desc, 'number', setter);

      assert(result === obj);

      assert( hasOwnNoEnum(result, 'a') );

      assert(result.a === 1);

      result.a = 2;

      assert(result.a === 3);

      throws.setter(function() {
        result.a = 'string';
      });

      assert(result.a === 3);
    });
    /// #}}} @test D6

  });
  /// #}}} @tests D

  /// #{{{ @tests E
  should('E', 'should throw a vitals error', function assignPropertyTestsE() {

    /// #{{{ @test E1
    test('E1', [], function assignPropertyTestE1() {

      throws(function() {
        vitals.assign.property();
      });

    });
    /// #}}} @test E1

    /// #{{{ @test E2
    test('E2', [ {} ], function assignPropertyTestE2() {

      throws(function() {
        vitals.assign.property({});
      });

    });
    /// #}}} @test E2

    /// #{{{ @test E3
    test('E3', [ 'fail', 'a', 5 ], function assignPropertyTestE3() {

      throws.type(function() {
        vitals.assign.property('fail', 'a', 5);
      });

    });
    /// #}}} @test E3

    /// #{{{ @test E4
    test('E4', [ {}, 5, 5 ], function assignPropertyTestE4() {

      throws.type(function() {
        vitals.assign.property({}, 5, 5);
      });

    });
    /// #}}} @test E4

    /// #{{{ @test E5
    test('E5', [
      {}, 'a', [ 'not-string' ], 'string'
    ], function assignPropertyTestE5() {

      throws.type(function() {
        vitals.assign.property({}, 'a', [ 'not-string' ], 'string');
      });

    });
    /// #}}} @test E5

    /// #{{{ @test E6
    test('E6', [
      {}, 'a', 5, 'number', [ 'not-function' ]
    ], function assignPropertyTestE6() {

      throws.type(function() {
        vitals.assign.property({}, 'a', 5, 'number', [ 'not-function' ]);
      });

    });
    /// #}}} @test E6

    /// #{{{ @test E7
    test('E7', [ {}, '', 5 ], function assignPropertyTestE7() {

      throws(function() {
        vitals.assign.property({}, '', 5);
      });

    });
    /// #}}} @test E7

    /// #{{{ @test E8
    test('E8', [
      {}, 'a', 5, { 'fail': true }
    ], function assignPropertyTestE8() {

      throws.range(function() {
        vitals.assign.property({}, 'a', 5, {
          'fail': true
        });
      });

    });
    /// #}}} @test E8

    /// #{{{ @test E9
    test('E9', [
      {}, 'a', 5, '<descriptor>', 'number'
    ], function assignPropertyTestE9() {

      throws(function() {
        vitals.assign.property({}, 'a', 5, {
          'writable': false
        }, 'number');
      });

    });
    /// #}}} @test E9

  });
  /// #}}} @tests E

});
/// #}}} @suite assign.property

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
