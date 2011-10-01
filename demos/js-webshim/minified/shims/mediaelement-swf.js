jQuery.webshims.register("mediaelement-swf",function(c,f,w,t,o,j){var g=f.mediaelement,z=w.swfobject,x=Modernizr.audio&&Modernizr.video,A=z.hasFlashPlayerVersion("9.0.115"),s=0,B={paused:!0,ended:!1,currentSrc:"",duration:w.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(a){if(a)f.error("buffered index size error");else return 0},end:function(a){if(a)f.error("buffered index size error");else return 0},length:0}},K=Object.keys(B),C={currentTime:0,volume:1,
muted:!1};Object.keys(C);var D=c.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_callMeta:!1,currentTime:0,_ppFlag:o},B,C),E=/^jwplayer-/,k=function(a){if(a=t.getElementById(a.replace(E,"")))return a=f.data(a,"mediaelement"),a.isActive=="flash"?a:null},l=function(a){return(a=f.data(a,"mediaelement"))&&a.isActive=="flash"?a:null},h=function(a,b){b=c.Event(b);b.preventDefault();c.event.trigger(b,o,a)},u,L=j.playerPath||f.cfg.basePath+"jwplayer/"+
(j.playerName||"player.swf"),F=j.pluginPath||f.cfg.basePath+"swf/jwwebshims.swf";f.extendUNDEFProp(j.jwParams,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});f.extendUNDEFProp(j.jwVars,{screencolor:"ffffffff"});f.extendUNDEFProp(j.jwAttrs,{bgcolor:"#000000"});var m=function(a,b,d){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,!a.duration||a.duration<=0||!d&&a.duration===a._lastDuration)a.duration=w.NaN}catch(e){}a.duration!=a._lastDuration&&(h(a._elem,"durationchange"),
(a._elemNodeName=="audio"||a._callMeta)&&g.jwEvents.Model.META(c.extend({duration:a.duration},b),a))};g.jwEvents={View:{PLAY:function(a){var b=k(a.id);if(b&&!b.stopPlayPause&&(b._ppFlag=!0,b.paused==a.state)){b.paused=!a.state;if(b.ended)b.ended=!1;h(b._elem,a.state?"play":"pause")}}},Model:{BUFFER:function(a){var b=k(a.id);if(b&&b._bufferedEnd!=a.percentage){b.networkState=a.percentage==100?1:2;b.duration?(a.percentage>3&&a.percentage<10||a.percentage===100)&&m(b,a,!0):m(b,a);if(b.ended)b.ended=
!1;if(b.duration){if(a.percentage>1&&b.readyState<3)b.readyState=3,h(b._elem,"canplay");if(b._bufferedEnd&&b._bufferedEnd>a.percentage)b._bufferedStart=b.currentTime||0;b._bufferedEnd=a.percentage;b.buffered.length=1;if(a.percentage==100)b.networkState=1,b.readyState=4,m(b,a);c.event.trigger("progress",o,b._elem,!0)}}},META:function(a,b){if(b=b&&b.networkState?b:k(a.id))if("duration"in a){if(!b._metadata||!((!a.height||b.videoHeight==a.height)&&a.duration===b.duration)){b._metadata=!0;var d=b.duration;
if(a.duration)b.duration=a.duration;b._lastDuration=b.duration;if(a.height||a.width)b.videoHeight=a.height||0,b.videoWidth=a.width||0;if(!b.networkState)b.networkState=2;if(b.readyState<1)b.readyState=1;d!==b.duration&&h(b._elem,"durationchange");h(b._elem,"loadedmetadata")}}else b._callMeta=!0},TIME:function(a){var b=k(a.id);if(b&&b.currentTime!==a.position){b.currentTime=a.position;b.duration&&b.duration<b.currentTime&&m(b,a,!0);if(b.readyState<2)b.readyState=2;if(b.ended)b.ended=!1;h(b._elem,"timeupdate")}},
STATE:function(a){var b=k(a.id);if(b)switch(a.newstate){case "BUFFERING":if(b.readyState>1)b.readyState=1;if(b.ended)b.ended=!1;h(b._elem,"waiting");break;case "PLAYING":b.paused=!1;b._ppFlag=!0;b.duration||m(b,a);if(b.readyState<3)b.readyState=3,h(b._elem,"canplay");if(b.ended)b.ended=!1;h(b._elem,"playing");break;case "PAUSED":if(!b.paused&&!b.stopPlayPause)b.paused=!0,b._ppFlag=!0,h(b._elem,"pause");break;case "COMPLETED":if(b.readyState<4)b.readyState=4;b.ended=!0;h(b._elem,"ended")}}},Controller:{ERROR:function(a){var b=
k(a.id);b&&g.setError(b._elem,a.message)},SEEK:function(a){var b=k(a.id);if(b){if(b.ended)b.ended=!1;if(b.paused)try{b.jwapi.sendEvent("play","false")}catch(d){}if(b.currentTime!=a.position)b.currentTime=a.position,h(b._elem,"timeupdate")}},VOLUME:function(a){var b=k(a.id);if(b&&(a=a.percentage/100,b.volume!=a))b.volume=a,h(b._elem,"volumechange")},MUTE:function(a){if(!u||!a.state){var b=k(a.id);if(b&&b.muted!=a.state)b.muted=a.state,h(b._elem,"volumechange")}}}};var M=function(a){c.each(g.jwEvents,
function(b,d){c.each(d,function(d){a.jwapi["add"+b+"Listener"](d,"jQuery.webshims.mediaelement.jwEvents."+b+"."+d)})})},G=function(a){a&&(a._ppFlag===o&&c.prop(a._elem,"autoplay")||!a.paused)&&setTimeout(function(){if(a.isActive=="flash"&&(a._ppFlag===o||!a.paused))try{c(a._elem).play()}catch(b){}},1)},N=function(a){if(a&&a._elemNodeName=="video"){var b,d,e,f,n,i,h,j,g=function(p,q){if(q&&p&&!(q<1||p<1||a.isActive!="flash"))if(b&&(b.remove(),b=!1),f=p,n=q,clearTimeout(h),d=a._elem.style.width=="auto",
e=a._elem.style.height=="auto",d||e){i=i||c(a._elem).getShadowElement();var g;d&&!e?(g=i.height(),p*=g/q,q=g):!d&&e&&(g=i.width(),q*=g/p,p=g);j=!0;setTimeout(function(){j=!1},9);i.css({width:p,height:q})}},k=function(){if(!(a.isActive!="flash"||c.prop(a._elem,"readyState")&&c.prop(this,"videoWidth"))){var i=c.prop(a._elem,"poster");if(i&&(d=a._elem.style.width=="auto",e=a._elem.style.height=="auto",d||e))b&&(b.remove(),b=!1),b=c('<img style="position: absolute; height: auto; width: auto; top: 0px; left: 0px; visibility: hidden;" />'),
b.bind("load error alreadycomplete",function(){clearTimeout(h);var a=this,d=a.naturalWidth||a.width||a.offsetWidth,i=a.naturalHeight||a.height||a.offsetHeight;i&&d?(g(d,i),a=null):setTimeout(function(){d=a.naturalWidth||a.width||a.offsetWidth;i=a.naturalHeight||a.height||a.offsetHeight;g(d,i);b&&(b.remove(),b=!1);a=null},9);c(this).unbind()}).prop("src",i).appendTo("body").each(function(){this.complete||this.error?c(this).triggerHandler("alreadycomplete"):(clearTimeout(h),h=setTimeout(function(){c(a._elem).triggerHandler("error")},
9999))})}};c(a._elem).bind("loadedmetadata",function(){g(c.prop(this,"videoWidth"),c.prop(this,"videoHeight"))}).bind("emptied",k).bind("swfstageresize",function(){j||g(f,n)}).bind("emptied",function(){f=void 0;n=void 0}).triggerHandler("swfstageresize");k();c.prop(a._elem,"readyState")&&g(c.prop(a._elem,"videoWidth"),c.prop(a._elem,"videoHeight"))}};g.playerResize=function(a){a&&(a=t.getElementById(a.replace(E,"")))&&c(a).triggerHandler("swfstageresize")};c(t).bind("emptied",function(a){a=l(a.target);
G(a)});var v;g.jwPlayerReady=function(a){var b=k(a.id);if(b&&b.jwapi){clearTimeout(v);b.jwData=a;b.shadowElem.removeClass("flashblocker-assumed");b.wasSwfReady?c(b._elem).mediaLoad():(a=parseFloat(a.version,10),(a<5.6||a>=6)&&f.warn("mediaelement-swf is only testet with jwplayer 5.6+"),c.prop(b._elem,"volume",b.volume),c.prop(b._elem,"muted",b.muted),M(b));b.wasSwfReady=!0;var a=b.actionQueue.length,d=0,e;if(a&&b.isActive=="flash")for(;b.actionQueue.length&&a>d;)d++,e=b.actionQueue.shift(),b.jwapi[e.fn].apply(b.jwapi,
e.args);if(b.actionQueue.length)b.actionQueue=[];G(b)}};var y=c.noop;if(x){var O={play:1,playing:1},H="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),I=H.map(function(a){return a+".webshimspolyfill"}).join(" "),P=function(a){var b=f.data(a.target,"mediaelement");b&&(a.originalEvent&&a.originalEvent.type===a.type)==(b.activating=="flash")&&(a.stopImmediatePropagation(),O[a.type]&&b.isActive!=b.activating&&c(a.target).pause())},y=function(a){c(a).unbind(I).bind(I,
P);H.forEach(function(b){f.moveToFirstEvent(a,b)})};y(t)}g.setActive=function(a,b,d){d||(d=f.data(a,"mediaelement"));if(d&&d.isActive!=b){b!="html5"&&b!="flash"&&f.warn("wrong type for mediaelement activating: "+b);var e=f.data(a,"shadowData");d.activating=b;c(a).pause();d.isActive=b;b=="flash"?(e.shadowElement=e.shadowFocusElement=d.shadowElem[0],c(a).hide().getShadowElement().show()):(c(a).show().getShadowElement().hide(),e.shadowElement=e.shadowFocusElement=!1)}};var Q=function(){var a="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta".split(","),
b=a.length;return function(d){if(d){for(var c=b,f=d.networkState;--c;)delete d[a[c]];d.actionQueue=[];d.buffered.length=0;f&&h(d._elem,"emptied")}}}(),J=function(a,b){var d=a._elem,e=a.shadowElem;c(d)[b?"addClass":"removeClass"]("webshims-controls");a._elemNodeName=="audio"&&!b?e.css({width:0,height:0}):e.css({width:d.style.width||c(d).width(),height:d.style.height||c(d).height()})};g.createSWF=function(a,b,d){if(A){s<1?s=1:s++;var e=c.extend({},j.jwVars,{image:c.prop(a,"poster")||"",file:b.srcProp}),
h=c(a).data("jwvars")||{};if(d&&d.swfCreated)g.setActive(a,"flash",d),Q(d),d.currentSrc=b.srcProp,c.extend(e,h),j.changeJW(e,a,b,d,"load"),r(a,"sendEvent",["LOAD",e]);else{var n=c.prop(a,"controls"),i="jwplayer-"+f.getID(a),k=c.extend({},j.jwParams,c(a).data("jwparams")),l=a.nodeName.toLowerCase(),o=c.extend({},j.jwAttrs,{name:i,id:i},c(a).data("jwattrs")),m=c('<div class="polyfill-'+l+' polyfill-mediaelement" id="wrapper-'+i+'"><div id="'+i+'"></div>').css({position:"relative",overflow:"hidden"}),
d=f.data(a,"mediaelement",f.objectCreate(D,{actionQueue:{value:[]},shadowElem:{value:m},_elemNodeName:{value:l},_elem:{value:a},currentSrc:{value:b.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(a){if(a>=d.buffered.length)f.error("buffered index size error");else return 0},end:function(a){if(a>=d.buffered.length)f.error("buffered index size error");else return(d.duration-d._bufferedStart)*d._bufferedEnd/100+d._bufferedStart},length:0}}}));J(d,n);m.insertBefore(a);x&&c.extend(d,{volume:c.prop(a,
"volume"),muted:c.prop(a,"muted")});c.extend(e,{id:i,controlbar:n?j.jwVars.controlbar||(l=="video"?"over":"bottom"):l=="video"?"none":"bottom",icons:""+(n&&l=="video")},h,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});e.plugins?e.plugins+=","+F:e.plugins=F;f.addShadowDom(a,m);y(a);g.setActive(a,"flash",d);j.changeJW(e,a,b,d,"embed");N(d);z.embedSWF(L,i,"100%","100%","9.0.0",!1,e,k,o,function(b){if(b.success)d.jwapi=b.ref,n||c(b.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!b.ref.parentNode&&
m[0].parentNode||b.ref.style.display=="none")m.addClass("flashblocker-assumed"),c(a).trigger("flashblocker"),f.warn("flashblocker assumed");c(b.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),v||(clearTimeout(v),v=setTimeout(function(){var a=c(b.ref);a[0].offsetWidth>1&&a[0].offsetHeight>1&&location.protocol.indexOf("file:")===0?f.warn("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):
(a[0].offsetWidth<2||a[0].offsetHeight<2)&&f.info("JS-SWF connection can't be established on hidden or unconnected flash objects")},8E3))})}}else setTimeout(function(){c(a).mediaLoad()},1)};var r=function(a,b,d,c){return(c=c||l(a))?(c.jwapi&&c.jwapi[b]?c.jwapi[b].apply(c.jwapi,d||[]):(c.actionQueue.push({fn:b,args:d}),c.actionQueue.length>10&&setTimeout(function(){c.actionQueue.length>5&&c.actionQueue.shift()},99)),c):!1};["audio","video"].forEach(function(a){var b={},d,e=function(c){a=="audio"&&
(c=="videoHeight"||c=="videoWidth")||(b[c]={get:function(){var a=l(this);return a?a[c]:x&&d[c].prop._supget?d[c].prop._supget.apply(this):D[c]},writeable:!1})},g=function(a,c){e(a);delete b[a].writeable;b[a].set=c};g("volume",function(a){var b=l(this);if(b){if(a*=100,!isNaN(a)){(a<0||a>100)&&f.error("volume greater or less than allowed "+a/100);b.muted&&(u=!0);r(this,"sendEvent",["VOLUME",a],b);if(u){try{b.jwapi.sendEvent("mute","true")}catch(c){}u=!1}setTimeout(function(){a/=100;if(!(b.volume==a||
b.isActive!="flash"))b.volume=a,h(b._elem,"volumechange"),b=null},1)}}else if(d.volume.prop._supset)return d.volume.prop._supset.apply(this,arguments)});g("muted",function(a){var b=l(this);if(b)a=!!a,r(this,"sendEvent",["mute",""+a],b),setTimeout(function(){if(!(b.muted==a||b.isActive!="flash"))b.muted=a,h(b._elem,"volumechange"),b=null},1);else if(d.muted.prop._supset)return d.muted.prop._supset.apply(this,arguments)});g("currentTime",function(a){var b=l(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),
b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);r(this,"sendEvent",["SEEK",""+a],b);if(b.paused){if(b.readyState>0)b.currentTime=a,h(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(c){}}}}else if(d.currentTime.prop._supset)return d.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(a){b[a]={value:function(){var b=l(this);if(b)b.stopPlayPause&&clearTimeout(b.stopPlayPause),r(this,"sendEvent",["play",a=="play"],b),setTimeout(function(){if(b.isActive==
"flash"&&(b._ppFlag=!0,b.paused!=(a!="play")))b.paused=a!="play",h(b._elem,a)},1);else if(d[a].prop._supvalue)return d[a].prop._supvalue.apply(this,arguments)}}});K.forEach(e);f.onNodeNamesPropertyModify(a,"controls",function(b,d){var e=l(this);c(this)[d?"addClass":"removeClass"]("webshims-controls");if(e){try{r(this,d?"showControls":"hideControls",[a],e)}catch(g){f.warn("you need to generate a crossdomain.xml")}a=="audio"&&J(e,d);c(e.jwapi).attr("tabindex",d?"0":"-1")}});d=f.defineNodeNameProperties(a,
b,"prop")});if(A){var R=c.cleanData,S=c.browser.msie&&f.browserVersion<9,T={object:1,OBJECT:1};c.cleanData=function(a){var b,c,e;if(a&&(c=a.length)&&s)for(b=0;b<c;b++)if(T[a[b].nodeName]){if("sendEvent"in a[b]){s--;try{a[b].sendEvent("play",!1)}catch(f){}}if(S)try{for(e in a[b])typeof a[b][e]=="function"&&(a[b][e]=null)}catch(g){}}return R.apply(this,arguments)}}});
