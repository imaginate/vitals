/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - IS
 * -----------------------------------------------------------------------------
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/blob/master/src/methods/is.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {!Object<string, !Object>} */
var TESTS = {
  'primitives': {
    'null': {
      shortcut: 'nil',
      truthy: [ null ],
      falsy:  [ {}, false, undefined ],
      plural: {
        truthy: [ [ null, null ] ],
        falsy:  [ [ null, undefined ] ]
      }
    },
    'undefined': {
      truthy: [ undefined ],
      falsy:  [ {}, null, false ],
      plural: {
        truthy: [ [ undefined, undefined ] ],
        falsy:  [ [ null, undefined ] ]
      }
    },
    'boolean': {
      shortcut: 'bool',
      truthy: [ true, false ],
      falsy:  [ new Boolean(true), {}, null ],
      plural: {
        truthy: [ [ true, false ] ],
        falsy:  [ [ null, true ] ]
      }
    },
    'string': {
      shortcut: 'str',
      truthy: [ 'str' ],
      falsy:  [ new String('str'), {}, null ],
      plural: {
        truthy: [ [ 'a', 'b' ] ],
        falsy:  [ [ null, 'b' ] ]
      }
    },
    'number': {
      shortcut: 'num',
      truthy: [ 0, 5, -5, 1.5 ],
      falsy:  [ new Number(5), NaN, null ],
      plural: {
        truthy: [ [ 0, 5, -5, 1.5 ] ],
        falsy:  [ [ 0, null, 1, 1.5 ] ]
      }
    },
    'nan': {
      truthy: [ NaN ],
      falsy:  [ 5, null, undefined ],
      plural: {
        truthy: [ [ NaN, NaN, NaN ] ],
        falsy:  [ [ null, NaN, NaN ] ]
      }
    }
  },
  'js objects': {
    'object': {
      shortcut: 'obj',
      truthy: [ {}, [], /re/, null ],
      falsy:  [ function(){}, undefined ],
      plural: {
        truthy: [ [ {}, [], /re/, null ] ],
        falsy:  [ [ {}, function(){}, undefined ] ]
      }
    },
    'function': {
      shortcut: 'fn|func',
      truthy: [ function(){} ],
      falsy:  [ null, {}, undefined ],
      plural: {
        truthy: [ [ function(){}, function(){} ] ],
        falsy:  [ [ function(){}, function(){}, null ] ]
      }
    },
    'array': {
      shortcut: 'arr',
      truthy: [ null, [] ],
      falsy:  [ {}, function(){} ],
      plural: {
        truthy: [ [ null, [], [] ] ],
        falsy:  [ [ [], {}, [] ] ]
      }
    },
    'regexp': {
      shortcut: 're|regex',
      truthy: [ null, /re/ ],
      falsy:  [ {}, [], undefined ],
      plural: {
        truthy: [ [ null, /re/ ] ],
        falsy:  [ [ /re/, {} ] ]
      }
    },
    'date': {
      truthy: [ null, new Date() ],
      falsy:  [ {}, [], undefined ],
      plural: {
        truthy: [ [ null, new Date() ] ],
        falsy:  [ [ new Date(), {} ] ]
      }
    },
    'error': {
      shortcut: 'err',
      truthy: [ null, new Error(), new TypeError ],
      falsy:  [ {}, [], /re/ ],
      plural: {
        truthy: [ [ null, new Error(), new TypeError ] ],
        falsy:  [ [ /re/, new Error(), new TypeError ] ]
      }
    },
    'args': {
      shortcut: 'arguments',
      truthy: [ null, (function(){ return arguments; })() ],
      falsy:  [ {}, [], function(){} ],
      plural: {
        truthy: [ [ null, (function(){ return arguments; })() ] ],
        falsy:  [ [ null, [] ] ]
      }
    }
  },
  'dom objects': {
    'document': {
      shortcut: 'doc',
      truthy: [ null, { nodeType: 9 } ],
      falsy:  [ {}, [], { nodeType: 3 }, undefined ],
      plural: {
        truthy: [ [ null, { nodeType: 9 } ] ],
        falsy:  [ [ null, { nodeType: 7 } ] ]
      }
    },
    'element': {
      shortcut: 'elem',
      truthy: [ null, { nodeType: 1 } ],
      falsy:  [ {}, [], { nodeType: 3 }, undefined ],
      plural: {
        truthy: [ [ null, { nodeType: 1 } ] ],
        falsy:  [ [ null, { nodeType: 7 } ] ]
      }
    }
  },
  'arrays': {
    'nulls': {
      shortcut: 'nils',
      truthy: [ null, [], [ null, null ] ],
      falsy:  [ 5, {}, [ null, {} ], [ null, undefined ] ],
      plural: {
        truthy: [ [ null, [], [ null, null ] ] ],
        falsy:  [ [ [ null, null ], [ null, undefined ] ] ]
      }
    },
    'booleans': {
      shortcut: 'bools',
      truthy: [ null, [], [ true, false ] ],
      falsy:  [ 5, {}, [ null, true ] ],
      plural: {
        truthy: [ [ null, [], [ true, false ] ] ],
        falsy:  [ [ [ null, true ], [ true, false ] ] ]
      }
    },
    'strings': {
      shortcut: 'strs',
      truthy: [ null, [], [ 'a', 'b' ] ],
      falsy:  [ 5, {}, [ null, 'a', 'b' ] ],
      plural: {
        truthy: [ [ null, [], [ 'a', 'b' ] ] ],
        falsy:  [ [ [ null, 'a' ], [ 'a', 'b' ] ] ]
      }
    },
    'numbers': {
      shortcut: 'nums',
      truthy: [ null, [], [ -1, 0, 1, 1.5 ] ],
      falsy:  [ 5, {}, [ -1, NaN, 1, 1.5 ] ],
      plural: {
        truthy: [ [ null, [], [ -1, 0, 1, 1.5 ] ] ],
        falsy:  [ [ [ -1, NaN, 1, 1.5 ], [ -1, 0, 1, 1.5 ] ] ]
      }
    },
    'nans': {
      truthy: [ null, [], [ NaN, NaN ] ],
      falsy:  [ 5, {}, [ null, NaN ] ],
      plural: {
        truthy: [ [ null, [], [ NaN, NaN ] ] ],
        falsy:  [ [ [ null, NaN ], [ NaN, NaN ] ] ]
      }
    },
    'objects': {
      shortcut: 'objs',
      truthy: [ null, [], [ {}, {} ] ],
      falsy:  [ 5, {}, [ null, {} ], [ null, undefined ] ],
      plural: {
        truthy: [ [ null, [], [ {}, {} ] ] ],
        falsy:  [ [ [ null, {} ], [ {}, {} ] ] ]
      }
    },
    'functions': {
      shortcut: 'fns|funcs',
      truthy: [ null, [], [ function(){}, function(){} ] ],
      falsy:  [ 5, {}, [ null, function(){} ] ],
      plural: {
        truthy: [ [ null, [], [ function(){}, function(){} ] ] ],
        falsy:  [ [ [ null, function(){} ], [ function(){}, function(){} ] ] ]
      }
    },
    'arrays': {
      shortcut: 'arrs',
      truthy: [ null, [], [ [], [] ] ],
      falsy:  [ 5, {}, [ null, [] ] ],
      plural: {
        truthy: [ [ null, [], [ [], [] ] ] ],
        falsy:  [ [ [ null, [] ], [ [], [] ] ] ]
      }
    },
    'regexps': {
      shortcut: 'regexs',
      truthy: [ null, [], [ /re/, /re/ ] ],
      falsy:  [ 5, {}, [ null, /re/ ] ],
      plural: {
        truthy: [ [ null, [], [ /re/, /re/ ] ] ],
        falsy:  [ [ [ null, /re/ ], [ /re/, /re/ ] ] ]
      }
    },
    'dates': {
      truthy: [ null, [], [ new Date(), new Date() ] ],
      falsy:  [ 5, {}, [ null, new Date() ] ],
      plural: {
        truthy: [ [ null, [], [ new Date(), new Date() ] ] ],
        falsy:  [ [ [ null, new Date() ], [ new Date(), new Date() ] ] ]
      }
    },
    'errors': {
      shortcut: 'errs',
      truthy: [ null, [], [ new Error(), new TypeError() ] ],
      falsy:  [ 5, {}, [ null, new Error() ], [ null, undefined ] ],
      plural: {
        truthy: [ [ null, [], [ new Error(), new TypeError() ] ] ],
        falsy:  [ [ [ null, new Error() ], [ new Error(), new TypeError() ] ] ]
      }
    },
    'documents': {
      shortcut: 'docs',
      truthy: [ null, [], [ { nodeType: 9 }, { nodeType: 9 } ] ],
      falsy:  [ 5, {}, [ null, { nodeType: 9 } ], [ null, undefined ] ],
      plural: {
        truthy: [ [ null, [], [ { nodeType: 9 }, { nodeType: 9 } ] ] ],
        falsy:  [ [ [ null, { nodeType: 9 } ], [ { nodeType: 9 } ] ] ]
      }
    },
    'elements': {
      shortcut: 'elems',
      truthy: [ null, [], [ { nodeType: 1 }, { nodeType: 1 } ] ],
      falsy:  [ 5, {}, [ null, { nodeType: 1 } ], [ null, undefined ] ],
      plural: {
        truthy: [ [ null, [], [ { nodeType: 1 }, { nodeType: 1 } ] ] ],
        falsy:  [ [ [ null, { nodeType: 1 } ], [ { nodeType: 1 } ] ] ]
      }
    }
  },
  'maps': {
    'nullMap': {
      shortcut: 'nilMap',
      truthy: [ null, {}, { a: null, b: null } ],
      falsy:  [ 5, { a: null , b: false } ],
      plural: {
        truthy: [ [ null, {}, { a: null, b: null } ] ],
        falsy:  [ [ { a: 0, b: null }, { c: null } ] ]
      }
    },
    'booleanMap': {
      shortcut: 'boolMap',
      truthy: [ null, {}, { a: true, b: false } ],
      falsy:  [ 5, { a: null, b: false } ],
      plural: {
        truthy: [ [ null, {}, { a: true, b: false } ] ],
        falsy:  [ [ { a: null, b: true }, { c: false } ] ]
      }
    },
    'stringMap': {
      shortcut: 'strMap',
      truthy: [ null, {}, { a: 'a', b: 'b' } ],
      falsy:  [ 5, { a: 1, b: 'b' } ],
      plural: {
        truthy: [ [ null, {}, { a: 'a', b: 'b' } ] ],
        falsy:  [ [ { a: 1, b: 'b' }, { c: 'c' } ] ]
      }
    },
    'numberMap': {
      shortcut: 'numMap',
      truthy: [ null, {}, { a: 0, b: 1 } ],
      falsy:  [ 5, { a: 0, b: '1' } ],
      plural: {
        truthy: [ [ null, {}, { a: 0, b: 1 } ] ],
        falsy:  [ [ { a: 0, b: 1 }, { c: '2' } ] ]
      }
    },
    'nanMap': {
      truthy: [ null, {}, { a: NaN, b: NaN } ],
      falsy:  [ 5, { a: null, b: NaN } ],
      plural: {
        truthy: [ [ null, {}, { a: NaN, b: NaN } ] ],
        falsy:  [ [ { a: 0, b: NaN }, { c: NaN } ] ]
      }
    },
    'objectMap': {
      shortcut: 'objMap',
      truthy: [ null, {}, { a: {}, b: {} } ],
      falsy:  [ 5, { a: 10, b: {} } ],
      plural: {
        truthy: [ [ null, {}, { a: {}, b: {} } ] ],
        falsy:  [ [ { a: {}, b: function(){} }, { c: {} } ] ]
      }
    },
    'functionMap': {
      shortcut: 'fnMap|funcMap',
      truthy: [ null, {}, { a: function(){}, b: function(){} } ],
      falsy:  [ 5, { a: {}, b: function(){} } ],
      plural: {
        truthy: [ [ null, {}, { a: function(){}, b: function(){} } ] ],
        falsy:  [ [ { a: null, b: function(){} }, { c: function(){} } ] ]
      }
    },
    'arrayMap': {
      shortcut: 'arrMap',
      truthy: [ null, {}, { a: [], b: [] } ],
      falsy:  [ 5, { a: {}, b: [] } ],
      plural: {
        truthy: [ [ null, {}, { a: [], b: [] } ] ],
        falsy:  [ [ { a: null, b: [] }, { c: [] } ] ]
      }
    },
    'regexpMap': {
      shortcut: 'regexMap',
      truthy: [ null, {}, { a: /re/, b: /re/ } ],
      falsy:  [ 5, { a: {}, b: /re/ } ],
      plural: {
        truthy: [ [ null, {}, { a: /re/, b: /re/ } ] ],
        falsy:  [ [ { a: null, b: /re/ }, { c: /re/ } ] ]
      }
    },
    'dateMap': {
      truthy: [ null, {}, { a: new Date(), b: new Date() } ],
      falsy:  [ 5, { a: null, b: new Date() } ],
      plural: {
        truthy: [ [ null, {}, { a: new Date(), b: new Date() } ] ],
        falsy:  [ [ { a: {}, b: new Date() }, { c: new Date() } ] ]
      }
    },
    'errorMap': {
      shortcut: 'errMap',
      truthy: [ null, {}, { a: new Error(), b: new TypeError() } ],
      falsy:  [ 5, { a: {}, b: new Error() } ],
      plural: {
        truthy: [ [ null, {}, { a: new Error(), b: new TypeError() } ] ],
        falsy:  [ [ { a: null, b: new Error() }, { c: new TypeError() } ] ]
      }
    },
    'documentMap': {
      shortcut: 'docMap',
      truthy: [ null, {}, { a: { nodeType: 9 }, b: { nodeType: 9 } } ],
      falsy:  [ 5, { a: { nodeType: 1 }, b: { nodeType: 9 } } ],
      plural: {
        truthy: [ [ null, {}, { a: { nodeType: 9 }, b: { nodeType: 9 } } ] ],
        falsy:  [ [ { a: null, b: { nodeType: 9 } }, { c: { nodeType: 9 } } ] ]
      }
    },
    'elementMap': {
      shortcut: 'elemMap',
      truthy: [ null, {}, { a: { nodeType: 1 }, b: { nodeType: 1 } } ],
      falsy:  [ 5, { a: { nodeType: 9 }, b: { nodeType: 1 } } ],
      plural: {
        truthy: [ [ null, {}, { a: { nodeType: 1 }, b: { nodeType: 1 } } ] ],
        falsy:  [ [ { a: null, b: { nodeType: 1 } }, { c: { nodeType: 1 } } ] ]
      }
    }
  },
  'others': {
    'empty': {
      truthy: [ null, undefined, false, '', 0, {}, [], function(){}, NaN ],
      falsy:  [ true, 'a', 1, { a: null }, [ 'a' ], function(a){} ],
      plural: {
        truthy: [ [ null, undefined, false, '', 0, {}, [], function(){}, NaN ] ],
        falsy:  [ [ null, undefined, false, '', 1, {}, [], function(){}, NaN ] ]
      }
    }
  }
};

