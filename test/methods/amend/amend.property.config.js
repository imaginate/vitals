/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND.PROPERTY.CONFIG UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.amend.property.config
 * @submethod property.config
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
