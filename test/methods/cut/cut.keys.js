/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.keys
 * -----------------------------------------------------------------------------
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.cut.keys (section:base)', function() {
  var title;

  title = titleStr('should delete props from obj where key === val');
  describe(title, function() {

    title = callStr('<object>', 'a');
    it(title, function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut.keys(obj1, 'a');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', 1);
    it(title, function() {
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

    title = callStr('<object>', /a/);
    it(title, function() {
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

    title = callStr('<object>', 1, 'b');
    it(title, function() {
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

    title = callStr('<object>', [  1, 'b' ]);
    it(title, function() {
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

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.keys();
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.keys({});
      }, validErr);
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.keys(null, 1);
      }, validTypeErr);
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
  return testCall('cut.keys', arguments, 3);
}
