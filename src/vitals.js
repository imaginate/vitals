/**
 * ---------------------------------------------------------------------------
 * VITALS
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #ifnot{{{ @env NODE
/// #insert @wrapper OPEN ./macros/wrapper.js
/// #include @core constants ./core/constants.js
/// #include @core helpers ./core/helpers.js
/// #include @helper $cloneArr ./helpers/clone-arr.js
/// #include @helper $cloneFun ./helpers/clone-fun.js
/// #include @helper $cloneObj ./helpers/clone-obj.js
/// #include @helper $cloneRegx ./helpers/clone-regx.js
/// #include @helper $escRegx ./helpers/esc-regx.js
/// #include @helper $getFlags ./helpers/get-flags.js
/// #include @helper $inArr ./helpers/in-arr.js
/// #include @helper $inObj ./helpers/in-obj.js
/// #include @helper $inStr ./helpers/in-str.js
/// #include @helper $match ./helpers/match.js
/// #include @helper $merge ./helpers/merge.js
/// #include @helper $ownEnum ./helpers/own-enum.js
/// #include @helper $ownsOne ./helpers/owns-one.js
/// #include @helper $sliceArr ./helpers/slice-arr.js
/// #include @helper $sliceStr ./helpers/slice-str.js
/// #include @helper $splitKeys ./helpers/split-keys.js
/// #{{{ @section base
/// #include @super is ./methods/is.js
/// #include @super copy ./methods/copy.js
/// #include @super cut ./methods/cut.js
/// #include @super each ./methods/each.js
/// #include @super fill ./methods/fill.js
/// #include @super fuse ./methods/fuse.js
/// #include @super get ./methods/get.js
/// #include @super has ./methods/has.js
/// #include @super remap ./methods/remap.js
/// #include @super roll ./methods/roll.js
/// #include @super same ./methods/same.js
/// #include @super sew ./methods/sew.js
/// #include @super slice ./methods/slice.js
/// #include @super stringify ./methods/stringify.js
/// #include @super to ./methods/to.js
/// #include @super until ./methods/until.js
/// #}}} @section base
/// #{{{ @section strict
/// #include @super amend ./methods/amend.js
/// #include @super assign ./methods/assign.js
/// #include @super create ./methods/create.js
/// #include @super freeze ./methods/freeze.js
/// #include @super seal ./methods/seal.js
/// #}}} @section strict
/// #insert @code EXPORT ./macros/export.js
/// #insert @wrapper CLOSE ./macros/wrapper.js
/// #ifnot}}} @env NODE
/// #if{{{ @env NODE
/// #insert @wrapper OPEN ./macros/wrapper.js
/// #include @core constants ./core/constants.js
/// #include @helper $objStr ./helpers/obj-str.js
/// #include @helper $own ./helpers/own.js
/// #include @helper $is ./helpers/is.js
/// #include @helper $mkStr ./helpers/mk-str.js
/// #include @helper $print ./helpers/print.js
/// #include @helper $mkErrs ./helpers/mk-errs.js
/// #include @helper $inArr ./helpers/in-arr.js
/// #include @helper $merge ./helpers/merge.js
/// #include @helper $sliceArr ./helpers/slice-arr.js

/// #{{{ @func newVitals
/**
 * @public
 * @param {(!Array<string>|...string)=} method = `"all"`
 *   The @vitals super methods to include in the output. The methods may be
 *   included by section or individually.
 * @return {(!Object|!Function)}
 *   If only one #method is defined and it is a super method (i.e. not a
 *   section), only the one #method is returned. Otherwise, an `object` with
 *   each defined #method set for its property keys and values is returned.
 */