describe('vitals.is (section:base)', function() {

  each(TESTS, function(section, title) {
    describe(title, function() {
      each(section, function(test, type) {
        each(test.truthy, function(val) {
          title = callStr(type, val);
          it(title, function() {
            var result = vitals.is(type, val);
            assert( result === true );
          });
        });
        each(test.falsy, function(val) {
          title = callStr(type, val);
          it(title, function() {
            var result = vitals.is(type, val);
            assert( result === false );
          });
        });
        each(test.plural.truthy, function(vals) {
          vals = fuse.val.top(vals, type);
          title = callStr.apply(null, vals);
          it(title, function() {
            var result = vitals.is.apply(null, vals);
            assert( result === true );
          });
        });
        each(test.plural.falsy, function(vals) {
          vals = fuse.val.top(vals, type);
          title = callStr.apply(null, vals);
          it(title, function() {
            var result = vitals.is.apply(null, vals);
            assert( result === false );
          });
        });
        var types = test.shortcut && test.shortcut.split('|');
        each(types || [], function(type) {
          each(test.truthy, function(val) {
            title = callStr(type, val);
            it(title, function() {
              var result = vitals.is(type, val);
              assert( result === true );
            });
          });
          each(test.falsy, function(val) {
            title = callStr(type, val);
            it(title, function() {
              var result = vitals.is(type, val);
              assert( result === false );
            });
          });
        });
      });
    });
  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is();
      });
    });

    title = callStr('str');
    it(title, function() {
      assert.throws(function() {
        vitals.is('str');
      });
    });

    title = callStr('fail', 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.is('fail', 'a');
      });
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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('is', arguments, 4);
}
