/* vitals v5.0.0 (http://vitalsjs.com)
 * Copyright (c) 2014-2017 Adam A Smith <adam@imaginate.life>
 * The Apache License (http://vitalsjs.com/license) */
'use strict';
(function(__THIS,__VOID){var VERSION="5.0.0";var ENV={HAS_EXPORTS:true,HAS_MODULE:true,HAS_GLOBAL:true,HAS_WINDOW:false,HAS_DEFINE:false,HAS_SELF:false,HAS_THIS:false,ROOT:global};var ROOT=ENV.ROOT;var ARR=ROOT["Array"];var ARR_PROTO=ARR["prototype"];var ERR=ROOT["Error"];var FUN=ROOT["Function"];var FUN_PROTO=FUN["prototype"];var NIL=null;var NO=false;var NUM=ROOT["Number"];var NUM_PROTO=NUM["prototype"];var OBJ=ROOT["Object"];var OBJ_PROTO=OBJ["prototype"];var RANGE_ERR=ROOT["RangeError"];var REGX=
ROOT["RegExp"];var REGX_PROTO=REGX["prototype"];var STR=ROOT["String"];var STR_PROTO=STR["prototype"];var TYPE_ERR=ROOT["TypeError"];var VOID=__VOID;var YES=true;var BUFF=ROOT["Buffer"];var CP=require("child_process");var FS=require("fs");var PATH=require("path");var $objStr=function $objStrPrivateScope(){function $objStr(source){return _objToStr["call"](source)}var _objToStr=OBJ_PROTO["toString"];return $objStr}();var $own=function $ownPrivateScope(){function $own(source,key){return _hasOwnProp["call"](source,
key)}var _hasOwnProp=OBJ_PROTO["hasOwnProperty"];return $own}();var $is=function $isPrivateScope(){function isNull(val){return val===NIL}function isUndefined(val){return val===VOID}function isBoolean(val){return typeof val==="boolean"}function isString(val){return typeof val==="string"}function isNonEmptyString(val){return!!val&&typeof val==="string"}function isNumber(val){return typeof val==="number"&&val===val&&isFinite(val)}function isNonZeroNumber(val){return!!val&&typeof val==="number"&&val===
val&&isFinite(val)}function isNan(val){return val!==val}function isObject(val){return!!val&&typeof val==="object"}function isObjectOrFunction(val){if(!val)return false;switch(typeof val){case "object":case "function":return true;default:return false}}function isFunction(val){return!!val&&typeof val==="function"}function isArray(val){return isObject(val)&&$objStr(val)==="[object Array]"}function isRegExp(val){return isObject(val)&&$objStr(val)==="[object RegExp]"}function isDate(val){return isObject(val)&&
$objStr(val)==="[object Date]"}function isError(val){return isObject(val)&&$objStr(val)==="[object Error]"}function isArguments(val){return isObject(val)&&$objStr(val)==="[object Arguments]"}function isArrayOrArguments(val){if(!isObject(val))return false;switch($objStr(val)){case "[object Array]":case "[object Arguments]":return true;default:return false}}var isBuffer=BUFF["isBuffer"];function isDomDocument(val){return isObject(val)&&"nodeType"in val&&val["nodeType"]===9}function isDomElement(val){return isObject(val)&&
"nodeType"in val&&val["nodeType"]===1}function isArrayLike(val){var len;if(isArray(val))return true;len=val["length"];return isNumber(len)&&isWholeNumber(len)&&len>=0}function isEmpty(val){var key;if(!val)return YES;if(typeof val==="function")return val["length"]===0;if(typeof val!=="object")return NO;if($objStr(val)==="[object Array]")return val["length"]===0;for(key in val)if($own(val,key))return NO;return YES}var _EOL=/^(?:cr|lf|crlf)$/i;function isEndOfLine(val){return _EOL["test"](val)}var _FLAGS=
function _FLAGS_PrivateScope(){var pattern;var source;var flags;flags="img";if("sticky"in REGX_PROTO)flags+="y";if("unicode"in REGX_PROTO)flags+="u";source="^(?:"+"[\\+\\-]["+flags+"\\+\\-]*"+"|"+"["+flags+"]*"+")$";pattern=new REGX(source);pattern.FLAGS=flags;pattern.SRC="/"+source+"/";return pattern}();function isRegExpFlags(val){return _FLAGS["test"](val)}isRegExpFlags.FLAGS=_FLAGS.FLAGS;isRegExpFlags.SRC=_FLAGS.SRC;var isExtensible=function $isExtensiblePolyfillPrivateScope(){var objectIsExtensible;
if(!("isExtensible"in OBJ)||!isFunction(OBJ["isExtensible"]))return function isExtensible(src){return false};objectIsExtensible=OBJ["isExtensible"];try{objectIsExtensible(function(){});return objectIsExtensible}catch(e){return function isExtensible(src){return typeof src==="object"&&objectIsExtensible(src)}}}();var isFrozen=function $isFrozenPolyfillPrivateScope(){var objectIsFrozen;if(!("isFrozen"in OBJ)||!isFunction(OBJ["isFrozen"]))return function isFrozen(src){return false};objectIsFrozen=OBJ["isFrozen"];
try{objectIsFrozen(function(){});return objectIsFrozen}catch(e){return function isFrozen(src){return typeof src==="object"&&objectIsFrozen(src)}}}();var isSealed=function $isSealedPolyfillPrivateScope(){var objectIsSealed;if(!("isSealed"in OBJ)||!isFunction(OBJ["isSealed"]))return function isSealed(src){return false};objectIsSealed=OBJ["isSealed"];try{objectIsSealed(function(){});return objectIsSealed}catch(e){return function isSealed(src){return typeof src==="object"&&objectIsSealed(src)}}}();function isWholeNumber(val){return!(val%
1)}function isOddNumber(val){return!!(val%2)}function isEvenNumber(val){return!(val%2)}var _getStats=FS["statSync"];function isDirectory(path){if(!path||!isString(path))return NO;try{return _getStats(path)["isDirectory"]()}catch(e){return NO}}function isFile(path){if(!path||!isString(path))return NO;try{return _getStats(path)["isFile"]()}catch(e){return NO}}var $is={nil:isNull,void:isUndefined,bool:isBoolean,str:isString,_str:isNonEmptyString,num:isNumber,_num:isNonZeroNumber,nan:isNan,obj:isObject,
_obj:isObjectOrFunction,fun:isFunction,arr:isArray,_arr:isArrayOrArguments,args:isArguments,regx:isRegExp,date:isDate,err:isError,buff:isBuffer,doc:isDomDocument,elem:isDomElement,arrish:isArrayLike,empty:isEmpty,eol:isEndOfLine,flags:isRegExpFlags,extend:isExtensible,frozen:isFrozen,sealed:isSealed,whole:isWholeNumber,odd:isOddNumber,even:isEvenNumber,dir:isDirectory,file:isFile};return $is}();function $mkStr(val){return $is.str(val)?val:$is.regx(val)?val["toString"]():STR(val)}var $print=function $printPrivateScope(){function $print(val,
depth){depth=depth||0;return $is._obj(val)?$is.regx(val)?val["toString"]():_mapToStr(val,depth):_primToStr(val)}var _INDENT="    ";var _MAP_TYPE=/^\[object ([a-zA-Z0-9_\$]+)\]$/;var _LAST_SEP=/,\n$/;function _emptyHashMap(val){var key;for(key in val)if($own(val,key))return false;return true}function _escStr(val){val=val["replace"](/\\/g,"\\\\");val=val["replace"](/\n/g,"\\n");val=val["replace"](/\r/g,"\\r");val=val["replace"](/\t/g,"\\t");val=val["replace"](/\v/g,"\\v");val=val["replace"](/\0/g,"\\0");
val=val["replace"](/\b/g,"\\b");val=val["replace"](/\f/g,"\\f");return val}function _getMapType(val){var type;if($is.fun(val)){type="Function";if(val["name"])type+="("+val["name"]+")";return type}type=$objStr(val);return _MAP_TYPE["test"](type)?type["replace"](_MAP_TYPE,"$1"):"UnknownObjectType"}function _mkIndent(depth){var indent;if(indent<1)return"";indent="";while(depth--)indent+=_INDENT;return indent}function _primToStr(val){if($is.bool(val))return val?"true":"false";if($is.nil(val))return"null";
if($is.void(val))return"undefined";if($is.nan(val))return"NaN";if($is.str(val))return'"'+_escStr(val)+'"';return $mkStr(val)}function _arrToStr(val,depth){var result;var indent;var len;var i;len=val["length"];if(len<1)return"[]";indent=_mkIndent(depth);depth+=1;result="[\n";i=-1;while(++i<len){result+=indent+i+": ";result+=$print(val[i],depth)+",\n"}result=result["replace"](_LAST_SEP,"\n");return result+"]"}function _keyToStr(key){return"'"+$mkStr(key)+"'"}function _mapToStr(val,depth){var result;
result=_getMapType(val)+": ";result+=$is._arr(val)?_arrToStr(val,depth):_ownToStr(val,depth);return result}function _ownToStr(val,depth){var result;var indent;var key;if(_emptyHashMap(val))return"{}";indent=_mkIndent(depth);depth+=1;result="{\n";for(key in val)if($own(val,key)){result+=indent;result+=_keyToStr(key)+": ";result+=$print(val[key],depth)+",\n"}result=result["replace"](_LAST_SEP,"\n");return result+"}"}return $print}();var $mkObj=function $mkObjPrivateScope(){var _create=function _createPrivateScope(){if("create"in
OBJ&&$is.fun(OBJ["create"]))return OBJ["create"];function _Obj(){}function create(proto){var obj;_Obj["prototype"]=proto;obj=new _Obj;_Obj["prototype"]=NIL;return obj}return create}();function $mkObj(proto){return _create(proto)}return $mkObj}();var $mkErrs=function $mkErrsPrivateScope(){var _OPEN_HASH=/^#/;var _OPEN_VITALS=/^vitals\./;var _STRICT=/^\!/;function _mkOptions(opts){var result;var len;var i;result="";len=opts["length"];i=-1;while(++i<len)result+="\n- `"+$print(opts[i])+"`";return result}
function _prepSuper(name){if($is.void(name))return"newVitals";name=name["replace"](_OPEN_VITALS,"");return"vitals."+name}function _prepParam(name){if(!name)return"";if(_STRICT["test"](name))return name["replace"](_STRICT,"");name=name["replace"](_OPEN_HASH,"");return"#"+name}function _setErrorProps(err,name,msg,val){err["__vitals"]=true;err["vitals"]=true;err["name"]=name;switch(name){case "TypeError":err["__type"]=true;err["type"]=true;break;case "RangeError":err["__range"]=true;err["range"]=true;
break}err["message"]=msg;err["msg"]=msg;if(arguments["length"]>3){err["value"]=val;err["val"]=val}return err}function $mkErrs(superMethod){var MK_ERR={error:error,typeError:typeError,rangeError:rangeError};var _SUPER=_prepSuper(superMethod);function _prepMethod(method){method=method?_SUPER:_SUPER+"."+method;return"`"+method+"`"}function error(err,msg,method){method=_prepMethod(method);msg+=" for "+method+" call";return _setErrorProps(err,"Error",msg)}function typeError(err,paramName,paramVal,validTypes,
methodName){var method;var param;var msg;var val;method=_prepMethod(methodName);param=_prepParam(paramName);val=$print(paramVal);msg="invalid "+param+" data type for "+method+" call\n";msg+="valid data types: `"+validTypes+"`\n";msg+="actual "+param+" value: `"+val+"`";return _setErrorProps(err,"TypeError",msg,paramVal)}function rangeError(err,paramName,validRange,methodName){var method;var param;var msg;method=_prepMethod(methodName);param=_prepParam(paramName);msg="out-of-range "+param+" for "+
method+" call";if($is.str(validRange))msg+="\nvalid range: `"+validRange+"`";else if($is.arr(validRange))msg+="\nvalid options:"+_mkOptions(validRange);return _setErrorProps(err,"RangeError",msg)}return MK_ERR}return $mkErrs}();var $strIncl=function $strInclPrivateScope(){var $strIncl="includes"in STR_PROTO&&$is.fun(STR_PROTO["includes"])?function $strIncl(src,val){return src["includes"](val)}:function $strIncl(src,val){return src["indexOf"](val)!==-1};return $strIncl}();function $cloneArr(src){var clone;
var key;clone=new ARR(src["length"]);for(key in src)if($own(src,key))clone[key]=src[key];return clone}function $cloneFun(func){function funcCopy(){return func["apply"](NIL,arguments)}var key;for(key in func)if($own(func,key))funcCopy[key]=func[key];return funcCopy}function $cloneObj(obj){var clone;var key;clone={};for(key in obj)if($own(obj,key))clone[key]=obj[key];return clone}function $escRegx(source){return source["replace"](/[\\^$.*+?|(){}[\]]/g,"\\$\x26")}function $match(src,patt){if($is.regx(patt))return patt["test"](src);
patt=$mkStr(patt);return!src?!patt:!patt?YES:$strIncl(src,patt)}function $sliceArr(src,start,end){var result;var len;var ii;var i;len=src["length"];if($is.void(start))start=0;if($is.void(end))end=len;if(start<0)start+=len;if(start<0)start=0;if(end>len)end=len;else if(end<0)end+=len;if(start>=end)return[];result=new ARR(end-start);ii=start-1;i=0;while(++ii<end)result[i++]=src[ii];return result}var is=function isPrivateScope(){function is(types,val){var nullable;var checks;var vals;switch(arguments["length"]){case 0:throw _mkErr(new ERR,
"no #types defined");case 1:throw _mkErr(new ERR,"no #val defined");case 2:vals=NO;break;default:vals=YES;break}if(!$is.str(types))throw _mkTypeErr(new TYPE_ERR,"types",types,"string");if(!types)throw _mkErr(new ERR,"invalid empty #types `string`");if(_hasSpecial("*",types))return YES;checks=_getChecks(types);if(!checks)throw _mkRangeErr(new RANGE_ERR,"types","https://github.com/imaginate/vitals/wiki/vitals.is-types");nullable=_getNullable(types);return vals?_checkVals(checks,arguments,nullable):
_checkVal(checks,val,nullable)}function _checkVal(checks,val,nullable){var i;i=checks["length"];while(i--)if(checks[i](val,nullable))return YES;return NO}function _checkVals(checks,vals,nullable){var i;i=vals["length"];while(--i)if(!_checkVal(checks,vals[i],nullable))return NO;return YES}var _TYPES=function _TYPES_PrivateScope(){var $types={};function _addTypes(section,types,nullableDefault){var type;for(type in types)if($own(types,type))_addType(section,type,types[type],nullableDefault)}function _addType(section,
type,check,nullableDefault){if($own(_addType,section))check=_addType[section](check);nullableDefault=nullableDefault!==NO;function typeCheck(val,nullable){if(!$is.bool(nullable))nullable=nullableDefault;return $is.nil(val)?nullable:check(val)}$types["_"+type]=typeCheck}function _addShortcuts(shortcuts){var shortcut;var type;for(shortcut in shortcuts)if($own(shortcuts,shortcut)){type="_"+shortcuts[shortcut];shortcut="_"+shortcut;$types[shortcut]=$types[type]}}function _addArrayType(eachCheck){function check(val){var i;
if(!$is.arr(val))return NO;i=val["length"];while(i--)if(!eachCheck(val[i]))return NO;return YES}return check}_addType["arrays"]=_addArrayType;function _addMapType(eachCheck){function check(val){var key;if(!$is.obj(val))return NO;for(key in val)if($own(val,key)&&!eachCheck(val[key]))return NO;return YES}return check}_addType["maps"]=_addMapType;_addTypes("primitives",{"undefined":$is.void,"boolean":$is.bool,"string":$is.str,"number":$is.num,"nan":$is.nan},NO);_addType("primitives","null",$is.nil);
_addTypes("js_objects",{"object":$is.obj,"regexp":$is.regx,"array":$is.arr,"error":$is.err,"date":$is.date});_addType("js_objects","arguments",$is.args);_addType("js_objects","function",$is.fun,NO);_addTypes("dom_objects",{"element":$is.elem,"document":$is.doc});_addType("others","empty",$is.empty);_addTypes("arrays",{"undefineds":$is.void,"nulls":$is.nil,"booleans":$is.bool,"strings":$is.str,"numbers":$is.num,"nans":$is.nan,"objects":$is.obj,"functions":$is.fun,"regexps":$is.regx,"arrays":$is.arr,
"dates":$is.date,"errors":$is.err,"elements":$is.elem,"documents":$is.doc});_addTypes("maps",{"undefinedmap":$is.void,"nullmap":$is.nil,"booleanmap":$is.bool,"stringmap":$is.str,"numbermap":$is.num,"nanmap":$is.nan,"objectmap":$is.obj,"functionmap":$is.func,"regexpmap":$is.regex,"arraymap":$is.arr,"datemap":$is.date,"errormap":$is.err,"elementmap":$is.elem,"documentmap":$is.doc});_addShortcuts({"nil":"null","bool":"boolean","str":"string","num":"number","void":"undefined","obj":"object","func":"function",
"fun":"function","fn":"function","regex":"regexp","regx":"regexp","re":"regexp","arr":"array","err":"error","args":"arguments","elem":"element","doc":"document","undefinedes":"undefineds","voids":"undefineds","nils":"nulls","strs":"strings","nums":"numbers","bools":"booleans","objs":"objects","funcs":"functions","funs":"functions","fns":"functions","regexes":"regexps","regexs":"regexps","res":"regexps","arrs":"arrays","errs":"errors","elems":"elements","docs":"documents","voidmap":"undefinedmap",
"nilmap":"nullmap","strmap":"stringmap","nummap":"numbermap","boolmap":"booleanmap","objmap":"objectmap","funcmap":"functionmap","funmap":"functionmap","fnmap":"functionmap","regexmap":"regexpmap","regxmap":"regexpmap","remap":"regexpmap","arrmap":"arraymap","errmap":"errormap","elemmap":"elementmap","docmap":"documentmap"});return $types}();var _ALL_SPECIALS=/[^a-z\|]/g;var _SPECIALS=function _SPECIALS_PrivateScope(){var _PIPE=/\|/;var _EXCLAMATION_POINT=/\!/;var _QUESTION_MARK=/\?/;var _EQUAL_SIGN=
/\=/;var _ANY=/\*|any/;function hasPipe(val){return _PIPE["test"](val)}function hasExPoint(val){return _EXCLAMATION_POINT["test"](val)}function hasQuestMark(val){return _QUESTION_MARK["test"](val)}function hasEqSign(val){return _EQUAL_SIGN["test"](val)}function hasAnyGlob(val){return _ANY["test"](val)}var SPECIALS={"|":hasPipe,"!":hasExPoint,"?":hasQuestMark,"\x3d":hasEqSign,"*":hasAnyGlob};return SPECIALS}();function _hasSpecial(special,types){return _SPECIALS[special](types)}function _getChecks(types){var checks;
var type;var i;if(_hasSpecial("\x3d",types))types+="|undefined";types=types["toLowerCase"]();types=types["replace"](_ALL_SPECIALS,"");checks=types["split"]("|");i=checks["length"];while(i--){type="_"+checks[i];if(!$own(_TYPES,type))return NIL;checks[i]=_TYPES[type]}return checks["length"]?checks:NIL}function _getNullable(types){var override;var ensure;var negate;ensure=_hasSpecial("?",types);negate=_hasSpecial("!",types);override=ensure&&negate?NO:ensure||negate;return override?!negate&&ensure:VOID}
var _MK_ERR=$mkErrs("is");var _mkErr=_MK_ERR.error;var _mkTypeErr=_MK_ERR.typeError;var _mkRangeErr=_MK_ERR.rangeError;return is}();var cut=function cutPrivateScope(){function cut(source,val,thisArg){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined");case 1:throw _mkErr(new ERR,"no #val defined");case 2:if($is.str(source))return $is.arr(val)?_cutPatterns(source,val):_cutPattern(source,val);if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments|string");
if($is.args(source))source=$sliceArr(source);return $is.fun(val)?$is.arr(source)?_filterArr(source,val,VOID):_filterObj(source,val,VOID):$is.arr(val)?_cutProps(source,val):_cutProp(source,val);default:if($is.str(source)){val=$sliceArr(arguments,1);return _cutPatterns(source,val)}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments|string");if($is.args(source))source=$sliceArr(source);if($is.fun(val)){if(!$is.nil(thisArg)&&!$is.void(thisArg)&&!$is.obj(thisArg))throw _mkTypeErr(new TYPE_ERR,
"thisArg",thisArg,"?Object\x3d");return $is.arr(source)?_filterArr(source,val,thisArg):_filterObj(source,val,thisArg)}val=$sliceArr(arguments,1);return _cutProps(source,val)}}function cutProperty(source,val,thisArg){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","property");case 1:throw _mkErr(new ERR,"no #val defined","property");case 2:if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","property");if($is.args(source))source=
$sliceArr(source);return $is.fun(val)?$is.arr(source)?_filterArr(source,val,VOID):_filterObj(source,val,VOID):_cutProp(source,val);default:if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","property");if($is.args(source))source=$sliceArr(source);if($is.fun(val)){if(!$is.nil(thisArg)&&!$is.void(thisArg)&&!$is.obj(thisArg))throw _mkTypeErr(new TYPE_ERR,"thisArg",thisArg,"?Object\x3d","property");return $is.arr(source)?_filterArr(source,val,thisArg):
_filterObj(source,val,thisArg)}return _cutProp(source,val)}}cut["property"]=cutProperty;cut["prop"]=cutProperty;function cutKey(source,key){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","key");case 1:throw _mkErr(new ERR,"no #key defined","key");}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function","key");return _cutKey(source,key)}cut["key"]=cutKey;function cutIndex(source,index,toIndex){switch(arguments["length"]){case 0:throw _mkErr(new ERR,
"no #source defined","index");case 1:throw _mkErr(new ERR,"no #index defined","index");case 2:if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Array|!Arguments|!Object|!Function","index");if(!$is.arrish(source))throw _mkErr(new ERR,"#source failed `array-like` test (#source."+"length must be a whole `number` that is `0` or more)","index");if(!$is.num(index))throw _mkTypeErr(new TYPE_ERR,"index",index,"number","index");if(!$is.whole(index))throw _mkErr(new ERR,"invalid #index `number` ("+
"must be a whole `number`)","index");if(!$is.arr(source))source=$sliceArr(source);return _cutIndex(source,index,VOID);default:if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Array|!Arguments|!Object|!Function","index");if(!$is.arrish(source))throw _mkErr(new ERR,"#source failed `array-like` test (#source."+"length must be a whole `number` that is `0` or more)","index");if(!$is.num(index))throw _mkTypeErr(new TYPE_ERR,"index",index,"number","index");if(!$is.whole(index))throw _mkErr(new ERR,
"invalid #index `number` ("+"must be a whole `number`)","index");if(!$is.void(toIndex)){if(!$is.num(toIndex))throw _mkTypeErr(new TYPE_ERR,"toIndex",toIndex,"number","index");if(!$is.whole(index))throw _mkErr(new ERR,"invalid #toIndex `number` ("+"must be a whole `number`)","index");}if(!$is.arr(source))source=$sliceArr(source);return _cutIndex(source,index,toIndex)}}cut["index"]=cutIndex;cut["i"]=cutIndex;function cutType(source,type){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined",
"type");case 1:throw _mkErr(new ERR,"no #type defined","type");}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","type");if(!$is.str(type))throw _mkTypeErr(new TYPE_ERR,"type",type,"string","type");if($is.args(source))source=$sliceArr(source);if($is.empty(source)){is(type,"");return source}return _cutType(source,type)}cut["type"]=cutType;function cutValue(source,val){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined",
"value");case 1:throw _mkErr(new ERR,"no #val defined","value");}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","value");if($is.args(source))source=$sliceArr(source);return _cutVal(source,val)}cut["value"]=cutValue;cut["val"]=cutValue;function cutPattern(source,pattern){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","pattern");case 1:throw _mkErr(new ERR,"no #pattern defined","pattern");}if(!$is.str(source))throw _mkTypeErr(new TYPE_ERR,
"source",source,"string","pattern");return _cutPattern(source,pattern)}cut["pattern"]=cutPattern;cut["patt"]=cutPattern;function cutProperties(source,val){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","properties");case 1:throw _mkErr(new ERR,"no #val defined","properties");case 2:break;default:val=$sliceArr(arguments,1);break}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","properties");if($is.args(source))source=
$sliceArr(source);return $is.arr(val)?_cutProps(source,val):_cutProp(source,val)}cut["properties"]=cutProperties;cut["props"]=cutProperties;function cutKeys(source,key){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","keys");case 1:throw _mkErr(new ERR,"no #key defined","keys");case 2:break;default:key=$sliceArr(arguments,1);break}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function","keys");return $is.arr(key)?_cutKeys(source,key):_cutKey(source,
key)}cut["keys"]=cutKeys;function cutIndexes(source,index){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","indexes");case 1:throw _mkErr(new ERR,"no #index defined","indexes");case 2:break;default:index=$sliceArr(arguments,1);break}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Array|!Arguments|!Object|!Function","indexes");if(!$is.arrish(source))throw _mkErr(new ERR,"#source failed `array-like` test (#source."+"length must be a whole `number` that is `0` or more)",
"indexes");if(!$is.arr(source))source=$sliceArr(source);if(!$is.arr(index)){if(!$is.num(index))throw _mkTypeErr(new TYPE_ERR,"index",index,"(!Array\x3cnumber\x3e|...number)","indexes");if(!$is.whole(index))throw _mkErr(new ERR,"invalid #index `number` ("+"must be a whole `number`)","indexes");return _cutIndex(source,index)}if(!_isNumArr(index))throw _mkTypeErr(new TYPE_ERR,"index",index,"(!Array\x3cnumber\x3e|...number)","indexes");if(!_isWholeNumArr(index))throw _mkErr(new ERR,"an invalid #index `number` ("+
"every #index must be a whole `number`)","indexes");return _cutIndexes(source,index)}cut["indexes"]=cutIndexes;cut["ii"]=cutIndexes;function cutValues(source,val){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","values");case 1:throw _mkErr(new ERR,"no #val defined","values");case 2:break;default:val=$sliceArr(arguments,1);break}if(!$is._obj(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"!Object|!Function|!Array|!Arguments","values");if($is.args(source))source=
$sliceArr(source);return $is.arr(val)?_cutVals(source,val):_cutVal(source,val)}cut["values"]=cutValues;cut["vals"]=cutValues;function cutPatterns(source,pattern){switch(arguments["length"]){case 0:throw _mkErr(new ERR,"no #source defined","patterns");case 1:throw _mkErr(new ERR,"no #pattern defined","patterns");case 2:break;default:pattern=$sliceArr(arguments,1);break}if(!$is.str(source))throw _mkTypeErr(new TYPE_ERR,"source",source,"string","patterns");return $is.arr(pattern)?_cutPatterns(source,
pattern):_cutPattern(source,pattern)}cut["patterns"]=cutPatterns;cut["patts"]=cutPatterns;function _cutProp(source,val){return $is.arr(source)?$is.num(val)&&$is.whole(val)?_spliceKey(source,val):_spliceVal(source,val):$is.str(val)||$is.regx(val)?_deleteKey(source,val):_deleteVal(source,val)}function _cutProps(source,vals){return $is.arr(source)?_isIntArr(vals)?_spliceKeys(source,vals):_spliceVals(source,vals):$is.str(vals[0])||$is.regx(vals[0])?_deleteKeys(source,vals):_deleteVals(source,vals)}function _cutKey(source,
key){if($own(source,key))delete source[key];return source}function _cutKeys(source,keys){var len;var i;len=keys["length"];i=-1;while(++i<len)source=_cutKey(source,keys[i]);return source}function _cutIndex(source,key,toKey){var len;len=source["length"];if(key<0)key+=len;if(key>=len)return source;if($is.void(toKey)){if(key<0)return source;source["splice"](key,1);return source}if(key<0)key=0;if(toKey>len)toKey=len;else if(toKey<0)toKey+=len;if(key>=toKey)return source;source["splice"](key,toKey-key);
return source}function _cutIndexes(source,keys){return _spliceKeys(source,keys)}function _cutType(source,type){return $is.arr(source)?_spliceValByType(source,type):_deleteValByType(source,type)}function _cutVal(source,val){return $is.arr(source)?_spliceVal(source,val):_deleteVal(source,val)}function _cutVals(source,vals){return $is.arr(source)?_spliceVals(source,vals):_deleteVals(source,vals)}function _cutPattern(source,pattern){if(!$is.regx(pattern)){pattern=$mkStr(pattern);pattern=$escRegx(pattern);
pattern=new REGX(pattern,"g")}return source["replace"](pattern,"")}function _cutPatterns(source,patterns){var len;var i;len=patterns["length"];i=-1;while(++i<len)source=_cutPattern(source,patterns[i]);return source}function _deleteKey(source,key,useMatch){var pattern;if($is.void(useMatch))useMatch=$is.regx(key);if(!useMatch){if($own(source,key))delete source[key];return source}pattern=key;for(key in source)if($own(source,key)&&$match(key,pattern))delete source[key];return source}function _deleteKeys(source,
keys){var useMatch;var len;var i;useMatch=$is.regx(keys[0]);len=keys["length"];i=-1;while(++i<len)source=_deleteKey(source,keys[i],useMatch);return source}function _deleteVal(source,val){var key;for(key in source)if($own(source,key)&&source[key]===val)delete source[key];return source}function _deleteValByType(source,type){var key;for(key in source)if($own(source,key)&&is(type,source[key]))delete source[key];return source}function _deleteVals(source,vals){var len;var i;len=vals["length"];i=-1;while(++i<
len)source=_deleteVal(source,vals[i]);return source}function _spliceKey(source,key){var len;len=source["length"];if(key<0)key+=len;if(key<0||key>=len)return source;source["splice"](key,1);return source}function _spliceKeys(source,keys){var first;var count;var i;if(!source["length"]||!keys["length"])return source;if(keys["length"]===1)return _spliceKey(source,keys[0]);var sorted=_sortIndexes(keys,source["length"]);i=sorted.first["length"];while(i--){first=sorted.first[i];count=sorted.last[i]-first+
1;source["splice"](first,count)}return source}function _spliceVal(source,val){var i;i=source["length"];while(i--)if(source[i]===val)source["splice"](i,1);return source}function _spliceValByType(source,type){var i;i=source["length"];while(i--)if(is(type,source[i]))source["splice"](i,1);return source}function _spliceVals(source,vals){var val;var len;var ii;var i;len=vals["length"];i=source["length"];while(i--){val=source[i];ii=len;while(ii--)if(vals[ii]===val){source["splice"](i,1);break}}return source}
function _filterObj(source,filter,thisArg){var src;var key;if(!$is.void(thisArg))filter=_bind(filter,thisArg);src=filter["length"]>2?$is.fun(source)?$cloneFun(source):$cloneObj(source):source;switch(filter["length"]){case 0:for(key in src)if($own(src,key)&&!filter())delete source[key];break;case 1:for(key in src)if($own(src,key)&&!filter(src[key]))delete source[key];break;case 2:for(key in src)if($own(src,key)&&!filter(src[key],key))delete source[key];break;default:for(key in src)if($own(src,key)&&
!filter(src[key],key,src))delete source[key];break}return source}function _filterArr(source,filter,thisArg){var src;var i;if(!$is.void(thisArg))filter=_bind(filter,thisArg);src=filter["length"]>2?$cloneArr(source):source;i=src["length"];switch(filter["length"]){case 0:while(i--)if(!filter())source["splice"](i,1);break;case 1:while(i--)if(!filter(src[i]))source["splice"](i,1);break;case 2:while(i--)if(!filter(src[i],i))source["splice"](i,1);break;default:while(i--)if(!filter(src[i],i,src))source["splice"](i,
1);break}return source}var _sortIndexes=function(){function sortIndexes(indexes,sourceLen){setup();run(indexes,sourceLen);return result()}var $first;var $last;function setup(){$first=[];$last=[]}function run(indexes,sourceLen){var index;var len;var i;len=indexes["length"];i=0;index=parse(indexes[i],sourceLen);while(index===-1&&++i<len)index=parse(indexes[i],sourceLen);push(index);while(++i<len){index=parse(indexes[i],sourceLen);if(index!==-1)sort(index,0,$last["length"])}}function result(){var SORTED_INDEXES=
{first:$first,last:$last};return SORTED_INDEXES}function parse(index,len){if(index<0)index+=len;return index<0||index>=len?-1:index}function push(index){$first["push"](index);$last["push"](index)}function unshift(index){$first["unshift"](index);$last["unshift"](index)}function insert(index,pos){$first["splice"](pos,0,index);$last["splice"](pos,0,index)}function remove(pos){$first["splice"](pos,1);$last["splice"](pos,1)}function sort(index,left,right){var mid;var min;mid=left+right>>>1;min=$first[mid];
if(index<min)comparePrev(index,left,mid);else if(index>$last[mid])compareNext(index,mid,right)}function comparePrev(index,left,mid){var prev;var min;var max;min=$first[mid];if(!mid){if(index===--min)$first[mid]=index;else unshift(index);return}prev=mid-1;max=$last[prev];if(index===--min)if(index===++max){$last[prev]=$last[mid];remove(mid)}else $first[mid]=index;else if(index>max)if(index===++max)$last[prev]=index;else insert(index,mid);else sort(index,left,prev)}function compareNext(index,mid,right){var next;
var min;var max;next=mid+1;max=$last[mid];if(next===$last["length"]){if(index===++max)$last[mid]=index;else push(index);return}min=$first[next];if(index===++max)if(index===--min){$last[mid]=$last[next];remove(next)}else $last[mid]=index;else if(index<min)if(index===--min)$first[next]=index;else insert(index,next);else sort(index,next,right)}return sortIndexes}();function _bind(func,thisArg){switch(func["length"]){case 0:return function filter(){return func["call"](thisArg)};case 1:return function filter(val){return func["call"](thisArg,
val)};case 2:return function filter(val,key){return func["call"](thisArg,val,key)}}return function filter(val,key,obj){return func["call"](thisArg,val,key,obj)}}function _isIntArr(vals){var propVal;var len;var i;len=vals["length"];i=-1;while(++i<len){propVal=vals[i];if(!$is.num(propVal)||!$is.whole(propVal))return NO}return YES}function _isNumArr(val){var len;var i;if(!$is.arr(val))return NO;len=val["length"];i=-1;while(++i<len)if(!$is.num(val[i]))return NO;return YES}function _isWholeNumArr(nums){var len;
var i;len=nums["length"];i=-1;while(++i<len)if(!$is.whole(nums[i]))return NO;return YES}var _MK_ERR=$mkErrs("cut");var _mkErr=_MK_ERR.error;var _mkTypeErr=_MK_ERR.typeError;var _mkRangeErr=_MK_ERR.rangeError;return cut}();var vitals=cut;vitals["cut"]=cut;vitals["VERSION"]=VERSION;module.exports=vitals})(this);