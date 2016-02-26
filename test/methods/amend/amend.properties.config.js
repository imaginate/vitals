/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.properties.config
 * -----------------------------------------------------------------------------
 * @section strict
 * @see [vitals.amend docs](https://github.com/imaginate/vitals/wiki/vitals.amend)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('amend.properties.config', 'amend.props.config', function() {

  should('update each prop\'s config', function() {

    test('<object>', '<props>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc;
      var props = {
        a: { configurable: false },
        b: { enumerable:   false },
        c: { configurable: false }
      };
      vitals.amend.props.config(obj, props);
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

    test('<object>', [ 'a', 'b' ], '<descriptor>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = [ 'a', 'b' ];
      var desc = { configurable: false };
      vitals.amend.props.config(obj, keys, desc);
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

    test('<object>', 'a,b', '<descriptor>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var desc = { configurable: false };
      vitals.amend.props.config(obj, 'a,b', desc);
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

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.amend.props.config();
      }, validTypeErr);
    });

    test('fail', 'a,b,c', '<descriptor>', function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.props.config('fail', 'a,b,c', desc);
      }, validTypeErr);
    });

    test({ '5': 1 }, 5, '<descriptor>', function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.props.config({ '5': 1 }, 5, desc);
      }, validTypeErr);
    });

    test('<object>', 'a,b,c', function() {
      assert.throws(function() {
        vitals.amend.props.config({ a: 1, b: 2, c: 3 }, 'a,b,c');
      }, validTypeErr);
    });

    test('<object>', { a: 1 }, function() {
      assert.throws(function() {
        vitals.amend.props.config({ a: 1, b: 2, c: 3 }, { a: 1 });
      }, validTypeErr);
    });

    test('<object>', 'a,d', '<descriptor>', function() {
      assert.throws(function() {
        var desc = { configurable: false };
        vitals.amend.props.config({ a: 1, b: 2, c: 3 }, 'a,d', desc);
      }, validErr);
    });
  });
});
