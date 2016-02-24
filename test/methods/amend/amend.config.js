/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.config
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

describe('vitals.amend.config (section:strict)', function() {
  var title;

  title = titleStr('should update each prop\'s config');
  describe(title, function() {

    title = callStr('<object>', '<props>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc;
      var props = {
        a: { configurable: false },
        b: { enumerable:   false },
        c: { configurable: false }
      };
      vitals.amend.config(obj, props);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      desc = getDescriptor(obj, 'a');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
      desc = getDescriptor(obj, 'b');
      assert( desc.enumerable === false );
      assert( desc.configurable === true );
      desc = getDescriptor(obj, 'c');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
    });

    title = callStr('<object>', [ 'a', 'b' ], '<descriptor>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = [ 'a', 'b' ];
      var desc = { configurable: false };
      vitals.amend.config(obj, keys, desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      desc = getDescriptor(obj, 'a');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
      desc = getDescriptor(obj, 'b');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
      desc = getDescriptor(obj, 'c');
      assert( desc.enumerable === true );
      assert( desc.configurable === true );
    });

    title = callStr('<object>', 'a,b', '<descriptor>');
    it(title, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc = { configurable: false };
      vitals.amend.config(obj, 'a,b', desc);
      assert( obj.a === 1 );
      assert( obj.b === 2 );
      assert( obj.c === 3 );
      desc = getDescriptor(obj, 'a');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
      desc = getDescriptor(obj, 'b');
      assert( desc.enumerable === true );
      assert( desc.configurable === false );
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
        vitals.amend.config();
      }, validTypeErr);
    });

    title = callStr('fail', 'a,b,c', '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.config('fail', 'a,b,c', desc);
      }, validTypeErr);
    });

    title = callStr({ '5': 1 }, 5, '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.config({ '5': 1 }, 5, desc);
      }, validTypeErr);
    });

    title = callStr('<object>', 'a,b,c');
    it(title, function() {
      assert.throws(function() {
        vitals.amend.config({ a: 1, b: 2, c: 3 }, 'a,b,c');
      }, validTypeErr);
    });

    title = callStr('<object>', { a: 1 });
    it(title, function() {
      assert.throws(function() {
        vitals.amend.config({ a: 1, b: 2, c: 3 }, { a: 1 });
      }, validTypeErr);
    });

    title = callStr('<object>', 'a,d', '<descriptor>');
    it(title, function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.config({ a: 1, b: 2, c: 3 }, 'a,d', desc);
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
  return testCall('amend.config', arguments, 3);
}