function newVitals(method) {

  /** @type {!Array<string>} */
  var sections;
  /** @type {!Array<string>} */
  var methods;
  /** @type {(!Object|!Function)} */
  var vitals;

  switch (arguments['length']) {
    case 0:
      method = [];
      break;

    case 1:
      break;

    default:
      method = $sliceArr(arguments);
      break;
  }

  if ( $is.arr(method) ) {
    switch (method['length']) {
      case 0:
        sections = [ 'all' ];
        methods = [];
        break;

      case 1:
        method = method[0];

        if ( !$is.str(method) ) {
          throw _mkTypeErr(new TYPE_ERR, 'method', method,
            '(!Array<string>|...string)=');
        }
        else if (!method) {
          throw _mkErr(new ERR, 'invalid empty #method `string`');
        }

        if ( _isSection(method) ) {
          sections = _getSections([ method ]);
          methods = [];
        }
        else if ( !_isMethod(method) ) {
          throw _mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);
        }
        else {
          sections = [];
          methods = [ method ];
        }
        break;

      default:
        if ( !_isStrArr(method) ) {
          throw _mkTypeErr(new TYPE_ERR, 'method', method,
            '(!Array<string>|...string)=');
        }
        else if ( !_isFullStrArr(method) ) {
          throw _mkErr(new ERR, 'invalid empty #method `string`');
        }
        else if ( !_isValidStrArr(method) ) {
          throw _mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);
        }

        sections = _getSections(method);
        methods = _getMethods(method, sections);
        break;
    }
  }
  else if ( !$is.str(method) ) {
    throw _mkTypeErr(new TYPE_ERR, 'method', method,
      '(!Array<string>|...string)=');
  }
  else if (!method) {
    throw _mkErr(new ERR, 'invalid empty #method `string`');
  }
  else if ( _isSection(method) ) {
    sections = _getSections([ method ]);
    methods = [];
  }
  else if ( !_isMethod(method) ) {
    throw _mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);
  }
  else {
    sections = [];
    methods = [ method ];
  }

  vitals = _loadSections(sections);
  vitals = _loadMethods(vitals, methods, sections);
  vitals['mkGlobal'] = _newMkGlobal(vitals, sections, methods);
  vitals['makeGlobal'] = vitals['mkGlobal'];
  vitals['construct'] = newVitals;
  vitals['newVitals'] = newVitals;
  return vitals;
}
/// #}}} @func newVitals

/// #{{{ @helpers new-vitals

/// #{{{ @group main

/// #{{{ @group constants

/// #{{{ @const _SECTIONS
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @dict
 */
var _SECTIONS = {
  'all':    /^all$/i,
  'base':   /^base$/i,
  'strict': /^strict$/i,
  'fs':     /^fs$|^file-?system$/i,
  'shell':  /^shell$/i
};
/// #}}} @const _SECTIONS

/// #{{{ @const _METHODS
/**
 * @private
 * @const {!Object<string, boolean>}
 * @dict
 */
var _METHODS = {
  'amend':     YES,
  'assign':    YES,
  'copy':      YES,
  'cp':        YES,
  'create':    YES,
  'cut':       YES,
  'each':      YES,
  'fill':      YES,
  'freeze':    YES,
  'fuse':      YES,
  'get':       YES,
  'has':       YES,
  'is':        YES,
  'remap':     YES,
  'roll':      YES,
  'run':       YES,
  'same':      YES,
  'seal':      YES,
  'sew':       YES,
  'slice':     YES,
  'stringify': YES,
  'to':        YES,
  'until':     YES
};
/// #}}} @const _METHODS

/// #{{{ @const _SECTION_METHODS
/**
 * @private
 * @const {!Object<string, !Array<string>>}
 * @dict
 */
var _SECTION_METHODS = {
  'all': [
    'amend',
    'assign',
    'copy',
    'cp',
    'create',
    'cut',
    'each',
    'fill',
    'freeze',
    'fuse',
    'get',
    'has',
    'is',
    'remap',
    'roll',
    'run',
    'same',
    'seal',
    'sew',
    'slice',
    'stringify',
    'to',
    'until'
  ],
  'base': [
    'copy',
    'cut',
    'each',
    'fill',
    'fuse',
    'get',
    'has',
    'is',
    'remap',
    'roll',
    'same',
    'sew',
    'slice',
    'stringify',
    'to',
    'until'
  ],
  'strict': [
    'amend',
    'assign',
    'create',
    'freeze',
    'seal'
  ],
  'fs': [
    'cp',
    'get',
    'is',
    'to'
  ],
  'shell': [
    'run'
  ]
};
/// #}}} @const _SECTION_METHODS

/// #{{{ @const _VALID_RANGE
/**
 * @private
 * @const {!Array<string>}
 */
var _VALID_RANGE = [
  'all',
  'base',
  'strict',
  'fs',
  'shell',
  'amend',
  'assign',
  'copy',
  'cp',
  'create',
  'cut',
  'each',
  'fill',
  'freeze',
  'fuse',
  'get',
  'has',
  'is',
  'remap',
  'roll',
  'run',
  'same',
  'seal',
  'sew',
  'slice',
  'stringify',
  'to',
  'until'
];
/// #}}} @const _VALID_RANGE

/// #}}} @group constants

