/* vitals v5.0.0 (http://vitalsjs.com)
 * Copyright (c) 2014-2017 Adam A Smith <adam@imaginate.life>
 * The Apache License (http://vitalsjs.com/license) */
(function(I,l){function N(c){return a.b(c)?c:a.l(c)?c.toString():R(c)}function U(a,h){for(var c in h)v(h,c)&&(a[c]=h[c]);return a}function K(a){var h;var c={};for(h in a)v(a,h)&&(c[h]=a[h]);return c}function S(c){var h,b,l;var f=c.length;a.g(h)&&(h=0);a.g(b)&&(b=f);0>h&&(h+=f);0>h&&(h=0);b>f?b=f:0>b&&(b+=f);if(h>=b)return[];f=new Z(b-h);--h;for(l=0;++h<b;)f[l++]=c[h];return f}function B(a){if(!a)return[""];var h=L(a,", ")?", ":L(a,",")?",":L(a,"|")?"|":" ";return a.split(h)}var J=function(){function a(a){switch(a){case "object":case "function":return!0}return!1}
function h(a){return!!a&&a.Object===Object}function b(a){return!!a&&(!("nodeType"in a)||!a.nodeType)}var l=a(typeof exports)&&b(exports),f=a(typeof module)&&b(module),t=l&&f&&"object"===typeof global&&h(global),k=a(typeof window)&&h(window),v="function"===typeof define&&"amd"in define&&"object"===typeof define.amd,y=a(typeof self)&&h(self),D=a(typeof I)&&h(I),x=t?global:k&&window!==(I&&I.window)?window:y?self:D?I:Function("return this")();return{G:l,H:f,P:t,J:k,F:v,I:y,R:D,K:x}}(),E=J.K,Z=E.Array,
p=E.Error,z=E.Object,T=z.prototype,ba=E.RangeError,O=E.RegExp,P=O.prototype,R=E.String,Q=R.prototype,b=E.TypeError,C=function(){var a=T.toString;return function(h){return a.call(h)}}(),v=function(){var a=T.hasOwnProperty;return function(h,b){return a.call(h,b)}}(),a=function(){function a(a){return"number"===typeof a&&a===a&&isFinite(a)}function b(a){return!!a&&"object"===typeof a}function p(a){return!!a&&"function"===typeof a}function W(a){return b(a)&&"[object Array]"===C(a)}function f(a){return y.test(a)}
var t=function(){var a=function(){return"[object Arguments]"===C(arguments)}(),b=function(){try{"callee"in{}}catch(ca){return!1}return"callee"in arguments}();return{C:a,B:b}}(),k=t.C?function(a){return b(a)&&"[object Arguments]"===C(a)}:t.B?function(a){return b(a)&&"callee"in a}:function(){return!1};t=t.C?function(a){if(!b(a))return!1;switch(C(a)){case "[object Array]":case "[object Arguments]":return!0;default:return!1}}:t.B?function(a){return b(a)&&("[object Array]"===C(a)||"callee"in a)}:function(a){return b(a)&&
"[object Array]"===C(a)};var aa=/^(?:cr|lf|crlf)$/i,y=function(){var a="img";"sticky"in P&&(a+="y");"unicode"in P&&(a+="u");var b="^(?:[\\+\\-]["+a+"\\+\\-]*|["+a+"]*)$";var e=new O(b);e.A=a;e.D="/"+b+"/";return e}();f.A=y.A;f.D=y.D;var D=function(){if(!("isExtensible"in z&&p(z.isExtensible)))return function(){return!1};var a=z.isExtensible;try{return a(function(){}),a}catch(w){return function(u){return"object"===typeof u&&a(u)}}}(),x=function(){if(!("isFrozen"in z&&p(z.isFrozen)))return function(){return!1};
var a=z.isFrozen;try{return a(function(){}),a}catch(w){return function(u){return"object"===typeof u&&a(u)}}}(),e=function(){if(!("isSealed"in z&&p(z.isSealed)))return function(){return!1};var a=z.isSealed;try{return a(function(){}),a}catch(w){return function(u){return"object"===typeof u&&a(u)}}}();return{h:function(a){return null===a},g:function(a){return a===l},i:function(a){return"boolean"===typeof a},b:function(a){return"string"===typeof a},T:function(a){return!!a&&"string"===typeof a},v:a,S:function(a){return!!a&&
"number"===typeof a&&a===a&&isFinite(a)},j:function(a){return a!==a},a:b,M:function(a){if(!a)return!1;switch(typeof a){case "object":case "function":return!0;default:return!1}},c:p,f:W,L:t,N:k,l:function(a){return b(a)&&"[object RegExp]"===C(a)},m:function(a){return b(a)&&"[object Date]"===C(a)},u:function(a){return b(a)&&"[object Error]"===C(a)},o:function(a){return b(a)&&"nodeType"in a&&9===a.nodeType},s:function(a){return b(a)&&"nodeType"in a&&1===a.nodeType},U:function(b){if(W(b))return!0;b=b.length;
return a(b)&&!(b%1)&&0<=b},empty:function(a){var b;if(!a)return!0;if("function"===typeof a)return 0===a.length;if("object"!==typeof a)return!1;if("[object Array]"===C(a))return 0===a.length;for(b in a)if(v(a,b))return!1;return!0},V:function(a){return aa.test(a)},X:f,extend:D,Y:x,ba:e,ca:function(a){return!(a%1)},$:function(a){return!!(a%2)},W:function(a){return!(a%2)}}}(),X=function(){function b(f,t){t=t||0;if(a.M(f))if(a.l(f))var k=f.toString();else{var c=t;a.c(f)?(k="Function",f.name&&(k+="("+f.name+
")")):(k=C(f),k=l.test(k)?k.replace(l,"$1"):"UnknownObjectType");k+=": ";if(a.L(f)){var y=c;var D;var x=f.length;if(1>x)y="[]";else{var e=h(y);y+=1;c="[\n";for(D=-1;++D<x;)c+=e+D+": ",c+=b(f[D],y)+",\n";c=c.replace(p,"\n");y=c+"]"}}else{b:{for(e in f)if(v(f,e)){e=!1;break b}e=!0}if(e)y="{}";else{x=h(c);c+=1;e="{\n";for(y in f)v(f,y)&&(e+=x,e+="'"+N(y)+"': ",e+=b(f[y],c)+",\n");e=e.replace(p,"\n");y=e+"}"}}k+=y}else a.i(f)?k=f?"true":"false":a.h(f)?k="null":a.g(f)?k="undefined":a.j(f)?k="NaN":a.b(f)?
(k=f.replace(/\\/g,"\\\\"),k=k.replace(/\n/g,"\\n"),k=k.replace(/\r/g,"\\r"),k=k.replace(/\t/g,"\\t"),k=k.replace(/\v/g,"\\v"),k=k.replace(/\0/g,"\\0"),k=k.replace(/\b/g,"\\b"),k=k.replace(/\f/g,"\\f"),k='"'+k+'"'):k=N(f);return k}function h(a){var b;if(1>b)return"";for(b="";a--;)b+="    ";return b}var l=/^\[object ([a-zA-Z0-9_\$]+)\]$/,p=/,\n$/;return b}(),G=function(){var b=function(){function b(){}return"create"in z&&a.c(z.create)?z.create:function(a){b.prototype=a;a=new b;b.prototype=null;return a}}();
return function(a){return b(a)}}(),V=function(){function b(b){if(a.g(b))return"newVitals";b=b.replace(f,"");return"vitals."+b}function h(a){if(!a)return"";if(t.test(a))return a.replace(t,"");a=a.replace(p,"");return"#"+a}function l(a,b,h,c){a.__vitals=!0;a.vitals=!0;a.name=b;switch(b){case "TypeError":a.__type=!0;a.type=!0;break;case "RangeError":a.__range=!0,a.range=!0}a.message=h;a.msg=h;3<arguments.length&&(a.value=c,a.val=c);return a}var p=/^#/,f=/^vitals\./,t=/^\!/;return function(c){function f(a){a=
a?k:k+"."+a;return"`"+a+"`"}var k=b(c);return{error:function(a,b,e){e=f(e);return l(a,"Error",b+(" for "+e+" call"))},w:function(a,b,e,c,w){w=f(w);b=h(b);var u=X(e);c="invalid "+b+" data type for "+w+" call\n"+("valid data types: `"+c+"`\n")+("actual "+b+" value: `"+u+"`");return l(a,"TypeError",c,e)},O:function(b,c,e,u){u=f(u);c="out-of-range "+h(c)+" for "+u+" call";if(a.b(e))c+="\nvalid range: `"+e+"`";else if(a.f(e)){var w;u="";var k=e.length;for(w=-1;++w<k;)u+="\n- `"+X(e[w])+"`";c+="\nvalid options:"+
u}return l(b,"RangeError",c)}}}}(),L=function(){return"includes"in Q&&a.c(Q.includes)?function(a,b){return a.includes(b)}:function(a,b){return-1!==a.indexOf(b)}}(),H=function(){function c(a,b,c){var e;for(e=a.length;e--;)if(a[e](b,c))return!0;return!1}var h=function(){function b(a,b,f){for(var e in b)v(b,e)&&c(a,e,b[e],f)}function c(b,h,w,l){v(c,b)&&(w=c[b](w));l=!1!==l;f["_"+h]=function(b,e){a.i(e)||(e=l);return a.h(b)?e:w(b)}}var f={};c.arrays=function(b){return function(e){var c;if(!a.f(e))return!1;
for(c=e.length;c--;)if(!b(e[c]))return!1;return!0}};c.maps=function(b){return function(e){var c;if(!a.a(e))return!1;for(c in e)if(v(e,c)&&!b(e[c]))return!1;return!0}};b("primitives",{undefined:a.g,"boolean":a.i,string:a.b,number:a.v,nan:a.j},!1);c("primitives","null",a.h);b("js_objects",{object:a.a,regexp:a.l,array:a.f,error:a.u,date:a.m});c("js_objects","arguments",a.N);c("js_objects","function",a.c,!1);b("dom_objects",{element:a.s,document:a.o});c("others","empty",a.empty);b("arrays",{undefineds:a.g,
nulls:a.h,booleans:a.i,strings:a.b,numbers:a.v,nans:a.j,objects:a.a,functions:a.c,regexps:a.l,arrays:a.f,dates:a.m,errors:a.u,elements:a.s,documents:a.o});b("maps",{undefinedmap:a.g,nullmap:a.h,booleanmap:a.i,stringmap:a.b,numbermap:a.v,nanmap:a.j,objectmap:a.a,functionmap:a.Z,regexpmap:a.aa,arraymap:a.f,datemap:a.m,errormap:a.u,elementmap:a.s,documentmap:a.o});(function(a){for(e in a)if(v(a,e)){var b="_"+a[e];var e="_"+e;f[e]=f[b]}})({nil:"null",bool:"boolean",str:"string",num:"number","void":"undefined",
obj:"object",func:"function",fun:"function",fn:"function",regex:"regexp",regx:"regexp",re:"regexp",arr:"array",err:"error",args:"arguments",elem:"element",doc:"document",undefinedes:"undefineds",voids:"undefineds",nils:"nulls",strs:"strings",nums:"numbers",bools:"booleans",objs:"objects",funcs:"functions",funs:"functions",fns:"functions",regexes:"regexps",regexs:"regexps",res:"regexps",arrs:"arrays",errs:"errors",elems:"elements",docs:"documents",voidmap:"undefinedmap",nilmap:"nullmap",strmap:"stringmap",
nummap:"numbermap",boolmap:"booleanmap",objmap:"objectmap",funcmap:"functionmap",funmap:"functionmap",fnmap:"functionmap",regexmap:"regexpmap",regxmap:"regexpmap",remap:"regexpmap",arrmap:"arraymap",errmap:"errormap",elemmap:"elementmap",docmap:"documentmap"});return f}(),z=/[^a-z\|]/g,B=function(){var a=/\|/,b=/\!/,c=/\?/,e=/\=/,f=/\*|any/;return{"|":function(b){return a.test(b)},"!":function(a){return b.test(a)},"?":function(a){return c.test(a)},"\x3d":function(a){return e.test(a)},"*":function(a){return f.test(a)}}}(),
f=V("is"),t=f.error,k=f.w,C=f.O;return function(f,D){switch(arguments.length){case 0:throw t(new p,"no #types defined");case 1:throw t(new p,"no #val defined");case 2:var x=!1;break;default:x=!0}if(!a.b(f))throw k(new b,"types",f,"string");if(!f)throw t(new p,"invalid empty #types `string`");if(B["*"](f))return!0;a:{var e=f;var u;B["\x3d"](e)&&(e+="|undefined");e=e.toLowerCase();e=e.replace(z,"");e=e.split("|");for(u=e.length;u--;){var w="_"+e[u];if(!v(h,w)){w=null;break a}e[u]=h[w]}w=e.length?e:
null}if(!w)throw C(new ba,"types","https://github.com/imaginate/vitals/wiki/vitals.is-types");u=f;e=B["?"](u);u=B["!"](u);e=(e&&u?0:e||u)?!u&&e:l;if(x)a:{x=w;w=arguments;for(u=w.length;--u;)if(!c(x,w[u],e)){x=!1;break a}x=!0}else x=c(w,D,e);return x}}(),Y=function(){function c(n,d,q,g,r,e){var c;switch(arguments.length){case 0:throw A(new p,"no #source defined");case 1:throw A(new p,"no #props defined");case 2:if(!a.a(n))throw m(new b,"source",n,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,
"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");if(a.f(d))throw A(new p,"no #val defined");return t(n,d,l,l,l);case 3:if(!a.a(n))throw m(new b,"source",n,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");if(c=a.f(d))return k(n,d,q,l,l,l);g=q;e=r=l;a.b(g)?(r=g,g=l):a.c(g)&&(e=g,g=l);break;case 4:if(!a.a(n))throw m(new b,"source",n,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");
(c=a.f(d))?a.b(g)?(r=g,g=l):a.c(g)&&(e=g,g=l):(r=g,g=q,e=l,a.c(r)&&(e=r,r=l,a.b(g)&&(r=g,g=l)));break;case 5:if(!a.a(n))throw m(new b,"source",n,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");(c=a.f(d))?a.c(r)&&(e=r,r=l,a.b(g)&&(r=g,g=l)):(e=r,r=g,g=q);break;default:if(!a.a(n))throw m(new b,"source",n,"!Object");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string");c=a.f(d);
c||(e=r,r=g,g=q)}if(!a.g(g)&&!a.a(g))throw m(new b,"descriptor",g,"!Object\x3d");if(!a.g(r)&&!a.b(r))throw m(new b,"strongType",r,"string\x3d");if(!a.g(e)&&!a.c(e))throw m(new b,"setter",e,"(!function(*, *): *)\x3d");if(r)if(c){if(!H(r+"\x3d",q))throw m(new b,"val",q,r+"\x3d");}else if(!L(r,d))throw m(new b,"props property value",d,r);return c?k(n,d,q,g,r,e):t(n,d,g,r,e)}function h(n,d,q,g,r,c){switch(arguments.length){case 0:throw A(new p,"no #source defined","property");case 1:throw A(new p,"no #key defined",
"property");case 2:throw A(new p,"no #val or #descriptor defined","property");case 3:x(q)&&(g=q,q=g.value);break;case 4:a.b(g)?(r=g,g=l):a.c(g)&&(c=g,g=l);x(q)&&(g=q,q=g.value);break;case 5:a.c(r)&&(c=r,r=l,a.b(g)&&(r=g,g=l)),x(q)&&(g=q,q=g.value)}if(!a.a(n))throw m(new b,"source",n,"!Object","property");if(!a.b(d))throw m(new b,"key",d,"string","property");if(!a.g(g)&&!a.a(g))throw m(new b,"descriptor",g,"!Object\x3d","property");if(!a.g(r)&&!a.b(r))throw m(new b,"strongType",r,"string\x3d","property");
if(!a.g(c)&&!a.c(c))throw m(new b,"setter",c,"(!function(*, *): *)\x3d","property");if(r&&!H(r+"\x3d",q))throw m(new b,"val",q,r+"\x3d","property");if(g&&(r||c)&&v(g,"writable"))throw A(new p,"invalid data #descriptor used with defined #strongType or #setter","property");var f=q,h=r,k=c;var t=u(g||null,!!h||!!k);t=(h=w(h))||k?y(f,t,h,k):e(t)?K(t):F(f,t);return P(n,d,t)}function C(n,d,q){switch(arguments.length){case 0:throw A(new p,"no #source defined","property.config");case 1:throw A(new p,"no #key defined",
"property.config");case 2:throw A(new p,"no #descriptor defined","property.config");}if(!a.a(n))throw m(new b,"source",n,"!Object","property.config");if(!a.b(d))throw m(new b,"key",d,"string","property.config");if(!a.a(q))throw m(new b,"descriptor",q,"!Object","property.config");if(!v(n,d))throw A(new p,"undefined #key name in #source","property.config");return P(n,d,q)}function E(n,d,q,g,e,c){var f;switch(arguments.length){case 0:throw A(new p,"no #source defined","properties");case 1:throw A(new p,
"no #props defined","properties");case 2:if(!a.a(n))throw m(new b,"source",n,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");if(a.f(d))throw A(new p,"no #val defined","properties");return t(n,d,l,l,l);case 3:if(!a.a(n))throw m(new b,"source",n,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");if(f=a.f(d))return k(n,
d,q,l,l,l);g=q;c=e=l;a.b(g)?(e=g,g=l):a.c(g)&&(c=g,g=l);break;case 4:if(!a.a(n))throw m(new b,"source",n,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");(f=a.f(d))?a.b(g)?(e=g,g=l):a.c(g)&&(c=g,g=l):(e=g,g=q,c=l,a.c(e)&&(c=e,e=l,a.b(g)&&(e=g,g=l)));break;case 5:if(!a.a(n))throw m(new b,"source",n,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string",
"properties");(f=a.f(d))?a.c(e)&&(c=e,e=l,a.b(g)&&(e=g,g=l)):(c=e,e=g,g=q);break;default:if(!a.a(n))throw m(new b,"source",n,"!Object","properties");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, *\x3e|!Array\x3cstring\x3e|string","properties");f=a.f(d);f||(c=e,e=g,g=q)}if(!a.g(g)&&!a.a(g))throw m(new b,"descriptor",g,"!Object\x3d","properties");if(!a.g(e)&&!a.b(e))throw m(new b,"strongType",e,"string\x3d","properties");if(!a.g(c)&&!a.c(c))throw m(new b,"setter",c,"(!function(*, *): *)\x3d",
"properties");if(e)if(f){if(!H(e+"\x3d",q))throw m(new b,"val",q,e+"\x3d","properties");}else if(!L(e,d))throw m(new b,"props property value",d,e,"properties");return f?k(n,d,q,g,e,c):t(n,d,g,e,c)}function f(e,d,c){switch(arguments.length){case 0:throw A(new p,"no #source defined","properties.config");case 1:throw A(new p,"no #props defined","properties.config");case 2:if(!a.a(e))throw m(new b,"source",e,"!Object","properties.config");a.b(d)&&(d=B(d));if(a.f(d))throw A(new p,"no #descriptor defined",
"properties.config");if(!H("!objMap",d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","properties.config");if(!G(e,d))throw A(new p,"at least one property key name in the #props did not exist in the #source","properties.config");return M(e,d);default:if(!a.a(e))throw m(new b,"source",e,"!Object","properties.config");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","properties.config");if(a.f(d)){if(!a.a(c))throw m(new b,
"descriptor",c,"!Object\x3d","properties.config");d=I(d,c)}else if(!H("!objMap",d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","properties.config");if(!G(e,d))throw A(new p,"at least one property key name in the #props did not exist in the #source","properties.config");return M(e,d)}}function t(a,d,b,g,c){b=u(b||null,!!g||!!c);if((g=w(g))||c){var n=d;d={};for(p in n)if(v(n,p)){var q=d,f=p;a:{var h=n[p];var r=g,l=c;var k=K(b);if(x(h)){k=U(k,h);if(v(k,"writable")||
e(k)){h=k;break a}h=k.value;var m=void 0,t=k;k={};for(m in t)v(t,m)&&"value"!==m&&(k[m]=t[m])}h=k=D(h,k,r,l)}q[f]=h}c=d}else{c=d;var p=b;b={};for(n in c)v(c,n)&&(g=b,d=n,f=c[n],q=K(p),f=x(f)?f:{value:f},q=U(q,f),g[d]=q);c=b}return M(a,c)}function k(a,d,b,e,c,f){e=u(e||null,!!c||!!f);if((c=w(c))||f){var g;var n={};var q=d.length;for(g=-1;++g<q;)n[d[g]]=y(b,e,c,f);b=n}else b=J(d,b,e);return M(a,b)}function F(a,d){var b=K(d);b.value=a;return b}function y(a,b,e,c){b=K(b);return b=D(a,b,e,c)}function D(a,
d,e,c){d.get=function(){return a};d.set=e&&c?function(d){if(!e(d))throw N(new b,"invalid data type for property value: `"+d+"`");a=c(d,a)}:e?function(d){if(!e(d))throw N(new b,"invalid data type for property value: `"+d+"`");a=d}:function(b){a=c(b,a)};return d}function x(b){var d;if(!a.a(b))return!1;for(d in b)if(v(b,d)&&!v(T,d))return!1;return!0}function e(b){return a.a(b)&&(v(b,"get")||v(b,"set"))}function u(b,d){var c;if(c=d)c=b,c=a.a(c)&&(v(c,"value")||v(c,"writable"));c&&(c={},a.i(b.enumerable)&&
(c.enumerable=b.enumerable),a.i(b.configurable)&&(c.configurable=b.configurable),b=c);c=d||e(b)?S:R;c=K(c);return U(c,b)}function w(a){return a&&function(b){return H(a,b)}}function J(a,b,c){var d;var f=e(c)?function(a,b){return K(b)}:F;var n={};var q=a.length;for(d=-1;++d<q;)n[a[d]]=f(b,c);return n}function I(a,b){var d;var c={};var e=a.length;for(d=-1;++d<e;)c[a[d]]=b;return c}function G(a,b){for(var d in b)if(v(b,d)&&!v(a,d))return!1;return!0}function L(a,b){var d;a+="\x3d";for(d in b)if(v(b,d)){var c=
b[d];if(x(c)){if(v(c,"writable"))continue;c=c.value}if(!H(a,c))return!1}return!0}function N(a,b){a.__setter=!0;a.setter=!0;a.__type=!0;a.type=!0;a.name="TypeError";a.message=b;a.msg=b;return a}c.config=function(c,d,e){switch(arguments.length){case 0:throw A(new p,"no #source defined","config");case 1:throw A(new p,"no #props defined","config");case 2:if(!a.a(c))throw m(new b,"source",c,"!Object","config");a.b(d)&&(d=B(d));if(a.f(d))throw A(new p,"no #descriptor defined","config");if(!H("!objMap",
d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(!G(c,d))throw A(new p,"at least one property key name in the #props did not exist in the #source","config");return M(c,d);default:if(!a.a(c))throw m(new b,"source",c,"!Object","config");a.b(d)&&(d=B(d));if(!a.a(d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(a.f(d)){if(!a.a(e))throw m(new b,"descriptor",e,"!Object\x3d","config");d=I(d,e)}else if(!H("!objMap",
d))throw m(new b,"props",d,"!Object\x3cstring, !Object\x3e|!Array\x3cstring\x3e|string","config");if(!G(c,d))throw A(new p,"at least one property key name in the #props did not exist in the #source","config");return M(c,d)}};c.property=h;c.prop=h;c.property.config=C;c.prop.config=C;c.properties=E;c.props=E;c.properties.config=f;c.props.config=f;var R={writable:!0,enumerable:!0,configurable:!0},S={enumerable:!0,configurable:!0},T={get:!0,set:!0,value:!0,writable:!0,enumerable:!0,configurable:!0},O=
function(){var b;var d="defineProperties";if(!(d in z&&a.c(z[d])))return!1;d="defineProperty";if(!(d in z&&a.c(z[d])))return!1;var c={};var e={};e.value=c;e.enumerable=!1;try{for(b in z[d](c,"key",e),c)if("key"===b)return!1}catch(r){return!1}return c.key===c}(),P=function(){return O?z.defineProperty:function(a,b,c){a[b]=v(c,"get")?c.get():c.value;return a}}(),M=function(){return O?z.defineProperties:function(a,b){var c;for(c in b)if(v(b,c)){var d=b[c];a[c]=v(d,"get")?d.get():d.value}return a}}(),
Q=V("amend"),A=Q.error,m=Q.w;return c}(),F=function(){function c(c,h,l,y,z,x){switch(arguments.length){case 0:throw v(new p,"no #proto defined");case 1:if(!a.h(c)&&!a.a(c))throw f(new b,"proto",c,"?Object");return G(c);default:if(!a.h(c)&&!a.a(c))throw f(new b,"proto",c,"?Object");var e=S(arguments);e[0]=G(c);return Y.apply(null,e)}}function h(c,h,l,y,z,x){switch(arguments.length){case 0:throw v(new p,"no #proto defined","object");case 1:if(!a.h(c)&&!a.a(c))throw f(new b,"proto",c,"?Object","object");
return G(c);default:if(!a.h(c)&&!a.a(c))throw f(new b,"proto",c,"?Object","object");var e=S(arguments);e[0]=G(c);return Y.apply(null,e)}}c.object=h;c.obj=h;var l=V("create"),v=l.error,f=l.w;return c}();F.create=F;F.VERSION="5.0.0";(function(){function a(a){a.vitals=F;a.Vitals=F;a.VITALS=F}J.J&&a(window);J.I&&a(self);a(E);J.G&&J.H&&(module.exports===exports?module.exports=F:a(exports));J.F&&define(function(){return F})})()})(this);