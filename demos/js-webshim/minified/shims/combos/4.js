webshims.register("dom-extend",function(e,t,n,a,i){"use strict";var r=!("hrefNormalized"in e.support)||e.support.hrefNormalized,o=!("getSetAttribute"in e.support)||e.support.getSetAttribute,s=Object.prototype.hasOwnProperty;if(t.assumeARIA=o||Modernizr.canvas||Modernizr.video||Modernizr.boxsizing,("text"==e('<input type="email" />').attr("type")||""===e("<form />").attr("novalidate")||"required"in e("<input />")[0].attributes)&&t.error("IE browser modes are busted in IE10+. Please test your HTML/CSS/JS with a real IE version or at least IETester or similiar tools"),"debug"in t&&t.error('Use webshims.setOptions("debug", true||false||"noCombo"); to debug flag'),!t.cfg.no$Switch){var l=function(){if(!n.jQuery||n.$&&n.jQuery!=n.$||n.jQuery.webshims||(t.error("jQuery was included more than once. Make sure to include it only once or try the $.noConflict(extreme) feature! Webshims and other Plugins might not work properly. Or set webshims.cfg.no$Switch to 'true'."),n.$&&(n.$=t.$),n.jQuery=t.$),t.M!=Modernizr){t.error("Modernizr was included more than once. Make sure to include it only once! Webshims and other scripts might not work properly.");for(var e in Modernizr)e in t.M||(t.M[e]=Modernizr[e]);Modernizr=t.M}};l(),setTimeout(l,90),t.ready("DOM",l),e(l),t.ready("WINDOWLOAD",l)}var u=t.modules,c=/\s*,\s*/,d={},p={},f={},h={},m={},v={},g=e.fn.val,y=function(t,n,a,i,r){return r?g.call(e(t)):g.call(e(t),a)};e.widget||function(){var t=e.cleanData;e.cleanData=function(n){if(!e.widget)for(var a,i=0;null!=(a=n[i]);i++)try{e(a).triggerHandler("remove")}catch(r){}t(n)}}(),e.fn.val=function(t){var n=this[0];if(arguments.length&&null==t&&(t=""),!arguments.length)return n&&1===n.nodeType?e.prop(n,"value",t,"val",!0):g.call(this);if(e.isArray(t))return g.apply(this,arguments);var a=e.isFunction(t);return this.each(function(r){if(n=this,1===n.nodeType)if(a){var o=t.call(n,r,e.prop(n,"value",i,"val",!0));null==o&&(o=""),e.prop(n,"value",o,"val")}else e.prop(n,"value",t,"val")})},e.fn.onTrigger=function(e,t){return this.on(e,t).each(t)},e.fn.onWSOff=function(t,n,i,r){return r||(r=a),e(r)[i?"onTrigger":"on"](t,n),this.on("remove",function(a){a.originalEvent||e(r).off(t,n)}),this};var b="_webshimsLib"+Math.round(1e3*Math.random()),w=function(t,n,a){if(t=t.jquery?t[0]:t,!t)return a||{};var r=e.data(t,b);return a!==i&&(r||(r=e.data(t,b,{})),n&&(r[n]=a)),n?r&&r[n]:r};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){var n=[];return this.each(function(){var a=w(this,"shadowData"),i=a&&a[t.prop]||this;-1==e.inArray(i,n)&&n.push(i)}),this.pushStack(n)}}),t.cfg.extendNative||t.cfg.noTriggerOverride||function(t){e.event.trigger=function(n,a,i,r){if(!f[n]||r||!i||1!==i.nodeType)return t.apply(this,arguments);var o,l,u,c=i[n],d=e.prop(i,n),p=d&&c!=d;return p&&(u="__ws"+n,l=n in i&&s.call(i,n),i[n]=d,i[u]=c),o=t.apply(this,arguments),p&&(l?i[n]=c:delete i[n],delete i[u]),o}}(e.event.trigger),["removeAttr","prop","attr"].forEach(function(n){d[n]=e[n],e[n]=function(t,a,r,o,s){var l="val"==o,u=l?y:d[n];if(!t||!p[a]||1!==t.nodeType||!l&&o&&"attr"==n&&e.attrFn[a])return u(t,a,r,o,s);var c,f,m,g=(t.nodeName||"").toLowerCase(),b=h[g],w="attr"!=n||r!==!1&&null!==r?n:"removeAttr";if(b||(b=h["*"]),b&&(b=b[a]),b&&(c=b[w]),c){if("value"==a&&(f=c.isVal,c.isVal=l),"removeAttr"===w)return c.value.call(t);if(r===i)return c.get?c.get.call(t):c.value;c.set&&("attr"==n&&r===!0&&(r=a),m=c.set.call(t,r)),"value"==a&&(c.isVal=f)}else m=u(t,a,r,o,s);if((r!==i||"removeAttr"===w)&&v[g]&&v[g][a]){var T;T="removeAttr"==w?!1:"prop"==w?!!r:!0,v[g][a].forEach(function(e){(!e.only||(e.only="prop"&&"prop"==n)||"attr"==e.only&&"prop"!=n)&&e.call(t,r,T,l?"val":w,n)})}return m},m[n]=function(e,a,r){h[e]||(h[e]={}),h[e][a]||(h[e][a]={});var o=h[e][a][n],s=function(e,t,i){var o;return t&&t[e]?t[e]:i&&i[e]?i[e]:"prop"==n&&"value"==a?function(e){var t=this;return r.isVal?y(t,a,e,!1,0===arguments.length):d[n](t,a,e)}:"prop"==n&&"value"==e&&r.value.apply?(o="__ws"+a,f[a]=!0,function(){var e=this[o]||d[n](this,a);return e&&e.apply&&(e=e.apply(this,arguments)),e}):function(e){return d[n](this,a,e)}};h[e][a][n]=r,r.value===i&&(r.set||(r.set=r.writeable?s("set",r,o):t.cfg.useStrict&&"prop"==a?function(){throw a+" is readonly on "+e}:function(){t.info(a+" is readonly on "+e)}),r.get||(r.get=s("get",r,o))),["value","get","set"].forEach(function(e){r[e]&&(r["_sup"+e]=s(e,o))})}});var T=function(){var e=t.getPrototypeOf(a.createElement("foobar")),n=Modernizr.advancedObjectProperties&&Modernizr.objectAccessor;return function(i,r,o){var l,u;if(!(n&&(l=a.createElement(i))&&(u=t.getPrototypeOf(l))&&e!==u)||l[r]&&s.call(l,r))o._supvalue=function(){var e=w(this,"propValue");return e&&e[r]&&e[r].apply?e[r].apply(this,arguments):e&&e[r]},E.extendValue(i,r,o.value);else{var c=l[r];o._supvalue=function(){return c&&c.apply?c.apply(this,arguments):c},u[r]=o.value}o.value._supvalue=o._supvalue}}(),E=function(){var n={};t.addReady(function(a,r){var o={},s=function(t){o[t]||(o[t]=e(a.getElementsByTagName(t)),r[0]&&e.nodeName(r[0],t)&&(o[t]=o[t].add(r)))};e.each(n,function(e,n){return s(e),n&&n.forEach?(n.forEach(function(t){o[e].each(t)}),i):(t.warn("Error: with "+e+"-property. methods: "+n),i)}),o=null});var r,o=e([]),s=function(t,i){n[t]?n[t].push(i):n[t]=[i],e.isDOMReady&&(r||e(a.getElementsByTagName(t))).each(i)};return{createTmpCache:function(t){return e.isDOMReady&&(r=r||e(a.getElementsByTagName(t))),r||o},flushTmpCache:function(){r=null},content:function(t,n){s(t,function(){var t=e.attr(this,n);null!=t&&e.attr(this,n,t)})},createElement:function(e,t){s(e,t)},extendValue:function(t,n,a){s(t,function(){e(this).each(function(){var e=w(this,"propValue",{});e[n]=this[n],this[n]=a})})}}}(),x=function(e,t){e.defaultValue===i&&(e.defaultValue=""),e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue),e.removeAttr._supvalue.call(this)}}),e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(n){n=e(n);var a=n.prop("id");return a||(t++,a="ID-"+t,n.eq(0).prop("id",a)),a}}(),implement:function(e,n){var a=w(e,"implemented")||w(e,"implemented",{});return a[n]?(t.warn(n+" already implemented for element #"+e.id),!1):(a[n]=!0,!0)},extendUNDEFProp:function(t,n){e.each(n,function(e,n){e in t||(t[e]=n)})},createPropDefault:x,data:w,moveToFirstEvent:function(t,n,a){var i,r=(e._data(t,"events")||{})[n];r&&r.length>1&&(i=r.pop(),a||(a="bind"),"bind"==a&&r.delegateCount?r.splice(r.delegateCount,0,i):r.unshift(i)),t=null},addShadowDom:function(){var i,r,o,s={init:!1,runs:0,test:function(){var e=s.getHeight(),t=s.getWidth();e!=s.height||t!=s.width?(s.height=e,s.width=t,s.handler({type:"docresize"}),s.runs++,9>s.runs&&setTimeout(s.test,90)):s.runs=0},handler:function(t){clearTimeout(i),i=setTimeout(function(){if("resize"==t.type){var i=e(n).width(),l=e(n).width();if(l==r&&i==o)return;r=l,o=i,s.height=s.getHeight(),s.width=s.getWidth()}e(a).triggerHandler("updateshadowdom")},"resize"==t.type?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var n=a.body,i=a.documentElement;s[t]=function(){return Math.max(n["scroll"+e],i["scroll"+e],n["offset"+e],i["offset"+e],i["client"+e])}})},start:function(){!this.init&&a.body&&(this.init=!0,this._create(),this.height=s.getHeight(),this.width=s.getWidth(),setInterval(this.test,600),e(this.test),t.ready("WINDOWLOAD",this.test),e(a).on("updatelayout",this.handler),e(n).on("resize",this.handler),function(){var t,n=e.fn.animate;e.fn.animate=function(){return clearTimeout(t),t=setTimeout(function(){s.test()},99),n.apply(this,arguments)}}())}};return t.docObserve=function(){t.ready("DOM",function(){s.start(),null==e.support.boxSizing&&e(function(){e.support.boxSizing&&s.handler({type:"boxsizing"})})})},function(n,a,i){if(n&&a){i=i||{},n.jquery&&(n=n[0]),a.jquery&&(a=a[0]);var r=e.data(n,b)||e.data(n,b,{}),o=e.data(a,b)||e.data(a,b,{}),s={};i.shadowFocusElement?i.shadowFocusElement&&(i.shadowFocusElement.jquery&&(i.shadowFocusElement=i.shadowFocusElement[0]),s=e.data(i.shadowFocusElement,b)||e.data(i.shadowFocusElement,b,s)):i.shadowFocusElement=a,e(n).on("remove",function(t){t.originalEvent||setTimeout(function(){e(a).remove()},4)}),r.hasShadow=a,s.nativeElement=o.nativeElement=n,s.shadowData=o.shadowData=r.shadowData={nativeElement:n,shadowElement:a,shadowFocusElement:i.shadowFocusElement},i.shadowChilds&&i.shadowChilds.each(function(){w(this,"shadowData",o.shadowData)}),i.data&&(s.shadowData.data=o.shadowData.data=r.shadowData.data=i.data),i=null}t.docObserve()}}(),propTypes:{standard:function(e){x(e),e.prop||(e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}})},"boolean":function(e){x(e),e.prop||(e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return null!=e.attr.get.call(this)}})},src:function(){var t=a.createElement("a");return t.style.display="none",function(n,a){x(n),n.prop||(n.prop={set:function(e){n.attr.set.call(this,e)},get:function(){var n,i=this.getAttribute(a);if(null==i)return"";if(t.setAttribute("href",i+""),!r){try{e(t).insertAfter(this),n=t.getAttribute("href",4)}catch(o){n=t.getAttribute("href",4)}e(t).detach()}return n||t.href}})}}(),enumarated:function(e){x(e),e.prop||(e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();return t&&-1!=e.limitedTo.indexOf(t)||(t=e.defaultValue),t}})}},reflectProperties:function(n,a){"string"==typeof a&&(a=a.split(c)),a.forEach(function(a){t.defineNodeNamesProperty(n,a,{prop:{set:function(t){e.attr(this,a,t)},get:function(){return e.attr(this,a)||""}}})})},defineNodeNameProperty:function(n,a,i){return p[a]=!0,i.reflect&&(i.propType&&!t.propTypes[i.propType]?t.error("could not finde propType "+i.propType):t.propTypes[i.propType||"standard"](i,a)),["prop","attr","removeAttr"].forEach(function(r){var o=i[r];o&&(o="prop"===r?e.extend({writeable:!0},o):e.extend({},o,{writeable:!0}),m[r](n,a,o),"*"!=n&&t.cfg.extendNative&&"prop"==r&&o.value&&e.isFunction(o.value)&&T(n,a,o),i[r]=o)}),i.initAttr&&E.content(n,a),i},defineNodeNameProperties:function(e,n,a,i){for(var r in n)!i&&n[r].initAttr&&E.createTmpCache(e),a&&(n[r][a]||(n[r][a]={},["value","set","get"].forEach(function(e){e in n[r]&&(n[r][a][e]=n[r][e],delete n[r][e])}))),n[r]=t.defineNodeNameProperty(e,r,n[r]);return i||E.flushTmpCache(),n},createElement:function(n,a,i){var r;return e.isFunction(a)&&(a={after:a}),E.createTmpCache(n),a.before&&E.createElement(n,a.before),i&&(r=t.defineNodeNameProperties(n,i,!1,!0)),a.after&&E.createElement(n,a.after),E.flushTmpCache(),r},onNodeNamesPropertyModify:function(t,n,a,i){"string"==typeof t&&(t=t.split(c)),e.isFunction(a)&&(a={set:a}),t.forEach(function(e){v[e]||(v[e]={}),"string"==typeof n&&(n=n.split(c)),a.initAttr&&E.createTmpCache(e),n.forEach(function(t){v[e][t]||(v[e][t]=[],p[t]=!0),a.set&&(i&&(a.set.only=i),v[e][t].push(a.set)),a.initAttr&&E.content(e,t)}),E.flushTmpCache()})},defineNodeNamesBooleanProperty:function(n,a,r){r||(r={}),e.isFunction(r)&&(r.set=r),t.defineNodeNamesProperty(n,a,{attr:{set:function(e){this.setAttribute(a,e),r.set&&r.set.call(this,!0)},get:function(){var e=this.getAttribute(a);return null==e?i:a}},removeAttr:{value:function(){this.removeAttribute(a),r.set&&r.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:r.initAttr||!1})},contentAttr:function(e,t,n){if(e.nodeName){var a;return n===i?(a=e.attributes[t]||{},n=a.specified?a.value:null,null==n?i:n):("boolean"==typeof n?n?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,n),i)}},activeLang:function(){var n,a,i=[],r={},o=/:\/\/|^\.*\//,s=function(n,a,i){var r;return a&&i&&-1!==e.inArray(a,i.availableLangs||i.availabeLangs||[])?(n.loading=!0,r=i.langSrc,o.test(r)||(r=t.cfg.basePath+r),t.loader.loadScript(r+a+".js",function(){n.langObj[a]?(n.loading=!1,c(n,!0)):e(function(){n.langObj[a]&&c(n,!0),n.loading=!1})}),!0):!1},l=function(e){r[e]&&r[e].forEach(function(e){e.callback(n,a,"")})},c=function(e,t){if(e.activeLang!=n&&e.activeLang!==a){var i=u[e.module].options;e.langObj[n]||a&&e.langObj[a]?(e.activeLang=n,e.callback(e.langObj[n]||e.langObj[a],n),l(e.module)):t||s(e,n,i)||s(e,a,i)||!e.langObj[""]||""===e.activeLang||(e.activeLang="",e.callback(e.langObj[""],n),l(e.module))}},d=function(t){return"string"==typeof t&&t!==n?(n=t,a=n.split("-")[0],n==a&&(a=!1),e.each(i,function(e,t){c(t)})):"object"==typeof t&&(t.register?(r[t.register]||(r[t.register]=[]),r[t.register].push(t),t.callback(n,a,"")):(t.activeLang||(t.activeLang=""),i.push(t),c(t))),n};return d}()}),e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,n){t[e]=function(e,a,i,r){"string"==typeof e&&(e=e.split(c));var o={};return e.forEach(function(e){o[e]=t[n](e,a,i,r)}),o}}),t.isReady("webshimLocalization",!0)}),function(e,t){if(!(!e.webshims.assumeARIA||"content"in t.createElement("template")||(e(function(){var t=e("main").attr({role:"main"});t.length>1?webshims.error("only one main element allowed in document"):t.is("article *, section *")&&webshims.error("main not allowed inside of article/section elements")}),"hidden"in t.createElement("a")))){var n={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},a=function(e,t){var n=e.getAttribute("role");n||e.setAttribute("role",t)};e.webshims.addReady(function(i,r){if(e.each(n,function(t,n){for(var o=e(t,i).add(r.filter(t)),s=0,l=o.length;l>s;s++)a(o[s],n)}),i===t){var o=t.getElementsByTagName("header")[0],s=t.getElementsByTagName("footer"),l=s.length;if(o&&!e(o).closest("section, article")[0]&&a(o,"banner"),!l)return;var u=s[l-1];e(u).closest("section, article")[0]||a(u,"contentinfo")}})}}(webshims.$,document),webshims.register("form-message",function(e,t,n,a,i,r){"use strict";r.lazyCustomMessages&&(r.customMessages=!0);var o=t.validityMessages,s=r.customMessages?["customValidationMessage"]:[];o.en=e.extend(!0,{typeMismatch:{defaultMessage:"Please enter a valid value.",email:"Please enter an email address.",url:"Please enter a URL."},badInput:{defaultMessage:"Please enter a valid value.",number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.",month:"Please enter a valid value.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},stepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}},o.en||o["en-US"]||{}),"object"==typeof o.en.valueMissing&&["select","radio"].forEach(function(e){o.en.valueMissing[e]=o.en.valueMissing[e]||"Please select an option."}),"object"==typeof o.en.rangeUnderflow&&["date","time","datetime-local","month"].forEach(function(e){o.en.rangeUnderflow[e]=o.en.rangeUnderflow[e]||"Value must be at or after {%min}."}),"object"==typeof o.en.rangeOverflow&&["date","time","datetime-local","month"].forEach(function(e){o.en.rangeOverflow[e]=o.en.rangeOverflow[e]||"Value must be at or before {%max}."}),o["en-US"]||(o["en-US"]=e.extend(!0,{},o.en)),o["en-GB"]||(o["en-GB"]=e.extend(!0,{},o.en)),o["en-AU"]||(o["en-AU"]=e.extend(!0,{},o.en)),o[""]=o[""]||o["en-US"],o.de=e.extend(!0,{typeMismatch:{defaultMessage:"{%value} ist in diesem Feld nicht zul\u00e4ssig.",email:"{%value} ist keine g\u00fcltige E-Mail-Adresse.",url:"{%value} ist kein(e) g\u00fcltige(r) Webadresse/Pfad."},badInput:{defaultMessage:"Geben Sie einen zul\u00e4ssigen Wert ein.",number:"Geben Sie eine Nummer ein.",date:"Geben Sie ein Datum ein.",time:"Geben Sie eine Uhrzeit ein.",month:"Geben Sie einen Monat mit Jahr ein.",range:"Geben Sie eine Nummer.","datetime-local":"Geben Sie ein Datum mit Uhrzeit ein."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr dieses Eingabefeld ein falsches Format. {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein.",checkbox:"Bitte aktivieren Sie das K\u00e4stchen."}},o.de||{}),"object"==typeof o.de.valueMissing&&["select","radio"].forEach(function(e){o.de.valueMissing[e]=o.de.valueMissing[e]||"Bitte w\u00e4hlen Sie eine Option aus."}),"object"==typeof o.de.rangeUnderflow&&["date","time","datetime-local","month"].forEach(function(e){o.de.rangeUnderflow[e]=o.de.rangeUnderflow[e]||"{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."}),"object"==typeof o.de.rangeOverflow&&["date","time","datetime-local","month"].forEach(function(e){o.de.rangeOverflow[e]=o.de.rangeOverflow[e]||"{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});var l=o[""],u=function(t,n){return t&&"string"!=typeof t&&(t=t[e.prop(n,"type")]||t[(n.nodeName||"").toLowerCase()]||t.defaultMessage),t||""},c={value:1,min:1,max:1};t.createValidationMessage=function(n,a){var i,r=e.prop(n,"type"),s=u(l[a],n);return s||"badInput"!=a||(s=u(l.typeMismatch,n)),s||"typeMismatch"!=a||(s=u(l.badInput,n)),s||(s=u(o[""][a],n)||e.prop(n,"validationMessage"),t.info("could not find errormessage for: "+a+" / "+r+". in language: "+t.activeLang())),s&&["value","min","max","title","maxlength","label"].forEach(function(o){if(-1!==s.indexOf("{%"+o)){var l=("label"==o?e.trim(e('label[for="'+n.id+'"]',n.form).text()).replace(/\*$|:$/,""):e.prop(n,o))||"";"patternMismatch"!=a||"title"!=o||l||t.error("no title for patternMismatch provided. Always add a title attribute."),c[o]&&(i||(i=e(n).getShadowElement().data("wsWidget"+r)),i&&i.formatValue&&(l=i.formatValue(l,!1))),s=s.replace("{%"+o+"}",l),"value"==o&&(s=s.replace("{%valueLen}",l.length))}}),s||""},(!Modernizr.formvalidation||t.bugs.bustedValidity)&&s.push("validationMessage"),t.activeLang({langObj:o,module:"form-core",callback:function(e){l=e}}),t.activeLang({register:"form-core",callback:function(e){o[e]&&(l=o[e])}}),s.forEach(function(n){t.defineNodeNamesProperty(["fieldset","output","button"],n,{prop:{value:"",writeable:!1}}),["input","select","textarea"].forEach(function(a){var r=t.defineNodeNameProperty(a,n,{prop:{get:function(){var n=this,a="";if(!e.prop(n,"willValidate"))return a;var o=e.prop(n,"validity")||{valid:1};return o.valid?a:(a=t.getContentValidationMessage(n,o))?a:o.customError&&n.nodeName&&(a=Modernizr.formvalidation&&!t.bugs.bustedValidity&&r.prop._supget?r.prop._supget.call(n):t.data(n,"customvalidationMessage"))?a:(e.each(o,function(e,r){return"valid"!=e&&r?(a=t.createValidationMessage(n,e),a?!1:i):i}),a||"")},writeable:!1}})})})});