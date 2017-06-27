/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.until.object
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.until docs](https://github.com/imaginate/vitals/wiki/vitals.until)
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

method('until.object', 'until.obj', function() {

  should('return valid boolean', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var pass = vitals.until.obj(true, obj, function(val) {
        return val === 2;
      });
      assert( pass === true );
    });

    test('b', '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var pass = vitals.until.obj('b', obj, function(val, key) {
        return key;
      });
      assert( pass === true );
    });

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var fail = vitals.until.obj(true, obj, function(val) {
        return val === 4;
      });
      assert( fail === false );
    });

    test('d', '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var fail = vitals.until.obj('d', obj, function(val, key) {
        return key;
      });
      assert( fail === false );
    });
  });

  should('iterate over all key => value pairs in object', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];
      vitals.until.obj(true, obj, function(val, key) {
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

  should('correctly clone the source', function() {

    test(true, '<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      vitals.until.obj(true, obj, function(val, key, src) {
        assert( obj !== src )
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test(true, '<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.until.obj(true, obj, function(val, key) {
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
        vitals.until.obj();
      }, validTypeErr);
    });

    test(true, function() {
      assert.throws(function() {
        vitals.until.obj(true);
      }, validTypeErr);
    });

    test(true, {}, function() {
      assert.throws(function() {
        vitals.until.obj(true, {});
      }, validTypeErr);
    });

    test(true, null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.until.obj(true, null, function(){});
      }, validTypeErr);
    });

    test(true, {}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.until.obj(true, {}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
