/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - AMEND.PROPERTY
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

describe('amend.property (sections:js,configure)', function() {
  var title;

  title = 'basic tests should amend prop to obj with the correct config';
  describe(title, function() {

    title = callStr({}, 'a', 1);
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1);
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', { value: 1, enumerable: false });
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc);
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', 1, { enumerable: false });
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc);
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
    });

  });

  title = 'static type tests should amend prop to obj ';
  title += 'with the correct static type setter';
  describe(title, function() {

    title = callStr({}, 'a', 1, 'number');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      obj.a = 'string';
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', 1, { enumerable: false }, 'number');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      obj.a = 'string';
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', { value: 1, enumerable: false }, 'number');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      obj.a = 'string';
      assert(obj.a === 2);
    });

  });

  title = 'setter tests should amend prop to obj with the correct setter';
  describe(title, function() {

    title = callStr({}, 'a', 1, getSetter());
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, { enumerable: false }, getSetter());
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', { value: 1, enumerable: false }, getSetter());
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, 'number', getSetter());
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      obj.a = 'string';
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, { enumerable: false }, 'number', getSetter());
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      obj.a = 'string';
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', {
      enumerable: false,
      value: 1
    }, 'number', getSetter());
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      obj.a = 'string';
      assert(obj.a === 3);
    });

  });

  describe('error tests should throw an error', function() {

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
  return testCall('amend.prop', arguments, 4, true);
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
