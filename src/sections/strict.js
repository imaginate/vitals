/**
 * ---------------------------------------------------------------------------
 * VITALS
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $defProp ../helpers/def-prop.js
/// #include @helper $defProps ../helpers/def-props.js
/// #include @helper $ownsOne ../helpers/owns-one.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #include @super is ../methods/is.js
/// #{{{ @section strict
/// #include @super amend ../methods/amend.js
/// #include @super assign ../methods/assign.js
/// #include @super create ../methods/create.js
/// #include @super freeze ../methods/freeze.js
/// #include @super seal ../methods/seal.js
/// #}}} @section strict
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
