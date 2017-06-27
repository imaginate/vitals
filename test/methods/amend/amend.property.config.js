/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.property.config
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.amend docs](https://github.com/imaginate/vitals/wiki/vitals.amend)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('amend.property.config', 'amend.prop.config', function() {

  should('update the prop\'s config', function() {

    test('<object>', 'a', '<descriptor>', function() {
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

    test('<object>', 'b', '<descriptor>', function() {
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

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.amend.prop.config();
      }, validTypeErr);
    });

    test('<object>', function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        vitals.amend.prop.config(obj);
      }, validTypeErr);
    });

    test('<object>', 'a', function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        vitals.amend.prop.config(obj, 'a');
      }, validTypeErr);
    });

    test('fail', 'a', '<descriptor>', function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.prop.config('fail', 'a', desc);
      }, validTypeErr);
    });

    test({ '5': 1 }, 5, '<descriptor>', function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.prop.config({ '5': 1 }, 5, desc);
      }, validTypeErr);
    });

    test('<object>', 'd', '<descriptor>', function() {
      assert.throws(function() {
        var obj = { a: 1, b: 2, c: 3 };
        var desc = { configurable: false };
        vitals.amend.prop.config(obj, 'd', desc);
      }, validErr);
    });
  });
});
