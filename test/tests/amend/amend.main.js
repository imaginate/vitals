/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.amend
 * @alias vitals.amend.main
 * @submethod main
 * @super amend
 * @section strict
 * @section all
 * @build browser
 * @build node
 *
 * @see [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
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

/// #{{{ @func getDescriptor
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {!Object}
 */
var getDescriptor = loadHelper('get-descriptor');
/// #}}} @func getDescriptor

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

/// #{{{ @suite amend.main
method('amend.main', function amendMainTests() {

  /// #{{{ @tests A
  should('A', "update each property's descriptor", function amendMainTestsA() {

    /// #{{{ @test A1
    test('A1', [ '<object>', '<props>' ], function amendMainTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      props = freeze({
        'a': {
          'configurable': false
        },
        'b': {
          'enumerable': false
        },
        'c': {
          'configurable': false
        }
      }, true);

      result = vitals.amend(obj, props);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === false);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'c');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [
      '<object>', [ 'a', 'b' ], '<descriptor>'
    ], function amendMainTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      keys = freeze([ 'a', 'b' ]);
      desc = freeze({
        'configurable': false
      });

      result = vitals.amend(obj, keys, desc);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);

      desc = getDescriptor(result, 'c');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [
      '<object>', 'a,b', '<descriptor>'
    ], function amendMainTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'a,b': 3
      };
      desc = freeze({
        'configurable': false
      });

      result = vitals.amend(obj, 'a,b', desc);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result['a,b'] === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'a,b');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);
    });
    /// #}}} @test A3

    /// #{{{ @test A4
    test('A4', [
      '<object>', [ 'a', 'b' ], null
    ], function amendMainTestA4() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var keys;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      keys = freeze([ 'a', 'b' ]);

      result = vitals.amend(obj, keys, null);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'c');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);
    });
    /// #}}} @test A4

    /// #{{{ @test A5
    test('A5', [
      '<object>', '<props>', '<descriptor>'
    ], function amendMainTestA5() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      /// @note undefined-props-property
      ///   Any @amend#main #props property that has a value of `undefined`
      ///   is skipped. Due to the *skip*, defining the #props `"x"` property
      ///   with the value of `undefined` in this example, %A5, will **not**
      ///   cause an `Error` to be thrown. While defining the #props `"x"`
      ///   property with the value of `null` in example %B7 will cause an
      ///   `Error` to be thrown.
      props = freeze({
        'x': undefined,
        'a': undefined,
        'b': null,
        'c': {
          'enumerable': false
        }
      }, true);
      desc = freeze({
        'configurable': false
      });

      result = vitals.amend(obj, props, desc);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);

      desc = getDescriptor(result, 'c');
      assert(desc.enumerable === false);
      assert(desc.configurable === true);
    });
    /// #}}} @test A5

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'throw a vitals error', function amendMainTestsB() {

    /// #{{{ @test B1
    test('B1', [], function amendMainTestB1() {

      throws(function() {
        vitals.amend();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [
      'fail', 'a', '<descriptor>'
    ], function amendMainTestB2() {

      throws.type(function() {
        vitals.amend('fail', 'a', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [
      { '5': 1 }, 5, '<descriptor>'
    ], function amendMainTestB3() {

      throws.type(function() {
        vitals.amend({ '5': 1 }, 5, {
          'configurable': false
        });
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [
      { 'a': 1 }, 'a', { 'fail': true }
    ], function amendMainTestB4() {

      throws.range(function() {
        vitals.amend({ 'a': 1 }, 'a', { 'fail': true });
      });

    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [
      { 'a': 1 }, { 'a': 'fail' }
    ], function amendMainTestB5() {

      throws.type(function() {
        vitals.amend({ 'a': 1 }, { 'a': 'fail' });
      });

    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [
      { 'a': 1 }, 'x', '<descriptor>'
    ], function amendMainTestB6() {

      throws(function() {
        vitals.amend({ 'a': 1 }, 'x', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B6

    /// #{{{ @test B7
    test('B7', [
      { 'a': 1 }, { 'x': null }, '<descriptor>'
    ], function amendMainTestB7() {

      throws(function() {
        vitals.amend({ 'a': 1 }, { 'x': null }, {
          'configurable': false
        });
      });

    });
    /// #}}} @test B7

    /// #{{{ @test B8
    test('B8', [
      { 'a': 1 }, { 'a': { 'fail': true } }
    ], function amendMainTestB8() {

      throws.range(function() {
        vitals.amend({ 'a': 1 }, { 'a': { 'fail': true } });
      });

    });
    /// #}}} @test B8

    /// #{{{ @test B9
    test('B9', [
      { 'a': 1 }, 'a', '<bad-descriptor>'
    ], function amendMainTestB9() {

      throws(function() {
        vitals.amend({ 'a': 1 }, 'a', {
          'set': function setter(){},
          'writable': true
        });
      });

    });
    /// #}}} @test B9

    /// #{{{ @test B10
    test('B10', [
      { 'a': 1 }, '', '<descriptor>'
    ], function amendMainTestB10() {

      throws(function() {
        vitals.amend({ 'a': 1 }, '', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B10

    /// #{{{ @test B11
    test('B11', [
      '<object>', [ 'a', '', 'c' ], '<descriptor>'
    ], function amendMainTestB11() {

      throws(function() {
        vitals.amend({ 'a': 1, 'b': 2, 'c': 3 }, [ 'a', '', 'c' ], {
          'configurable': false
        });
      });

    });
    /// #}}} @test B11

  });
  /// #}}} @tests B

});
/// #}}} @suite amend.main

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
