/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - AMEND
 * -----------------------------------------------------------------------------
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
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

describe('amend (js,configure)', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr({}, { a: 1, b: 2, c: 3 });
  it(title, function() {
    var props = freeze({ a: 1, b: 2, c: 3 });
    var obj = vitals.amend({}, props);
    each(props, function(val, key) {
      assert(obj[key] === val);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
    });
  });

  title = callStr({}, [ 'a', 'b', 'c' ], 5);
  it(title, function() {
    var props = freeze([ 'a', 'b', 'c' ]);
    var obj = vitals.amend({}, props, 5);
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = 6;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, 'a,b,c', 5);
  it(title, function() {
    var props = [ 'a', 'b', 'c' ];
    var obj = vitals.amend({}, 'a,b,c', 5);
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = 6;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: false },
    b: { value: 2, enumerable: false }
  });
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    });
    var obj = vitals.amend({}, props);
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
    });
  });

  //////////////////////////////////////////////
  // DEFAULT DESCRIPTOR TESTS

  title = callStr({}, { a: 1, b: 2, c: 3 }, { enumerable: false });
  it(title, function() {
    var props = freeze({ a: 1, b: 2, c: 3 });
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, desc);
    each(props, function(val, key) {
      assert(obj[key] === val);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
    });
  });

  title = callStr({}, [ 'a', 'b', 'c' ], 5, { enumerable: false });
  it(title, function() {
    var props = freeze([ 'a', 'b', 'c' ]);
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, 5, desc);
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = 6;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, 'a,b,c', 5, { enumerable: false });
  it(title, function() {
    var props = [ 'a', 'b', 'c' ];
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, 'a,b,c', 5, desc);
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = 6;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: true },
    b: 2
  }, { enumerable: false });
  it(title, function() {
    var props = freeze({ a: { value: 1, enumerable: true }, b: 2 });
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, desc);
    each({ a: 1, b: 2 }, function(val, key) {
      assert(obj[key] === val);
      assert(key in obj);
      if (key === 'a') assert( has.enum(obj, key) );
      if (key === 'b') assert( !has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
    });
  });

  //////////////////////////////////////////////
  // STATIC TYPE TESTS

  title = callStr({}, { a: 1, b: 2, c: 3 }, 'number');
  it(title, function() {
    var props = freeze({ a: 1, b: 2, c: 3 });
    var obj = vitals.amend({}, props, 'number');
    each(props, function(val, key) {
      assert(obj[key] === val);
      assert(key in obj);
      obj[key] = ++val;
      assert(obj[key] === val);
      obj[key] = 'string';
      assert(obj[key] === val);
    });
  });

  title = callStr({}, [ 'a', 'b', 'c' ], 5, 'number');
  it(title, function() {
    var props = freeze([ 'a', 'b', 'c' ]);
    var obj = vitals.amend({}, props, 5, 'number');
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      obj[key] = 6;
      assert(obj[key] === 6);
      obj[key] = 'string';
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, 'a,b,c', 5, 'number');
  it(title, function() {
    var props = [ 'a', 'b', 'c' ];
    var obj = vitals.amend({}, 'a,b,c', 5, 'number');
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      obj[key] = 6;
      assert(obj[key] === 6);
      obj[key] = 'string';
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: false },
    b: { value: 2, enumerable: false }
  }, 'number');
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    });
    var obj = vitals.amend({}, props, 'number');
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
      obj[key] = 'string';
      assert(obj[key] === val);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: true },
    b: { value: 2 }
  }, { enumerable: false }, 'number');
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: true },
      b: { value: 2 }
    });
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, desc, 'number');
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      if (key === 'a') assert( has.enum(obj, key) );
      if (key === 'b') assert( !has.enum(obj, key) );
      obj[key] = ++val;
      assert(obj[key] === val);
      obj[key] = 'string';
      assert(obj[key] === val);
    });
  });

  //////////////////////////////////////////////
  // SETTER TESTS

  title = callStr({}, { a: 1, b: 2, c: 3 }, getSetter());
  it(title, function() {
    var props = freeze({ a: 1, b: 2, c: 3 });
    var obj = vitals.amend({}, props, getSetter());
    each(props, function(val, key) {
      assert(obj[key] === val);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === ++val);
    });
  });

  title = callStr({}, [ 'a', 'b', 'c' ], 5, getSetter());
  it(title, function() {
    var props = freeze([ 'a', 'b', 'c' ]);
    var obj = vitals.amend({}, props, 5, getSetter());
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, 'a,b,c', 5, getSetter());
  it(title, function() {
    var props = [ 'a', 'b', 'c' ];
    var obj = vitals.amend({}, 'a,b,c', 5, getSetter());
    each(props, function(key) {
      assert(obj[key] === 5);
      assert(key in obj);
      assert( has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === 6);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: false },
    b: { value: 2, enumerable: false }
  }, getSetter());
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false }
    });
    var obj = vitals.amend({}, props, getSetter());
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      assert( !has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === ++val);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: true },
    b: { value: 2, enumerable: false }
  }, { enumerable: false }, getSetter());
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: true },
      b: { value: 2, enumerable: false }
    });
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, desc, getSetter());
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      if (key === 'a') assert( has.enum(obj, key) );
      if (key === 'b') assert( !has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === ++val);
    });
  });

  title = callStr({}, {
    a: { value: 1, enumerable: true },
    b: { value: 2, enumerable: false }
  }, { enumerable: false }, 'number', getSetter());
  it(title, function() {
    var props = freeze({
      a: { value: 1, enumerable: true },
      b: { value: 2, enumerable: false }
    });
    var desc = freeze({ enumerable: false });
    var obj = vitals.amend({}, props, desc, 'number', getSetter());
    each(props, function(desc, key) {
      var val = desc.value;
      assert(obj[key] === val);
      assert(key in obj);
      if (key === 'a') assert( has.enum(obj, key) );
      if (key === 'b') assert( !has.enum(obj, key) );
      obj[key] = 1;
      assert(obj[key] === ++val);
      obj[key] = 'string';
      assert(obj[key] === val);
    });
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr('string', 'a,b,c', 5);
  it(title, function() {
    assert.throws(function() {
      vitals.amend('string', 'a,b,c', 5);
    });
  });

  title = callStr({}, 5, 5);
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 5, 5);
    });
  });

  title = callStr({}, 'a,b,c');
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a,b,c');
    });
  });

  title = callStr({}, 'a,b,c', 5, 'string');
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a,b,c', 5, 'string');
    });
  });

  title = callStr({}, 'a,b,c', 5, 'number', {});
  it(title, function() {
    assert.throws(function() {
      vitals.amend({}, 'a,b,c', 5, 'number', {});
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
function callStr() {
  return testCall('amend', arguments, 3, true);
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
