/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND.PROPERTIES.CONFIG UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.amend.properties.config
 * @submethod properties.config
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

/// #{{{ @suite amend.properties.config
method('amend.properties.config', 'amend.props.config', function amendPropertiesConfigTests() {

  /// #{{{ @tests A
  should('A', "update each property's descriptor", function amendPropertiesConfigTestsA() {

    /// #{{{ @test A1
    test('A1', [
      '<object>',
      '<props>'
    ], function amendPropertiesConfigTestA1() {

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

      result = vitals.amend.properties.config(obj, props);

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
      '<object>',
      [ 'a', 'b' ],
      '<descriptor>'
    ], function amendPropertiesConfigTestA2() {

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
      keys = freeze([
        'a',
        'b'
      ]);
      desc = freeze({
        'configurable': false
      });

      result = vitals.amend.properties.config(obj, keys, desc);

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
      '<object>',
      'a,b',
      '<descriptor>'
    ], function amendPropertiesConfigTestA3() {

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

      result = vitals.amend.properties.config(obj, 'a,b', desc);

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
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'throw a vitals error', function amendPropertiesConfigTestsB() {

    /// #{{{ @test B1
    test('B1', [], function amendPropertiesConfigTestB1() {

      throws(function() {
        vitals.amend.properties.config();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [
      'fail',
      'a,b,c',
      '<descriptor>'
    ], function amendPropertiesConfigTestB2() {

      throws.type(function() {
        vitals.amend.properties.config('fail', 'a,b,c', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [
      { '5': 1 },
      5,
      '<descriptor>'
    ], function amendPropertiesConfigTestB3() {

      throws.type(function() {
        vitals.amend.properties.config({ '5': 1 }, 5, {
          'configurable': false
        });
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    /**
     * @description
     *   Ensure proper error thrown for a missing descriptor.
     */
    test('B4', [
      '<object>',
      'a,b,c'
    ], function amendPropertiesConfigTestB4() {

      throws(function() {
        vitals.amend.properties.config({ 'a': 1, 'b': 2, 'c': 3 }, 'a,b,c');
      });

    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [
      '<object>',
      { 'a': 1 }
    ], function amendPropertiesConfigTestB5() {

      throws.type(function() {
        vitals.amend.properties.config({ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 1 });
      });

    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [
      '<object>',
      'a,d',
      '<descriptor>'
    ], function amendPropertiesConfigTestB6() {

      throws(function() {
        vitals.amend.properties.config({ 'a': 1, 'b': 2, 'c': 3 }, 'a,d', {
          'configurable': false
        });
      });

    });
    /// #}}} @test B6

  });
  /// #}}} @tests B

});
/// #}}} @suite amend.properties.config

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
