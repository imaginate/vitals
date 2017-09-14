/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND.PROPERTY UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.amend.property
 * @alias vitals.amend.prop
 * @submethod property
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

/// #{{{ @suite amend.property
method('amend.property', 'amend.prop', function amendPropertyTests() {

  /// #{{{ @tests A
  should('A', "update the property's descriptor", function amendPropertyTestsA() {

    /// #{{{ @test A1
    test('A1', [
      '<object>', 'a', '<descriptor>'
    ], function amendPropertyTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      desc = freeze({
        'configurable': false
      });

      result = vitals.amend.property(obj, 'a', desc);

      assert(result === obj);

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);

      desc = getDescriptor(result, 'a');
      assert(desc.enumerable === true);
      assert(desc.configurable === false);

      desc = getDescriptor(result, 'b');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);

      desc = getDescriptor(result, 'c');
      assert(desc.enumerable === true);
      assert(desc.configurable === true);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [
      '<object>', 'b', '<descriptor>'
    ], function amendPropertyTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var desc;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };
      desc = freeze({
        'configurable': true
      });

      result = vitals.amend.property(obj, 'b', desc);

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
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [
      '<object>', 'a'
    ], function amendPropertyTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };

      result = vitals.amend.property(obj, 'a');

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
    /// #}}} @test A3

    /// #{{{ @test A4
    test('A4', [
      '<object>', 'a', null
    ], function amendPropertyTestA4() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };

      result = vitals.amend.property(obj, 'a', null);

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

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'throw a vitals error', function amendPropertyTestsB() {

    /// #{{{ @test B1
    test('B1', [], function amendPropertyTestB1() {

      throws(function() {
        vitals.amend.property();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ { 'a': 1 } ], function amendPropertyTestB2() {

      throws(function() {
        vitals.amend.property({ 'a': 1 });
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [
      'fail', 'a', '<descriptor>'
    ], function amendPropertyTestB3() {

      throws.type(function() {
        vitals.amend.property('fail', 'a', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [
      { '5': 1 }, 5, '<descriptor>'
    ], function amendPropertyTestB4() {

      throws.type(function() {
        vitals.amend.property({ '5': 1 }, 5, {
          'configurable': false
        });
      });

    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [
      { 'a': 1 }, 'a', { 'fail': true }
    ], function amendPropertyTestB5() {

      throws.range(function() {
        vitals.amend.property({ 'a': 1 }, 'a', { 'fail': true });
      });

    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [
      { 'a': 1 }, 'a', '<bad-descriptor>'
    ], function amendPropertyTestB6() {

      throws(function() {
        vitals.amend.property({ 'a': 1 }, 'a', {
          'set': function setter(){},
          'writable': true
        });
      });

    });
    /// #}}} @test B6

    /// #{{{ @test B7
    test('B7', [
      { 'a': 1 }, 'x', '<descriptor>'
    ], function amendPropertyTestB7() {

      throws(function() {
        vitals.amend.property({ 'a': 1 }, 'x', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B7

    /// #{{{ @test B8
    test('B8', [
      { 'a': 1 }, '', '<descriptor>'
    ], function amendPropertyTestB8() {

      throws(function() {
        vitals.amend.property({ 'a': 1 }, '', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B8

  });
  /// #}}} @tests B

});
/// #}}} @suite amend.property

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
