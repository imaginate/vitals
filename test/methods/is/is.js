/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var TYPES = {

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
      shortcut: 'res|regexs',
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
      shortcut: 'reMap|regexMap',
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

method('is', function() {

  buildTests(TYPES);

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is();
      }, validErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.is('str');
      }, validErr);
    });

    test('fail', 'a', function() {
      assert.throws(function() {
        vitals.is('fail', 'a');
      }, validRangeErr);
    });
  });

  /**
   * @param {!Object} sections
   */
  function buildTests(sections) {

    /** @type {!Object} */
    var section;
    /** @type {string} */
    var title;

    for (title in sections) {
      if ( hasOwn(sections, title) ) {
        section = sections[title];
        setupSection(title, section);
      }
    }
  }

  /**
   * @param {string} title
   * @param {!Object} section
   */
  function setupSection(title, section) {

    /** @type {!Object} */
    var main;
    /** @type {string} */
    var type;

    suite(title, function() {
      for (type in section) {
        if ( hasOwn(section, type) ) {
          main = section[type];
          setupType(type, main);
        }
      }
    });
  }

  /**
   * @param {string} type
   * @param {!Object} main
   */
  function setupType(type, main) {

    /** @type {!Array} */
    var types;
    /** @type {number} */
    var i;

    suite(type, function() {
      setupTests(type, main);
    });

    if ( main.shortcut ) {
      types = main.shortcut.split('|');
      i = types.length;
      while (i--) {
        type = types[i];
        suite(type, function() {
          setupTests(type, main);
        });
      }
    }
  }

  /**
   * @param {string} type
   * @param {!Object} main
   */
  function setupTests(type, main) {
    should('return true', function() {
      mkTests(type, main.truthy, true);
      applyTests(type, main.plural.truthy, true);
    });
    should('return false', function() {
      mkTests(type, main.falsy, false);
      applyTests(type, main.plural.falsy, false);
    });
  }

  /**
   * @param {string} type
   * @param {*} val
   * @param {boolean} result
   */
  function mkTest(type, val, result) {
    test(type, val, function() {
      var actual = vitals.is(type, val);
      assert( actual === result );
    });
  }

  /**
   * @param {string} type
   * @param {!Array} vals
   * @param {boolean} result
   */
  function applyTest(type, vals, result) {

    /** @type {!Array} */
    var testArgs;
    /** @type {!Array} */
    var args;

    args = sliceArr(vals);
    args.unshift(type);
    testArgs = sliceArr(args);
    testArgs.push(theTest);
    test.apply(null, testArgs);

    function theTest() {
      var actual = vitals.is.apply(null, args);
      assert( actual === result );
    }
  }

  /**
   * @param {string} type
   * @param {!Array} vals
   * @param {boolean} result
   */
  function mkTests(type, vals, result) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) mkTest(type, vals[i], result);
  }

  /**
   * @param {string} type
   * @param {!Array} vals
   * @param {boolean} result
   */
  function applyTests(type, vals, result) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) applyTest(type, vals[i], result);
  }
});
