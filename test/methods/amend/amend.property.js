/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - AMEND.PROPERTY
 * -----------------------------------------------------------------------------
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/amend.js}
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

describe('js-configure method: amend.property', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr({}, 'a', 1);
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1);
    assert(result.a === 1);
    assert('a' in result);
    assert( has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
  });

  title = callStr({}, 'a', { value: 1, enumerable: false });
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', { value: 1, enumerable: false });
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
  });

  title = callStr({}, 'a', 1, { enumerable: false });
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, { enumerable: false });
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
  });

  //////////////////////////////////////////////
  // STATIC TYPE TESTS

  title = callStr({}, 'a', 1, 'number');
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, 'number');
    assert(result.a === 1);
    assert('a' in result);
    assert( has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
    result.a = 'string';
    assert(result.a === 2);
  });

  title = callStr({}, 'a', 1, { enumerable: false }, 'number');
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, { enumerable: false }, 'number');
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
    result.a = 'string';
    assert(result.a === 2);
  });

  title = callStr({}, 'a', { value: 1, enumerable: false }, 'number');
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', {
      enumerable: false,
      value: 1
    }, 'number');
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 2);
    result.a = 'string';
    assert(result.a === 2);
  });

  //////////////////////////////////////////////
  // SETTER TESTS

  title = callStr({}, 'a', 1, getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
  });

  title = callStr({}, 'a', 1, { enumerable: false }, getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, { enumerable: false }, getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
  });

  title = callStr({}, 'a', { value: 1, enumerable: false }, getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', {
      enumerable: false,
      value: 1
    }, getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
  });

  title = callStr({}, 'a', 1, 'number', getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, 'number', getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
    result.a = 'string';
    assert(result.a === 3);
  });

  title = callStr({}, 'a', 1, { enumerable: false }, 'number', getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', 1, {
      enumerable: false
    }, 'number', getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
    result.a = 'string';
    assert(result.a === 3);
  });

  title = callStr({}, 'a', {
    enumerable: false,
    value: 1
  }, 'number', getSetter());
  it(title, function() {
    var result;
    result = vitals.amend.prop({}, 'a', {
      enumerable: false,
      value: 1
    }, 'number', getSetter());
    assert(result.a === 1);
    assert('a' in result);
    assert( !has.enum(result, 'a') );
    result.a = 2;
    assert(result.a === 3);
    result.a = 'string';
    assert(result.a === 3);
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr('string', 'a', 5);
  it(title, function() {
    assert.throws(function() {
      vitals.amend('string', 'a', 5);
    });
  });

  title = callStr({}, 5, 5);
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 5, 5);
    });
  });

  title = callStr({}, 'a');
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a');
    });
  });

  title = callStr({}, 'a', 5, 'string');
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a', 5, 'string');
    });
  });

  title = callStr({}, 'a', 5, 'number', {});
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a', 5, 'number', {});
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
  return testCall('amend.prop', args, 3, true);
}

/**
 * @private
 * @return {function}
 */
function getSetter() {
  return function setter(newVal, oldVal) {
    oldVal = oldVal || 1;
    return newVal + oldVal;
  };
}
