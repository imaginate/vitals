/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.property.config
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

describe('vitals.amend.property.config (section:strict)', function() {
  var title;

  title = titleStr('should update the prop\'s config');
  describe(title, function() {

    title = callStr('<object>', 'a', '<descriptor>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc = { configurable: false };
      vitals.amend.prop.config(obj, 'a', desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      desc = getDescriptor(obj, 'a');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
      desc = getDescriptor(obj, 'b');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
      desc = getDescriptor(obj, 'c');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
    });

    title = callStr('<object>', 'b', '<descriptor>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc = { configurable: true };
      vitals.amend.prop.config(obj, 'b', desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      desc = getDescriptor(obj, 'a');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
      desc = getDescriptor(obj, 'b');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
      desc = getDescriptor(obj, 'c');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.amend.prop.config();
      }, validTypeErr);
    });

    title = callStr('<object>');
    it(title, function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        vitals.amend.prop.config(obj);
      }, validTypeErr);
    });

    title = callStr('<object>', 'a');
    it(title, function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        vitals.amend.prop.config(obj, 'a');
      }, validTypeErr);
    });

    title = callStr('fail', 'a', '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.prop.config('fail', 'a', desc);
      }, validTypeErr);
    });

    title = callStr({ '5': 1 }, 5, '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.prop.config({ '5': 1 }, 5, desc);
      }, validTypeErr);
    });

    title = callStr('<object>', 'd', '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        var desc = { configurable: false };
        vitals.amend.prop.config(obj, 'd', desc);
      }, validErr);
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
  return testCall('amend.prop.config', arguments, 3);
}
