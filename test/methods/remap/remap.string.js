/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.remap.string
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

method('remap.string', 'remap.str', function() {

  should('replace all patterns in source', function() {

    test('abc123', 3, 5, function() {
      var str = vitals.remap.str('abc123', 3, 5);
      assert( str === 'abc125' );
    });

    test('abc123abc123', 3, 5, function() {
      var str = vitals.remap.str('abc123abc123', 3, 5);
      assert( str === 'abc125abc125' );
    });

    test('abc123', 'a', 'z', function() {
      var str = vitals.remap.str('abc123', 'a', 'z');
      assert( str === 'zbc123' );
    });

    test('abc123', 'a', '$&', function() {
      var str = vitals.remap.str('abc123', '*', '$&');
      assert( str === 'abc123' );
    });

    test('abc123', /[a-z]/, 'z', function() {
      var str = vitals.remap.str('abc123', /[a-z]/, 'z');
      assert( str === 'zbc123' );
    });

    test('abc123', /[a-z]/g, 'z', function() {
      var str = vitals.remap.str('abc123', /[a-z]/g, 'z');
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

  should('correctly bind the replacer', function() {

    test('abc123', /a|1/g, '<replacer>', '<this>', function() {
      var self = {};
      vitals.remap.str('abc123', /a|1/g, function(match) {
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
        vitals.remap.str();
      }, validErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.remap.str('str');
      }, validErr);
    });

    test('str', 'z', function() {
      assert.throws(function() {
        vitals.remap.str('str', 'z');
      }, validErr);
    });

    test(null, 'a', 'z', function() {
      assert.throws(function() {
        vitals.remap.str(null, 'a', 'z');
      }, validTypeErr);
    });
  });
});
