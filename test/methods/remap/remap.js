/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.remap
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.remap docs](https://github.com/imaginate/vitals/wiki/vitals.remap)
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

method('remap', function() {

  should('make new object by iterating over all key => value pairs in source', function() {

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.remap(obj1, function(val) {
        return ++val;
      });
      assert( obj2 !== obj1 );
      assert( obj2.a === 2 );
      assert( obj2.b === 3 );
      assert( obj2.c === 4 );
    });

    test('<object>', '<iteratee>', function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.remap(obj1, function(val, key) {
        return key;
      });
      assert( obj2 !== obj1 );
      assert( obj2.a === 'a' );
      assert( obj2.b === 'b' );
      assert( obj2.c === 'c' );
    });
  });

  should('make new array by iterating over all index => value pairs in source', function() {

    test('<array>', '<iteratee>', function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.remap(arr1, function(val) {
        return ++val;
      });
      assert( arr2 !== arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 4 );
      assert( arr2.length === 3 );
    });

    test('<array>', '<iteratee>', function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.remap(arr1, function(val, i) {
        return i;
      });
      assert( arr2 !== arr1 );
      assert( arr2[0] === 0 );
      assert( arr2[1] === 1 );
      assert( arr2[2] === 2 );
      assert( arr2.length === 3 );
    });
  });

  should('iterate over every index in order', function() {

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      var vals = [];
      var keys = [];
      vitals.remap(arr, function(val, i) {
        vals.push(val);
        keys.push(i);
      });
      assert( vals[0] === 1 );
      assert( vals[1] === 2 );
      assert( vals[2] === 3 );
      assert( vals.length === 3 );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('replace all patterns in source', function() {

    test('abc123', 3, 5, function() {
      var str = vitals.remap('abc123', 3, 5);
      assert( str === 'abc125' );
    });

    test('abc123abc123', 3, 5, function() {
      var str = vitals.remap('abc123abc123', 3, 5);
      assert( str === 'abc125abc125' );
    });

    test('abc123', 'a', 'z', function() {
      var str = vitals.remap.str('abc123', 'a', 'z');
      assert( str === 'zbc123' );
    });

    test('abc123', 'a', '$&', function() {
      var str = vitals.remap.str('abc123', 'a', '$&');
      assert( str === 'abc123' );
    });

    test('abc123', '*', '$&', function() {
      var str = vitals.remap.str('abc123', '*', '$&');
      assert( str === 'abc123' );
    });

    test('abc123', /[a-z]/, 'z', function() {
      var str = vitals.remap('abc123', /[a-z]/, 'z');
      assert( str === 'zbc123' );
    });

    test('abc123', /[a-z]/g, 'z', function() {
      var str = vitals.remap('abc123', /[a-z]/g, 'z');
      assert( str === 'zzz123' );
    });

    test('abc123', '*', 'z', function() {
      var str = vitals.remap.str('abc123', '*', 'z');
      assert( str === 'abc123' );
    });

    test('abc123', '.*', 'z', function() {
      var str = vitals.remap.str('abc123', '.*', 'z');
      assert( str === 'abc123' );
    });
  });

  should('correctly clone the source', function() {

    test('<object>', '<iteratee>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      vitals.remap(obj, function(val, key, src) {
        assert( obj !== src )
      });
    });

    test('<array>', '<iteratee>', function() {
      var arr = [ 1, 2, 3 ];
      vitals.remap(arr, function(val, i, src) {
        assert( arr !== src );
      });
    });
  });

  should('correctly bind the iteratee', function() {

    test('<object>', '<iteratee>', '<this>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var self = {};
      vitals.remap(obj, function(val, key) {
        this[key] = val;
      }, self);
      assert( self !== obj );
      assert( self.a === 1 );
      assert( self.b === 2 );
      assert( self.c === 3 );
    });

    test('<array>', '<iteratee>', '<this>', function() {
      var arr = [ 1, 2, 3 ];
      var self = [];
      vitals.remap(arr, function(val, i) {
        this[i] = val;
      }, self);
      assert( self !== arr );
      assert( self[0] === 1 );
      assert( self[1] === 2 );
      assert( self[2] === 3 );
      assert( self.length === 3 );
    });
  });

  should('correctly bind the replacer', function() {

    test('abc123', /a|1/g, '<replacer>', '<this>', function() {
      var self = {};
      vitals.remap('abc123', /a|1/g, function(match) {
        this[match] = true;
        return match;
      }, self);
      assert( self['a'] === true );
      assert( self['1'] === true );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.remap();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.remap({});
      }, validTypeErr);
    });

    test(null, '<iteratee>', function() {
      assert.throws(function() {
        vitals.remap(null, function(){});
      }, validTypeErr);
    });

    test({}, '<iteratee>', 'fail', function() {
      assert.throws(function() {
        vitals.remap({}, function(){}, 'fail');
      }, validTypeErr);
    });
  });
});
