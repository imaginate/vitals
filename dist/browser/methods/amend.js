/* vitals v5.0.0 (http://vitalsjs.com)
 * Copyright (c) 2014-2017 Adam A Smith <adam@imaginate.life>
 * The Apache License (http://vitalsjs.com/license) */
(function(H,g){function M(b){return a.b(b)?b:a.l(b)?b.toString():Q(b)}function U(a,z){for(var b in z)u(z,b)&&(a[b]=z[b]);return a}function J(a){var b;var c={};for(b in a)u(a,b)&&(c[b]=a[b]);return c}function B(a){if(!a)return[""];var b=K(a,", ")?", ":K(a,",")?",":K(a,"|")?"|":" ";return a.split(b)}var I=function(){function a(a){switch(a){case "object":case "function":return!0}return!1}function c(a){return!!a&&a.Object===Object}function g(a){return!!a&&(!("nodeType"in a)||!a.nodeType)}var u=a(typeof exports)&&
g(exports),C=a(typeof module)&&g(module),q=u&&C&&"object"===typeof global&&c(global),h=a(typeof window)&&c(window),n="function"===typeof define&&"amd"in define&&"object"===typeof define.amd,p=a(typeof self)&&c(self),D=a(typeof H)&&c(H),x=q?global:h&&window!==(H&&H.window)?window:p?self:D?H:Function("return this")();return{G:u,H:C,P:q,J:h,F:n,I:p,R:D,K:x}}(),G=I.K,n=G.Error,t=G.Object,R=t.prototype,Z=G.RangeError,S=G.RegExp,N=S.prototype,Q=G.String,O=Q.prototype,c=G.TypeError,A=function(){var a=R.toString;
return function(c){return a.call(c)}}(),u=function(){var a=R.hasOwnProperty;return function(c,b){return a.call(c,b)}}(),a=function(){function a(a){return"number"===typeof a&&a===a&&isFinite(a)}function c(a){return!!a&&"object"===typeof a}function n(a){return!!a&&"function"===typeof a}function W(a){return c(a)&&"[object Array]"===A(a)}function C(a){return p.test(a)}var q=function(){var a=function(){return"[object Arguments]"===A(arguments)}(),c=function(){try{"callee"in{}}catch(aa){return!1}return"callee"in
arguments}();return{B:a,A:c}}(),h=q.B?function(a){return c(a)&&"[object Arguments]"===A(a)}:q.A?function(a){return c(a)&&"callee"in a}:function(){return!1};q=q.B?function(a){if(!c(a))return!1;switch(A(a)){case "[object Array]":case "[object Arguments]":return!0;default:return!1}}:q.A?function(a){return c(a)&&("[object Array]"===A(a)||"callee"in a)}:function(a){return c(a)&&"[object Array]"===A(a)};var Y=/^(?:cr|lf|crlf)$/i,p=function(){var a="img";"sticky"in N&&(a+="y");"unicode"in N&&(a+="u");var c=
"^(?:[\\+\\-]["+a+"\\+\\-]*|["+a+"]*)$";var e=new S(c);e.w=a;e.C="/"+c+"/";return e}();C.w=p.w;C.C=p.C;var D=function(){if(!("isExtensible"in t&&n(t.isExtensible)))return function(){return!1};var a=t.isExtensible;try{return a(function(){}),a}catch(w){return function(l){return"object"===typeof l&&a(l)}}}(),x=function(){if(!("isFrozen"in t&&n(t.isFrozen)))return function(){return!1};var a=t.isFrozen;try{return a(function(){}),a}catch(w){return function(l){return"object"===typeof l&&a(l)}}}(),e=function(){if(!("isSealed"in
t&&n(t.isSealed)))return function(){return!1};var a=t.isSealed;try{return a(function(){}),a}catch(w){return function(l){return"object"===typeof l&&a(l)}}}();return{i:function(a){return null===a},g:function(a){return a===g},h:function(a){return"boolean"===typeof a},b:function(a){return"string"===typeof a},T:function(a){return!!a&&"string"===typeof a},v:a,S:function(a){return!!a&&"number"===typeof a&&a===a&&isFinite(a)},j:function(a){return a!==a},a:c,M:function(a){if(!a)return!1;switch(typeof a){case "object":case "function":return!0;
default:return!1}},c:n,f:W,L:q,N:h,l:function(a){return c(a)&&"[object RegExp]"===A(a)},m:function(a){return c(a)&&"[object Date]"===A(a)},u:function(a){return c(a)&&"[object Error]"===A(a)},o:function(a){return c(a)&&"nodeType"in a&&9===a.nodeType},s:function(a){return c(a)&&"nodeType"in a&&1===a.nodeType},U:function(c){if(W(c))return!0;c=c.length;return a(c)&&!(c%1)&&0<=c},empty:function(a){var c;if(!a)return!0;if("function"===typeof a)return 0===a.length;if("object"!==typeof a)return!1;if("[object Array]"===
A(a))return 0===a.length;for(c in a)if(u(a,c))return!1;return!0},V:function(a){return Y.test(a)},X:C,extend:D,Y:x,ba:e,ca:function(a){return!(a%1)},$:function(a){return!!(a%2)},W:function(a){return!(a%2)}}}(),P=function(){function c(b,q){q=q||0;if(a.M(b))if(a.l(b))var h=b.toString();else{var z=q;a.c(b)?(h="Function",b.name&&(h+="("+b.name+")")):(h=A(b),h=n.test(h)?h.replace(n,"$1"):"UnknownObjectType");h+=": ";if(a.L(b)){var p=z;var D;var x=b.length;if(1>x)p="[]";else{var e=g(p);p+=1;z="[\n";for(D=
-1;++D<x;)z+=e+D+": ",z+=c(b[D],p)+",\n";z=z.replace(t,"\n");p=z+"]"}}else{b:{for(e in b)if(u(b,e)){e=!1;break b}e=!0}if(e)p="{}";else{x=g(z);z+=1;e="{\n";for(p in b)u(b,p)&&(e+=x,e+="'"+M(p)+"': ",e+=c(b[p],z)+",\n");e=e.replace(t,"\n");p=e+"}"}}h+=p}else a.h(b)?h=b?"true":"false":a.i(b)?h="null":a.g(b)?h="undefined":a.j(b)?h="NaN":a.b(b)?(h=b.replace(/\\/g,"\\\\"),h=h.replace(/\n/g,"\\n"),h=h.replace(/\r/g,"\\r"),h=h.replace(/\t/g,"\\t"),h=h.replace(/\v/g,"\\v"),h=h.replace(/\0/g,"\\0"),h=h.replace(/\b/g,
"\\b"),h=h.replace(/\f/g,"\\f"),h='"'+h+'"'):h=M(b);return h}function g(a){var c;if(1>c)return"";for(c="";a--;)c+="    ";return c}var n=/^\[object ([a-zA-Z0-9_\$]+)\]$/,t=/,\n$/;return c}();(function(){var c=function(){function c(){}return"create"in t&&a.c(t.create)?t.create:function(a){c.prototype=a;a=new c;c.prototype=null;return a}}();return function(a){return c(a)}})();var X=function(){function c(c){if(a.g(c))return"newVitals";c=c.replace(t,"");return"vitals."+c}function g(a){if(!a)return"";if(q.test(a))return a.replace(q,
"");a=a.replace(u,"");return"#"+a}function n(a,c,b,g){a.__vitals=!0;a.vitals=!0;a.name=c;switch(c){case "TypeError":a.__type=!0;a.type=!0;break;case "RangeError":a.__range=!0,a.range=!0}a.message=b;a.msg=b;3<arguments.length&&(a.value=g,a.val=g);return a}var u=/^#/,t=/^vitals\./,q=/^\!/;return function(b){function h(a){a=a?p:p+"."+a;return"`"+a+"`"}var p=c(b);return{error:function(a,c,e){e=h(e);return n(a,"Error",c+(" for "+e+" call"))},D:function(a,c,e,b,w){w=h(w);c=g(c);var l=P(e);b="invalid "+
c+" data type for "+w+" call\n"+("valid data types: `"+b+"`\n")+("actual "+c+" value: `"+l+"`");return n(a,"TypeError",b,e)},O:function(c,b,e,l){l=h(l);b="out-of-range "+g(b)+" for "+l+" call";if(a.b(e))b+="\nvalid range: `"+e+"`";else if(a.f(e)){var w;l="";var p=e.length;for(w=-1;++w<p;)l+="\n- `"+P(e[w])+"`";b+="\nvalid options:"+l}return n(c,"RangeError",b)}}}}(),K=function(){return"includes"in O&&a.c(O.includes)?function(a,c){return a.includes(c)}:function(a,c){return-1!==a.indexOf(c)}}(),E=function(){function b(a,
c,b){var e;for(e=a.length;e--;)if(a[e](c,b))return!0;return!1}var t=function(){function c(a,c,g){for(var e in c)u(c,e)&&b(a,e,c[e],g)}function b(c,l,w,h){u(b,c)&&(w=b[c](w));h=!1!==h;g["_"+l]=function(c,b){a.h(b)||(b=h);return a.i(c)?b:w(c)}}var g={};b.arrays=function(c){return function(b){var e;if(!a.f(b))return!1;for(e=b.length;e--;)if(!c(b[e]))return!1;return!0}};b.maps=function(c){return function(b){var e;if(!a.a(b))return!1;for(e in b)if(u(b,e)&&!c(b[e]))return!1;return!0}};c("primitives",{undefined:a.g,
"boolean":a.h,string:a.b,number:a.v,nan:a.j},!1);b("primitives","null",a.i);c("js_objects",{object:a.a,regexp:a.l,array:a.f,error:a.u,date:a.m});b("js_objects","arguments",a.N);b("js_objects","function",a.c,!1);c("dom_objects",{element:a.s,document:a.o});b("others","empty",a.empty);c("arrays",{undefineds:a.g,nulls:a.i,booleans:a.h,strings:a.b,numbers:a.v,nans:a.j,objects:a.a,functions:a.c,regexps:a.l,arrays:a.f,dates:a.m,errors:a.u,elements:a.s,documents:a.o});c("maps",{undefinedmap:a.g,nullmap:a.i,
booleanmap:a.h,stringmap:a.b,numbermap:a.v,nanmap:a.j,objectmap:a.a,functionmap:a.Z,regexpmap:a.aa,arraymap:a.f,datemap:a.m,errormap:a.u,elementmap:a.s,documentmap:a.o});(function(a){for(b in a)if(u(a,b)){var c="_"+a[b];var b="_"+b;g[b]=g[c]}})({nil:"null",bool:"boolean",str:"string",num:"number","void":"undefined",obj:"object",func:"function",fun:"function",fn:"function",regex:"regexp",regx:"regexp",re:"regexp",arr:"array",err:"error",args:"arguments",elem:"element",doc:"document",undefinedes:"undefineds",
voids:"undefineds",nils:"nulls",strs:"strings",nums:"numbers",bools:"booleans",objs:"objects",funcs:"functions",funs:"functions",fns:"functions",regexes:"regexps",regexs:"regexps",res:"regexps",arrs:"arrays",errs:"errors",elems:"elements",docs:"documents",voidmap:"undefinedmap",nilmap:"nullmap",strmap:"stringmap",nummap:"numbermap",boolmap:"booleanmap",objmap:"objectmap",funcmap:"functionmap",funmap:"functionmap",fnmap:"functionmap",regexmap:"regexpmap",regxmap:"regexpmap",remap:"regexpmap",arrmap:"arraymap",
errmap:"errormap",elemmap:"elementmap",docmap:"documentmap"});return g}(),B=/[^a-z\|]/g,A=function(){var a=/\|/,c=/\!/,b=/\?/,e=/\=/,g=/\*|any/;return{"|":function(c){return a.test(c)},"!":function(a){return c.test(a)},"?":function(a){return b.test(a)},"\x3d":function(a){return e.test(a)},"*":function(a){return g.test(a)}}}(),C=X("is"),q=C.error,h=C.D,E=C.O;return function(p,z){switch(arguments.length){case 0:throw q(new n,"no #types defined");case 1:throw q(new n,"no #val defined");case 2:var x=
!1;break;default:x=!0}if(!a.b(p))throw h(new c,"types",p,"string");if(!p)throw q(new n,"invalid empty #types `string`");if(A["*"](p))return!0;a:{var e=p;var l;A["\x3d"](e)&&(e+="|undefined");e=e.toLowerCase();e=e.replace(B,"");e=e.split("|");for(l=e.length;l--;){var w="_"+e[l];if(!u(t,w)){w=null;break a}e[l]=t[w]}w=e.length?e:null}if(!w)throw E(new Z,"types","https://github.com/imaginate/vitals/wiki/vitals.is-types");l=p;e=A["?"](l);l=A["!"](l);e=(e&&l?0:e||l)?!l&&e:g;if(x)a:{x=w;w=arguments;for(l=
w.length;--l;)if(!b(x,w[l],e)){x=!1;break a}x=!0}else x=b(w,z,e);return x}}(),F=function(){function b(r,d,m,f,b,e){var v;switch(arguments.length){case 0:throw y(new n,"no #source defined");case 1:throw y(new n,"no #props defined");case 2:if(!a.a(r))throw k(new c,"source",r,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");if(a.f(d))throw y(new n,"no #val defined");return q(r,d,g,g,g);case 3:if(!a.a(r))throw k(new c,"source",r,"!Object");
a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");if(v=a.f(d))return h(r,d,m,g,g,g);f=m;e=b=g;a.b(f)?(b=f,f=g):a.c(f)&&(e=f,f=g);break;case 4:if(!a.a(r))throw k(new c,"source",r,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");(v=a.f(d))?a.b(f)?(b=f,f=g):a.c(f)&&(e=f,f=g):(b=f,f=m,e=g,a.c(b)&&(e=b,b=g,a.b(f)&&(b=f,f=g)));break;case 5:if(!a.a(r))throw k(new c,"source",r,"!Object");
a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");(v=a.f(d))?a.c(b)&&(e=b,b=g,a.b(f)&&(b=f,f=g)):(e=b,b=f,f=m);break;default:if(!a.a(r))throw k(new c,"source",r,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");v=a.f(d);v||(e=b,b=f,f=m)}if(!a.g(f)&&!a.a(f))throw k(new c,"descriptor",f,"!Object\x3d");if(!a.g(b)&&!a.b(b))throw k(new c,"strongType",b,"string\x3d");if(!a.g(e)&&
!a.c(e))throw k(new c,"setter",e,"(!function(*, *): *)\x3d");if(b)if(v){if(!E(b+"\x3d",m))throw k(new c,"val",m,b+"\x3d");}else if(!K(b,d))throw k(new c,"props property value",d,b);return v?h(r,d,m,f,b,e):q(r,d,f,b,e)}function z(b,d,m,f,v,h){switch(arguments.length){case 0:throw y(new n,"no #source defined","property");case 1:throw y(new n,"no #key defined","property");case 2:throw y(new n,"no #val or #descriptor defined","property");case 3:x(m)&&(f=m,m=f.value);break;case 4:a.b(f)?(v=f,f=g):a.c(f)&&
(h=f,f=g);x(m)&&(f=m,m=f.value);break;case 5:a.c(v)&&(h=v,v=g,a.b(f)&&(v=f,f=g)),x(m)&&(f=m,m=f.value)}if(!a.a(b))throw k(new c,"source",b,"!Object","property");if(!a.b(d))throw k(new c,"key",d,"string","property");if(!a.g(f)&&!a.a(f))throw k(new c,"descriptor",f,"!Object\x3d","property");if(!a.g(v)&&!a.b(v))throw k(new c,"strongType",v,"string\x3d","property");if(!a.g(h)&&!a.c(h))throw k(new c,"setter",h,"(!function(*, *): *)\x3d","property");if(v&&!E(v+"\x3d",m))throw k(new c,"val",m,v+"\x3d","property");
if(f&&(v||h)&&u(f,"writable"))throw y(new n,"invalid data #descriptor used with defined #strongType or #setter","property");var r=m,t=v,V=h;var q=l(f||null,!!t||!!V);q=(t=w(t))||V?p(r,q,t,V):e(q)?J(q):G(r,q);return O(b,d,q)}function A(b,d,m){switch(arguments.length){case 0:throw y(new n,"no #source defined","property.config");case 1:throw y(new n,"no #key defined","property.config");case 2:throw y(new n,"no #descriptor defined","property.config");}if(!a.a(b))throw k(new c,"source",b,"!Object","property.config");
if(!a.b(d))throw k(new c,"key",d,"string","property.config");if(!a.a(m))throw k(new c,"descriptor",m,"!Object","property.config");if(!u(b,d))throw y(new n,"undefined #key name in #source","property.config");return O(b,d,m)}function F(b,d,m,f,e,l){var r;switch(arguments.length){case 0:throw y(new n,"no #source defined","properties");case 1:throw y(new n,"no #props defined","properties");case 2:if(!a.a(b))throw k(new c,"source",b,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",
d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");if(a.f(d))throw y(new n,"no #val defined","properties");return q(b,d,g,g,g);case 3:if(!a.a(b))throw k(new c,"source",b,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");if(r=a.f(d))return h(b,d,m,g,g,g);f=m;l=e=g;a.b(f)?(e=f,f=g):a.c(f)&&(l=f,f=g);break;case 4:if(!a.a(b))throw k(new c,"source",b,"!Object","properties");a.b(d)&&(d=B(d));
if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");(r=a.f(d))?a.b(f)?(e=f,f=g):a.c(f)&&(l=f,f=g):(e=f,f=m,l=g,a.c(e)&&(l=e,e=g,a.b(f)&&(e=f,f=g)));break;case 5:if(!a.a(b))throw k(new c,"source",b,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");(r=a.f(d))?a.c(e)&&(l=e,e=g,a.b(f)&&(e=f,f=g)):(l=e,e=f,f=m);break;default:if(!a.a(b))throw k(new c,"source",
b,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");r=a.f(d);r||(l=e,e=f,f=m)}if(!a.g(f)&&!a.a(f))throw k(new c,"descriptor",f,"!Object\x3d","properties");if(!a.g(e)&&!a.b(e))throw k(new c,"strongType",e,"string\x3d","properties");if(!a.g(l)&&!a.c(l))throw k(new c,"setter",l,"(!function(*, *): *)\x3d","properties");if(e)if(r){if(!E(e+"\x3d",m))throw k(new c,"val",m,e+"\x3d","properties");}else if(!K(e,d))throw k(new c,
"props property value",d,e,"properties");return r?h(b,d,m,f,e,l):q(b,d,f,e,l)}function C(b,d,e){switch(arguments.length){case 0:throw y(new n,"no #source defined","properties.config");case 1:throw y(new n,"no #props defined","properties.config");case 2:if(!a.a(b))throw k(new c,"source",b,"!Object","properties.config");a.b(d)&&(d=B(d));if(a.f(d))throw y(new n,"no #descriptor defined","properties.config");if(!E("!objMap",d))throw k(new c,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string",
"properties.config");if(!T(b,d))throw y(new n,"at least one property key name in the #props did not exist in the #source","properties.config");return L(b,d);default:if(!a.a(b))throw k(new c,"source",b,"!Object","properties.config");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","properties.config");if(a.f(d)){if(!a.a(e))throw k(new c,"descriptor",e,"!Object\x3d","properties.config");d=H(d,e)}else if(!E("!objMap",d))throw k(new c,"props",
d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","properties.config");if(!T(b,d))throw y(new n,"at least one property key name in the #props did not exist in the #source","properties.config");return L(b,d)}}function q(a,d,b,c,g){b=l(b||null,!!c||!!g);if((c=w(c))||g){var f=d;d={};for(q in f)if(u(f,q)){var m=d,r=q;a:{var h=f[q];var k=c,n=g;var v=J(b);if(x(h)){v=U(v,h);if(u(v,"writable")||e(v)){h=v;break a}h=v.value;var p=void 0,t=v;v={};for(p in t)u(t,p)&&"value"!==p&&(v[p]=t[p])}h=v=
D(h,v,k,n)}m[r]=h}g=d}else{g=d;var q=b;b={};for(f in g)u(g,f)&&(c=b,d=f,r=g[f],m=J(q),r=x(r)?r:{value:r},m=U(m,r),c[d]=m);g=b}return L(a,g)}function h(a,d,b,c,e,g){c=l(c||null,!!e||!!g);if((e=w(e))||g){var f;var r={};var m=d.length;for(f=-1;++f<m;)r[d[f]]=p(b,c,e,g);b=r}else b=I(d,b,c);return L(a,b)}function G(a,b){var d=J(b);d.value=a;return d}function p(a,b,c,e){b=J(b);return b=D(a,b,c,e)}function D(a,b,e,f){b.get=function(){return a};b.set=e&&f?function(b){if(!e(b))throw M(new c,"invalid data type for property value: `"+
b+"`");a=f(b,a)}:e?function(b){if(!e(b))throw M(new c,"invalid data type for property value: `"+b+"`");a=b}:function(b){a=f(b,a)};return b}function x(b){var d;if(!a.a(b))return!1;for(d in b)if(u(b,d)&&!u(S,d))return!1;return!0}function e(b){return a.a(b)&&(u(b,"get")||u(b,"set"))}function l(b,d){var c;if(c=d)c=b,c=a.a(c)&&(u(c,"value")||u(c,"writable"));c&&(c={},a.h(b.enumerable)&&(c.enumerable=b.enumerable),a.h(b.configurable)&&(c.configurable=b.configurable),b=c);c=d||e(b)?R:Q;c=J(c);return U(c,
b)}function w(a){return a&&function(b){return E(a,b)}}function I(a,b,c){var d;var g=e(c)?function(a,b){return J(b)}:G;var m={};var r=a.length;for(d=-1;++d<r;)m[a[d]]=g(b,c);return m}function H(a,b){var c;var d={};var e=a.length;for(c=-1;++c<e;)d[a[c]]=b;return d}function T(a,b){for(var c in b)if(u(b,c)&&!u(a,c))return!1;return!0}function K(a,b){var c;a+="\x3d";for(c in b)if(u(b,c)){var d=b[c];if(x(d)){if(u(d,"writable"))continue;d=d.value}if(!E(a,d))return!1}return!0}function M(a,b){a.__setter=!0;
a.setter=!0;a.__type=!0;a.type=!0;a.name="TypeError";a.message=b;a.msg=b;return a}b.config=function(b,d,e){switch(arguments.length){case 0:throw y(new n,"no #source defined","config");case 1:throw y(new n,"no #props defined","config");case 2:if(!a.a(b))throw k(new c,"source",b,"!Object","config");a.b(d)&&(d=B(d));if(a.f(d))throw y(new n,"no #descriptor defined","config");if(!E("!objMap",d))throw k(new c,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(!T(b,d))throw y(new n,
"at least one property key name in the #props did not exist in the #source","config");return L(b,d);default:if(!a.a(b))throw k(new c,"source",b,"!Object","config");a.b(d)&&(d=B(d));if(!a.a(d))throw k(new c,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(a.f(d)){if(!a.a(e))throw k(new c,"descriptor",e,"!Object\x3d","config");d=H(d,e)}else if(!E("!objMap",d))throw k(new c,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(!T(b,d))throw y(new n,
"at least one property key name in the #props did not exist in the #source","config");return L(b,d)}};b.property=z;b.prop=z;b.property.config=A;b.prop.config=A;b.properties=F;b.props=F;b.properties.config=C;b.props.config=C;var Q={writable:!0,enumerable:!0,configurable:!0},R={enumerable:!0,configurable:!0},S={get:!0,set:!0,value:!0,writable:!0,enumerable:!0,configurable:!0},N=function(){var b;var c="defineProperties";if(!(c in t&&a.c(t[c])))return!1;c="defineProperty";if(!(c in t&&a.c(t[c])))return!1;
var e={};var f={};f.value=e;f.enumerable=!1;try{for(b in t[c](e,"key",f),e)if("key"===b)return!1}catch(v){return!1}return e.key===e}(),O=function(){return N?t.defineProperty:function(a,b,c){a[b]=u(c,"get")?c.get():c.value;return a}}(),L=function(){return N?t.defineProperties:function(a,b){var c;for(c in b)if(u(b,c)){var d=b[c];a[c]=u(d,"get")?d.get():d.value}return a}}(),P=X("amend"),y=P.error,k=P.D;return b}();F.amend=F;F.VERSION="5.0.0";(function(){function a(a){a.vitals=F;a.Vitals=F;a.VITALS=F}
I.J&&a(window);I.I&&a(self);a(G);I.G&&I.H&&(module.exports===exports?module.exports=F:a(exports));I.F&&define(function(){return F})})()})(this);