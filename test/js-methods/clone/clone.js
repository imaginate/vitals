/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE
 * -----------------------------------------------------------------------------
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/clone.js}
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

describe('clone', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr('primitive');
  it(title, function() {
    var vals;
    vals = [ null, undefined, true, false, 'string', 5 ];
    each(vals, function(val) {
      assert(vitals.clone(val) === val);
    });
    assert( is.nan( vitals.clone(NaN) ) );
  });

  title = callStr('primitive', true);
  it(title, function() {
    var vals;
    vals = [ null, undefined, true, false, 'string', 5 ];
    each(vals, function(val) {
      assert(vitals.clone(val) === val);
    });
    assert( is.nan( vitals.clone(NaN) ) );
  });

  //////////////////////////////////////////////
  // OBJECT TESTS

  title = callStr('object');
  it(title, function() {
    var obj;
    var copy;
    obj = freeze({ a: 1, b: { b: 2 }, c: 3 }, true);
    copy = vitals.clone(obj);
    assert(obj !== copy);
    each(obj, function(val, key) {
      assert( obj[key] === copy[key] );
    });
  });

  title = callStr('object', true);
  it(title, function() {
    var obj;
    var copy;
    obj = freeze({ a: 1, b: { b: 2 }, c: 3 }, true);
    copy = vitals.clone(obj, true);
    assert(obj !== copy);
    assert(obj.a === copy.a);
    assert(obj.b !== copy.b);
    assert(obj.c === copy.c);
  });

  //////////////////////////////////////////////
  // REGEXP TESTS

  //////////////////////////////////////////////
  // ARRAY TESTS

  //////////////////////////////////////////////
  // FUNCTION TESTS

  title = callStr('function');
  it(title, function() {
    var func;
    var copy;
    func = function testFunc() { return 5; };
    func.a = 1
    func.b = { b: 2 };
    func = freeze(func, true);
    copy = vitals.clone(func);
    assert(func !== copy);
    assert(func.a === copy.a);
    assert(func.b === copy.b);
    assert( func() === copy() );
  });

  title = callStr('function', true);
  it(title, function() {
    var func;
    var copy;
    func = function testFunc() { return 5; };
    func.a = 1
    func.b = { b: 2 };
    func = freeze(func, true);
    copy = vitals.clone(func, true);
    assert(func !== copy);
    assert(func.a === copy.a);
    assert(func.b !== copy.b);
    assert( func() === copy() );
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} type
 * @param {boolean=} deep
 * @return {string}
 */
function callStr(type, deep) {
  type = '<' + type + '>';
  deep = deep ? ', true' : '';
  return 'clone(' + type + deep + ');';
}