/// #{{{ @group methods

/// #{{{ @func _newMkGlobal
/**
 * @private
 * @param {(!Object|!Function)} VITALS
 * @param {!Array<string>} SECTIONS
 * @param {!Array<string>} METHODS
 * @return {!function}
 */
function _newMkGlobal(VITALS, SECTIONS, METHODS) {

  /// #{{{ @func _setMethods
  /**
   * @private
   * @param {!Array<string>} methods
   * @return {void}
   */
  function _setMethods(methods) {

    /** @type {string} */
    var method;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = methods['length'];
    i = -1;
    while (++i < len) {
      method = methods[i];
      ROOT[method] = VITALS[method];
    }
  }
  /// #}}} @func _setMethods

  /// #{{{ @func mkGlobal
  /**
   * @description
   *   This method appends the `vitals` instance and each of its super methods
   *   to the `global` `object`.
   * @public
   * @return {void}
   */
  function mkGlobal() {

    /** @type {string} */
    var section;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    ROOT['VITALS'] = VITALS;
    ROOT['Vitals'] = VITALS;
    ROOT['vitals'] = VITALS;

    _setMethods(METHODS);

    len = SECTIONS['length'];
    i = -1;
    while (++i < len) {
      section = SECTIONS[i];
      _setMethods(_SECTION_METHODS[section]);
    }
  }
  /// #}}} @func mkGlobal

  return mkGlobal;
}
/// #}}} @func _newMkGlobal

/// #{{{ @func _getMethods
/**
 * @private
 * @param {!Array<string>} opts
 * @param {!Array<string>} sections
 * @return {!Array<string>}
 */
function _getMethods(opts, sections) {

  /** @type {boolean} */
  var hasNoBaseFs;
  /** @type {!Array<string>} */
  var methods;
  /** @type {string} */
  var opt;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  hasNoBaseFs = !$inArr(sections, 'base') && $inArr(sections, 'fs');
  methods = [];
  len = opts['length'];
  i = -1;
  while (++i < len) {
    opt = opts[i];
    if ( _isMethod(opt) && !$inArr(methods, opt) ) {
      if ( ( hasNoBaseFs && _inFs(opt) ) || !_inSections(sections, opt) )
        methods['push'](opt);
    }
  }
  return methods;
}
/// #}}} @func _getMethods

/// #{{{ @func _getSections
/**
 * @private
 * @param {!Array<string>} opts
 * @return {!Array<string>}
 */
function _getSections(opts) {

  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var opt;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  sections = [];
  len = opts['length'];
  i = -1;
  while (++i < len) {
    opt = opts[i];
    if ( $own(_SECTIONS, opt) ) {
      if ( !$inArr(sections, opt) )
        sections['push'](opt);
    }
    else {
      for (key in _SECTIONS) {
        if ( $own(_SECTIONS, key) && _SECTIONS[key]['test'](opt) ) {
          if ( !$inArr(sections, key) )
            sections['push'](key);
        }
      }
    }
  }
  return sections;
}
/// #}}} @func _getSections

/// #{{{ @func _loadMethods
/**
 * @private
 * @param {?Object} vitals
 * @param {!Array<string>} methods
 * @param {!Array<string>} sections
 * @return {!Object}
 */
function _loadMethods(vitals, methods, sections) {

  /** @type {string} */
  var method;
  /** @type {boolean} */
  var hasFs;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];

  if (len === 0)
    return vitals;

  if (!vitals) {
    vitals = len === 1
      ? _requireMethod(methods[0])
      : {};
  }

  hasFs = $inArr(sections, 'fs');
  i = -1;
  while (++i < len) {
    method = methods[i];
    vitals[method] = hasFs && _inFs(method)
      ? _requireMethod(method + '-fs')
      : _requireMethod(method);
  }
  return vitals;
}
/// #}}} @func _loadMethods

/// #{{{ @func _loadSections
/**
 * @private
 * @param {!Array<string>} sections
 * @return {!Object}
 */
