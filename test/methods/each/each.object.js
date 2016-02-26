/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.each.object
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.each docs](https://github.com/imaginate/vitals/wiki/vitals.each)
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

method('each.object', 'each.obj', function() {

  should('iterate over all key => value pairs in object', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.each.obj(obj, function(val, key) {
        vals.push(val);
        keys.push(key);
      });
      assert( hasVal(vals, 1) );
      assert( hasVal(vals, 2) );
      assert( hasVal(vals, 3) );
      assert( vals.length === 3 );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'b') );
      assert( hasVal(keys, 'c') );
      assert( keys.length === 3 );
    });
  });

  should('return the valid result', function() {

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.each.obj(obj1, function(val, key){});
      assert( obj2 === obj1 );
      assert( obj2.a === 1 );
      assert( obj2.b === 2 );
      assert( obj2.c === 3 );
    });

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.each.obj(obj1, function(val, key, obj){});
      assert( obj2 !== obj1 );
      assert( obj2.a === 1 );
      assert( obj2.b === 2 );
      assert( obj2.c === 3 );
    });
  });

  should('bind the iteratee correctly', function() {

    test('<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.each.obj(obj, function(val, key) {
        this[key] = val;
      }, self);
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.each.obj();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.each.obj({});
      }, validTypeErr);
    });

    test(5, '<iteratee>', function() {
      assert.throws(function() {
        vitals.each.obj(5, function(){});
      }, validTypeErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.each.obj(null, function(){});
      }, validTypeErr);
    });

    test({}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.each.obj({}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
