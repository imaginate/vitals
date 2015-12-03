/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS METHOD - AMEND.PROPERTY
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

describe('vitals.amend.property (section:strict)', function() {
  var title;

  title = 'should amend prop to obj with correct config';
  title = titleStr('basic', title);
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

    title = callStr({}, 'a', '<descriptor>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc);
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', 1, '<descriptor>');
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

  title = 'should amend prop to obj with correct static type setter';
  title = titleStr('static type', title);
  describe(title, function() {

    title = callStr({}, 'a', 1, 'number');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', 1, '<descriptor>', 'number');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 2);
    });

    title = callStr({}, 'a', '<descriptor>', 'number');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number');
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 2);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 2);
    });

  });

  title = titleStr('setter', 'should amend prop to obj with correct setter');
  describe(title, function() {

    title = callStr({}, 'a', 1, '<setter>');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, '<descriptor>', '<setter>');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', '<descriptor>', '<setter>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, 'number', '<setter>');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', 1, '<descriptor>', 'number', '<setter>');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 3);
    });

    title = callStr({}, 'a', '<descriptor>', 'number', '<setter>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number', getSetter());
      assert(obj.a === 1);
      assert('a' in obj);
      assert( !has.enum(obj, 'a') );
      obj.a = 2;
      assert(obj.a === 3);
      assert.throws(function() { obj.a = 'string'; });
      assert(obj.a === 3);
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

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
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 2, true);
}

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