var _loadSections = (function _loadSectionsPrivateScope() {

  /// #{{{ @func _setMethods
  /**
   * @private
   * @param {!Object} vitals
   * @param {!Object} section
   * @param {!Array<string>} methods
   * @return {void}
   */
  function _setMethods(vitals, section, methods) {

    /** @type {string} */
    var method;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = methods['length'];
    i = -1;
    while (++i < len) {
      method = methods[i];
      vitals[method] = section[method];
    }
  }
  /// #}}} @func _setMethods

  /// #{{{ @func loadSections
  /**
   * @param {!Array<string>} sections
   * @return {!Object}
   */
  function loadSections(sections) {

    /** @type {boolean} */
    var hasBaseFs;
    /** @type {!Object} */
    var vitals;
    /** @type {!Object} */
    var result;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (sections['length'] === 0)
      return NIL;

    hasBaseFs = $inArr(sections, 'base') && $inArr(sections, 'fs');
    vitals = {};
    len = sections['length'];
    i = -1;
    while (++i < len) {
      key = sections[i];
      result = key === 'base' && hasBaseFs
        ? _requireSection('base-fs')
        : _requireSection(key);
      vitals[key] = result;
      if (key !== 'fs' || !hasBaseFs)
        _setMethods(vitals, result, _SECTION_METHODS[key]);
    }
    return vitals;
  }
  /// #}}} @func loadSections

  return loadSections;
})();
/// #}}} @func _loadSections

/// #{{{ @func _requireMethod
/**
 * @private
 * @param {string} method
 * @return {!Function}
 */
function _requireMethod(method) {
  return require('./methods/' + method + '.js');
}
/// #}}} @func _requireMethod

/// #{{{ @func _requireSection
/**
 * @private
 * @param {string} section
 * @return {!Object}
 */
function _requireSection(section) {
  return require('./sections/' + section + '.js');
}
/// #}}} @func _requireSection

/// #}}} @group methods

/// #}}} @group main

/// #{{{ @group in

/// #{{{ @func _inFs
/**
 * @private
 * @param {string} method
 * @return {boolean}
 */
function _inFs(method) {
  return $inArr(_SECTION_METHODS['fs'], method);
}
/// #}}} @func _inFs

/// #{{{ @func _inSections
/**
 * @private
 * @param {!Array<string>} sections
 * @param {string} method
 * @return {boolean}
 */
function _inSections(sections, method) {

  /** @type {string} */
  var section;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = sections['length'];
  i = -1;
  while (++i < len) {
    section = sections[i];
    if ( $inArr(_SECTION_METHODS[section], method) )
      return YES;
  }
  return NO;
}
/// #}}} @func _inSections

/// #}}} @group in

/// #{{{ @group is

/// #{{{ @func _isMethod
/**
 * @private
 * @param {string} method
 * @return {boolean}
 */
function _isMethod(method) {
  return $own(_METHODS, method);
}
/// #}}} @func _isMethod

/// #{{{ @func _isSection
/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
function _isSection(section) {

  /** @type {string} */
  var key;

  if ( $own(_SECTIONS, section) )
    return YES;

  for (key in _SECTIONS) {
    if ( $own(_SECTIONS, key) && _SECTIONS[key]['test'](section) )
      return YES;
  }
  return NO;
}
/// #}}} @func _isSection

/// #{{{ @func _isStrArr
/**
 * @private
 * @param {!Array} methods
 * @return {boolean}
 */
function _isStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if ( !$is.str(methods[i]) )
      return NO;
  }
  return YES;
}
/// #}}} @func _isStrArr

/// #{{{ @func _isFullStrArr
/**
 * @private
 * @param {!Array<string>} methods
 * @return {boolean}
 */
function _isFullStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if (!methods[i])
      return NO;
  }
  return YES;
}
/// #}}} @func _isFullStrArr

/// #{{{ @func _isValidStrArr
/**
 * @private
 * @param {!Array<string>} methods
 * @return {boolean}
 */
function _isValidStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if ( !_isSection(methods[i]) && !_isMethod(methods[i]) )
      return NO;
  }
  return YES;
}
/// #}}} @func _isValidStrArr

/// #}}} @group is

/// #{{{ @group errors

/// #{{{ @const _MK_ERR
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var _MK_ERR = $mkErrs();
/// #}}} @const _MK_ERR

/// #insert @code MK_ERR ./macros/mk-err.js

/// #insert @code MK_TYPE_ERR ./macros/mk-err.js

/// #insert @code MK_RANGE_ERR ./macros/mk-err.js

/// #}}} @group errors

/// #}}} @helpers new-vitals

/// #{{{ @group exports
newVitals['VERSION'] = VERSION;
newVitals['construct'] = newVitals;
newVitals['newVitals'] = newVitals;
module.exports = newVitals;
/// #}}} @group exports
/// #insert @wrapper CLOSE ./macros/wrapper.js
/// #if}}} @env NODE

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
