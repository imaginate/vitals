/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.remap.object
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.remap docs](https://github.com/imaginate/vitals/wiki/vitals.remap)
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

method('remap.object', 'remap.obj', function() {

  should('make new object by iterating over all key => value pairs in source', function() {

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.remap.obj(obj1, function(val) {
        return ++val;
      });
      assert( obj2 !== obj1 );
      assert( obj2.a === 2 );
      assert( obj2.b === 3 );
      assert( obj2.c === 4 );
    });

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.remap.obj(obj1, function(val, key) {
        return key;
      });
      assert( obj2 !== obj1 );
      assert( obj2.a === 'a' );
      assert( obj2.b === 'b' );
      assert( obj2.c === 'c' );
    });
  });

  should('correctly clone the source', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      vitals.remap.obj(obj, function(val, key, src) {
        assert( obj !== src )
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test('<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.remap.obj(obj, function(val, key) {
        this[key] = val;
      }, self);
      assert( self !== obj );
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.remap.obj();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.remap.obj({});
      }, validTypeErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.remap.obj(null, function(){});
      }, validTypeErr);
    });

    test({}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.remap.obj({}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
