/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/methods/clone.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('clone.object (sections:js,base)', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr( newObj() );
  it(title, function() {
    var obj = newObj();
    var copy = vitals.clone.obj(obj);
    assert(obj !== copy);
    each(obj, function(val, key) {
      assert( obj[key] === copy[key] );
    });
  });

  title = callStr(newObj(), true);
  it(title, function() {
    var obj = newObj();
    var copy = vitals.clone.obj(obj, true);
    assert(obj !== copy);
    assert(obj.a === copy.a);
    assert(obj.b !== copy.b);
    assert(obj.c === copy.c);
  });

  title = callStr(newObj(), false);
  it(title, function() {
    var obj = newObj();
    var copy = vitals.clone.obj(obj, false);
    assert(obj !== copy);
    each(obj, function(val, key) {
      assert( obj[key] === copy[key] );
    });
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr(null);
  it(title, function() {
    assert.throws(function() {
      vitals.clone.obj(null);
    });
  });

  title = callStr({}, 'fail');
  it(title, function() {
    assert.throws(function() {
      vitals.clone.obj({}, 'fail');
    });
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr(args) {
  args = slice(arguments);
  return testCall('clone.obj', args, 3, true);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return freeze({ a: 1, b: { b: 2 }, c: 3 }, true);
}
