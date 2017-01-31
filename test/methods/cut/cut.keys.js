/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.keys
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('cut.keys', function() {

  should('delete props from obj where key === val', function() {

    test('<object>', 'a', function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut.keys(obj1, 'a');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 1, function() {
      var obj1 = {
        'a': 1, 'b': 2,
        '1': 3, '2': 4
      };
      var obj2 = vitals.cut.keys(obj1, 1);
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, '1') );
      assert(  hasOwn(obj2, '2') );
      assert( obj1 === obj2 );
    });

    test('<object>', /a/, function() {
      var obj1 = {
        'a':  1, 'b':  2,
        'a1': 3, 'b2': 4
      };
      var obj2 = vitals.cut.keys(obj1, /a/);
      assert( hasOwn(obj2, 'a')  );
      assert( hasOwn(obj2, 'b')  );
      assert( hasOwn(obj2, 'a1') );
      assert( hasOwn(obj2, 'b2') );
      assert( obj1 === obj2 );
    });

    test('<object>', 1, 'b', function() {
      var obj1 = {
        'a':  1, 'b':  2,
        '1':  3, '2':  4,
        'a1': 5, 'b2': 6
      };
      var obj2 = vitals.cut.keys(obj1, 1, 'b');
      assert(  hasOwn(obj2, 'a')  );
      assert( !hasOwn(obj2, 'b')  );
      assert( !hasOwn(obj2, '1')  );
      assert(  hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert( obj1 === obj2 );
    });

    test('<object>', [  1, 'b' ], function() {
      var obj1 = {
        'a':  1, 'b':  2,
        '1':  3, '2':  4,
        'a1': 5, 'b2': 6
      };
      var obj2 = vitals.cut.keys(obj1, [  1, 'b' ]);
      assert(  hasOwn(obj2, 'a')  );
      assert( !hasOwn(obj2, 'b')  );
      assert( !hasOwn(obj2, '1')  );
      assert(  hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert( obj1 === obj2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.keys();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.cut.keys({});
      }, validErr);
    });

    test(null, 1, function() {
      assert.throws(function() {
        vitals.cut.keys(null, 1);
      }, validTypeErr);
    });
  });
});
