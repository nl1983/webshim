jQuery.webshims.register("mediaelement-swf",function(e,f,p,q,r,m){var n=f.mediaelement,s=p.swfobject,C=Modernizr.audio&&Modernizr.video,F=s.hasFlashPlayerVersion("9.0.115"),t=0,g={paused:!0,ended:!1,currentSrc:"",duration:p.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(a){if(a)f.error("buffered index size error");else return 0},end:function(a){if(a)f.error("buffered index size error");else return 0},length:0}},D=Object.keys(g),y={currentTime:0,volume:1,
muted:!1};Object.keys(y);var v=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_callMeta:!1,currentTime:0,_ppFlag:r},g,y),z=/^jwplayer-/,k=function(a){if(a=q.getElementById(a.replace(z,"")))return a=f.data(a,"mediaelement"),a.isActive=="flash"?a:null},l=function(a){return(a=f.data(a,"mediaelement"))&&a.isActive=="flash"?a:null},j=function(a,b){b=e.Event(b);b.preventDefault();e.event.trigger(b,r,a)},w,A=m.playerPath||f.cfg.basePath+"jwplayer/"+
(m.playerName||"player.swf"),d=m.pluginPath||f.cfg.basePath+"swf/jwwebshims.swf";f.extendUNDEFProp(m.jwParams,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});f.extendUNDEFProp(m.jwVars,{screencolor:"ffffffff"});f.extendUNDEFProp(m.jwAttrs,{bgcolor:"#000000"});var c=function(a,b,d){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,!a.duration||a.duration<=0||!d&&a.duration===a._lastDuration)a.duration=p.NaN}catch(c){}a.duration!=a._lastDuration&&(j(a._elem,"durationchange"),
(a._elemNodeName=="audio"||a._callMeta)&&n.jwEvents.Model.META(e.extend({duration:a.duration},b),a))};n.jwEvents={View:{PLAY:function(a){var b=k(a.id);if(b&&!b.stopPlayPause&&(b._ppFlag=!0,b.paused==a.state)){b.paused=!a.state;if(b.ended)b.ended=!1;j(b._elem,a.state?"play":"pause")}}},Model:{BUFFER:function(a){var b=k(a.id);if(b&&b._bufferedEnd!=a.percentage){b.networkState=a.percentage==100?1:2;b.duration?(a.percentage>3&&a.percentage<10||a.percentage===100)&&c(b,a,!0):c(b,a);if(b.ended)b.ended=
!1;if(b.duration){if(a.percentage>1&&b.readyState<3)b.readyState=3,j(b._elem,"canplay");if(b._bufferedEnd&&b._bufferedEnd>a.percentage)b._bufferedStart=b.currentTime||0;b._bufferedEnd=a.percentage;b.buffered.length=1;if(a.percentage==100)b.networkState=1,b.readyState=4,c(b,a);e.event.trigger("progress",r,b._elem,!0)}}},META:function(a,b){if(b=b&&b.networkState?b:k(a.id))if("duration"in a){if(!b._metadata||!((!a.height||b.videoHeight==a.height)&&a.duration===b.duration)){b._metadata=!0;var d=b.duration;
if(a.duration)b.duration=a.duration;b._lastDuration=b.duration;if(a.height||a.width)b.videoHeight=a.height||0,b.videoWidth=a.width||0;if(!b.networkState)b.networkState=2;if(b.readyState<1)b.readyState=1;d!==b.duration&&j(b._elem,"durationchange");j(b._elem,"loadedmetadata")}}else b._callMeta=!0},TIME:function(a){var b=k(a.id);if(b&&b.currentTime!==a.position){b.currentTime=a.position;b.duration&&b.duration<b.currentTime&&c(b,a,!0);if(b.readyState<2)b.readyState=2;if(b.ended)b.ended=!1;j(b._elem,"timeupdate")}},
STATE:function(a){var b=k(a.id);if(b)switch(a.newstate){case "BUFFERING":if(b.readyState>1)b.readyState=1;if(b.ended)b.ended=!1;j(b._elem,"waiting");break;case "PLAYING":b.paused=!1;b._ppFlag=!0;b.duration||c(b,a);if(b.readyState<3)b.readyState=3,j(b._elem,"canplay");if(b.ended)b.ended=!1;j(b._elem,"playing");break;case "PAUSED":if(!b.paused&&!b.stopPlayPause)b.paused=!0,b._ppFlag=!0,j(b._elem,"pause");break;case "COMPLETED":if(b.readyState<4)b.readyState=4;b.ended=!0;j(b._elem,"ended")}}},Controller:{ERROR:function(a){var b=
k(a.id);b&&n.setError(b._elem,a.message)},SEEK:function(a){var b=k(a.id);if(b){if(b.ended)b.ended=!1;if(b.paused)try{b.jwapi.sendEvent("play","false")}catch(d){}if(b.currentTime!=a.position)b.currentTime=a.position,j(b._elem,"timeupdate")}},VOLUME:function(a){var b=k(a.id);if(b&&(a=a.percentage/100,b.volume!=a))b.volume=a,j(b._elem,"volumechange")},MUTE:function(a){if(!w||!a.state){var b=k(a.id);if(b&&b.muted!=a.state)b.muted=a.state,j(b._elem,"volumechange")}}}};var i=function(a){e.each(n.jwEvents,
function(b,d){e.each(d,function(d){a.jwapi["add"+b+"Listener"](d,"jQuery.webshims.mediaelement.jwEvents."+b+"."+d)})})},h=function(a){a&&(a._ppFlag===r&&e.prop(a._elem,"autoplay")||!a.paused)&&setTimeout(function(){if(a.isActive=="flash"&&(a._ppFlag===r||!a.paused))try{e(a._elem).play()}catch(b){}},1)},J=function(a){if(a&&a._elemNodeName=="video"){var b,d,c,i,u,o,n,h,f=function(f,g){if(g&&f&&!(g<1||f<1||a.isActive!="flash"))if(b&&(b.remove(),b=!1),i=f,u=g,clearTimeout(n),d=a._elem.style.width=="auto",
c=a._elem.style.height=="auto",d||c){o=o||e(a._elem).getShadowElement();var s;d&&!c?(s=o.height(),f*=s/g,g=s):!d&&c&&(s=o.width(),g*=s/f,f=s);h=!0;setTimeout(function(){h=!1},9);o.css({width:f,height:g})}},g=function(){if(!(a.isActive!="flash"||e.prop(a._elem,"readyState")&&e.prop(this,"videoWidth"))){var o=e.prop(a._elem,"poster");if(o&&(d=a._elem.style.width=="auto",c=a._elem.style.height=="auto",d||c))b&&(b.remove(),b=!1),b=e('<img style="position: absolute; height: auto; width: auto; top: 0px; left: 0px; visibility: hidden;" />'),
b.bind("load error alreadycomplete",function(){clearTimeout(n);var a=this,d=a.naturalWidth||a.width||a.offsetWidth,c=a.naturalHeight||a.height||a.offsetHeight;c&&d?(f(d,c),a=null):setTimeout(function(){d=a.naturalWidth||a.width||a.offsetWidth;c=a.naturalHeight||a.height||a.offsetHeight;f(d,c);b&&(b.remove(),b=!1);a=null},9);e(this).unbind()}).prop("src",o).appendTo("body").each(function(){this.complete||this.error?e(this).triggerHandler("alreadycomplete"):(clearTimeout(n),n=setTimeout(function(){e(a._elem).triggerHandler("error")},
9999))})}};e(a._elem).bind("loadedmetadata",function(){f(e.prop(this,"videoWidth"),e.prop(this,"videoHeight"))}).bind("emptied",g).bind("swfstageresize",function(){h||f(i,u)}).bind("emptied",function(){i=void 0;u=void 0}).triggerHandler("swfstageresize");g();e.prop(a._elem,"readyState")&&f(e.prop(a._elem,"videoWidth"),e.prop(a._elem,"videoHeight"))}};n.playerResize=function(a){a&&(a=q.getElementById(a.replace(z,"")))&&e(a).triggerHandler("swfstageresize")};e(q).bind("emptied",function(a){a=l(a.target);
h(a)});var B;n.jwPlayerReady=function(a){var b=k(a.id);if(b&&b.jwapi){clearTimeout(B);b.jwData=a;b.shadowElem.removeClass("flashblocker-assumed");b.wasSwfReady?e(b._elem).mediaLoad():(a=parseFloat(a.version,10),(a<5.6||a>=6)&&f.warn("mediaelement-swf is only testet with jwplayer 5.6+"),e.prop(b._elem,"volume",b.volume),e.prop(b._elem,"muted",b.muted),i(b));b.wasSwfReady=!0;var a=b.actionQueue.length,d=0,c;if(a&&b.isActive=="flash")for(;b.actionQueue.length&&a>d;)d++,c=b.actionQueue.shift(),b.jwapi[c.fn].apply(b.jwapi,
c.args);if(b.actionQueue.length)b.actionQueue=[];h(b)}};var E=e.noop;if(C){var K={play:1,playing:1},G="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),H=G.map(function(a){return a+".webshimspolyfill"}).join(" "),L=function(a){var b=f.data(a.target,"mediaelement");b&&(a.originalEvent&&a.originalEvent.type===a.type)==(b.activating=="flash")&&(a.stopImmediatePropagation(),K[a.type]&&b.isActive!=b.activating&&e(a.target).pause())},E=function(a){e(a).unbind(H).bind(H,
L);G.forEach(function(b){f.moveToFirstEvent(a,b)})};E(q)}n.setActive=function(a,b,d){d||(d=f.data(a,"mediaelement"));if(d&&d.isActive!=b){b!="html5"&&b!="flash"&&f.warn("wrong type for mediaelement activating: "+b);var c=f.data(a,"shadowData");d.activating=b;e(a).pause();d.isActive=b;b=="flash"?(c.shadowElement=c.shadowFocusElement=d.shadowElem[0],e(a).hide().getShadowElement().show()):(e(a).show().getShadowElement().hide(),c.shadowElement=c.shadowFocusElement=!1)}};var M=function(){var a="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta".split(","),
b=a.length;return function(d){if(d){for(var c=b,e=d.networkState;--c;)delete d[a[c]];d.actionQueue=[];d.buffered.length=0;e&&j(d._elem,"emptied")}}}(),I=function(a,b){var d=a._elem,c=a.shadowElem;e(d)[b?"addClass":"removeClass"]("webshims-controls");a._elemNodeName=="audio"&&!b?c.css({width:0,height:0}):c.css({width:d.style.width||e(d).width(),height:d.style.height||e(d).height()})};n.createSWF=function(a,b,c){if(F){t<1?t=1:t++;var i=e.extend({},m.jwVars,{image:e.prop(a,"poster")||"",file:b.srcProp}),
h=e(a).data("jwvars")||{};if(c&&c.swfCreated)n.setActive(a,"flash",c),M(c),c.currentSrc=b.srcProp,e.extend(i,h),m.changeJW(i,a,b,c,"load"),x(a,"sendEvent",["LOAD",i]);else{var u=e.prop(a,"controls"),o="jwplayer-"+f.getID(a),g=e.extend({},m.jwParams,e(a).data("jwparams")),j=a.nodeName.toLowerCase(),k=e.extend({},m.jwAttrs,{name:o,id:o},e(a).data("jwattrs")),l=e('<div class="polyfill-'+j+' polyfill-mediaelement" id="wrapper-'+o+'"><div id="'+o+'"></div>').css({position:"relative",overflow:"hidden"}),
c=f.data(a,"mediaelement",f.objectCreate(v,{actionQueue:{value:[]},shadowElem:{value:l},_elemNodeName:{value:j},_elem:{value:a},currentSrc:{value:b.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(a){if(a>=c.buffered.length)f.error("buffered index size error");else return 0},end:function(a){if(a>=c.buffered.length)f.error("buffered index size error");else return(c.duration-c._bufferedStart)*c._bufferedEnd/100+c._bufferedStart},length:0}}}));I(c,u);l.insertBefore(a);C&&e.extend(c,{volume:e.prop(a,
"volume"),muted:e.prop(a,"muted")});e.extend(i,{id:o,controlbar:u?m.jwVars.controlbar||(j=="video"?"over":"bottom"):j=="video"?"none":"bottom",icons:""+(u&&j=="video")},h,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});i.plugins?i.plugins+=","+d:i.plugins=d;f.addShadowDom(a,l);E(a);n.setActive(a,"flash",c);m.changeJW(i,a,b,c,"embed");J(c);s.embedSWF(A,o,"100%","100%","9.0.0",!1,i,g,k,function(b){if(b.success)c.jwapi=b.ref,u||e(b.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!b.ref.parentNode&&
l[0].parentNode||b.ref.style.display=="none")l.addClass("flashblocker-assumed"),e(a).trigger("flashblocker"),f.warn("flashblocker assumed");e(b.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),B||(clearTimeout(B),B=setTimeout(function(){var a=e(b.ref);a[0].offsetWidth>1&&a[0].offsetHeight>1&&location.protocol.indexOf("file:")===0?f.warn("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):
(a[0].offsetWidth<2||a[0].offsetHeight<2)&&f.info("JS-SWF connection can't be established on hidden or unconnected flash objects")},8E3))})}}else setTimeout(function(){e(a).mediaLoad()},1)};var x=function(a,b,d,c){return(c=c||l(a))?(c.jwapi&&c.jwapi[b]?c.jwapi[b].apply(c.jwapi,d||[]):(c.actionQueue.push({fn:b,args:d}),c.actionQueue.length>10&&setTimeout(function(){c.actionQueue.length>5&&c.actionQueue.shift()},99)),c):!1};["audio","video"].forEach(function(a){var b={},d,c=function(c){a=="audio"&&
(c=="videoHeight"||c=="videoWidth")||(b[c]={get:function(){var a=l(this);return a?a[c]:C&&d[c].prop._supget?d[c].prop._supget.apply(this):v[c]},writeable:!1})},i=function(a,d){c(a);delete b[a].writeable;b[a].set=d};i("volume",function(a){var b=l(this);if(b){if(a*=100,!isNaN(a)){(a<0||a>100)&&f.error("volume greater or less than allowed "+a/100);b.muted&&(w=!0);x(this,"sendEvent",["VOLUME",a],b);if(w){try{b.jwapi.sendEvent("mute","true")}catch(c){}w=!1}setTimeout(function(){a/=100;if(!(b.volume==a||
b.isActive!="flash"))b.volume=a,j(b._elem,"volumechange"),b=null},1)}}else if(d.volume.prop._supset)return d.volume.prop._supset.apply(this,arguments)});i("muted",function(a){var b=l(this);if(b)a=!!a,x(this,"sendEvent",["mute",""+a],b),setTimeout(function(){if(!(b.muted==a||b.isActive!="flash"))b.muted=a,j(b._elem,"volumechange"),b=null},1);else if(d.muted.prop._supset)return d.muted.prop._supset.apply(this,arguments)});i("currentTime",function(a){var b=l(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),
b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);x(this,"sendEvent",["SEEK",""+a],b);if(b.paused){if(b.readyState>0)b.currentTime=a,j(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(c){}}}}else if(d.currentTime.prop._supset)return d.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(a){b[a]={value:function(){var b=l(this);if(b)b.stopPlayPause&&clearTimeout(b.stopPlayPause),x(this,"sendEvent",["play",a=="play"],b),setTimeout(function(){if(b.isActive==
"flash"&&(b._ppFlag=!0,b.paused!=(a!="play")))b.paused=a!="play",j(b._elem,a)},1);else if(d[a].prop._supvalue)return d[a].prop._supvalue.apply(this,arguments)}}});D.forEach(c);f.onNodeNamesPropertyModify(a,"controls",function(b,d){var c=l(this);e(this)[d?"addClass":"removeClass"]("webshims-controls");if(c){try{x(this,d?"showControls":"hideControls",[a],c)}catch(i){f.warn("you need to generate a crossdomain.xml")}a=="audio"&&I(c,d);e(c.jwapi).attr("tabindex",d?"0":"-1")}});d=f.defineNodeNameProperties(a,
b,"prop")});if(F){var N=e.cleanData,O=e.browser.msie&&f.browserVersion<9,P={object:1,OBJECT:1};e.cleanData=function(a){var b,d,c;if(a&&(d=a.length)&&t)for(b=0;b<d;b++)if(P[a[b].nodeName]){if("sendEvent"in a[b]){t--;try{a[b].sendEvent("play",!1)}catch(e){}}if(O)try{for(c in a[b])typeof a[b][c]=="function"&&(a[b][c]=null)}catch(i){}}return N.apply(this,arguments)}}});
(function(e,f,p){var q=f.audio&&f.video,r=!1;if(q){var m=document.createElement("video");f.videoBuffered="buffered"in m;r="loop"in m;p.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));f.videoBuffered||(p.addPolyfill("mediaelement-native-fix",{feature:"mediaelement",test:f.videoBuffered,dependencies:["dom-support"]}),p.cfg.waitReady&&e.readyWait++,p.loader.loadScript("mediaelement-native-fix",function(){p.cfg.waitReady&&e.ready(!0)}))}e.webshims.ready("dom-support swfobject",
function(e,f,m,p,t){var g=f.mediaelement,D=f.cfg.mediaelement,y=function(d,c){var d=e(d),i={src:d.attr("src")||"",elem:d,srcProp:d.prop("src")};if(!i.src)return i;var h=d.attr("type");if(h)i.type=h,i.container=e.trim(h.split(";")[0]);else if(c||(c=d[0].nodeName.toLowerCase(),c=="source"&&(c=(d.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),h=g.getTypeForSrc(i.src,c))i.type=h,i.container=h,f.warn("you should always provide a proper mime-type using the source element. "+i.src+
" detected as: "+h),e.nodeName(d[0],"source")&&d.attr("type",h);if(h=d.attr("media"))i.media=h;return i},v=swfobject.hasFlashPlayerVersion("9.0.115"),z=function(){f.ready("mediaelement-swf",function(){if(!g.createSWF)f.modules["mediaelement-swf"].test=!1,delete e.event.special["mediaelement-swfReady"],f.loader.loadList(["mediaelement-swf"])})};v&&f.ready("WINDOWLOAD",z);g.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],"audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),
"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"]}};g.mimeTypes.source=e.extend({},g.mimeTypes.audio,g.mimeTypes.video);g.getTypeForSrc=function(d,c){if(d.indexOf("youtube.com/watch?")!=
-1)return"video/youtube";var d=d.split("?")[0].split("."),d=d[d.length-1],f;e.each(g.mimeTypes[c],function(c,e){if(e.indexOf(d)!==-1)return f=c,!1});return f};g.srces=function(d,c){d=e(d);if(c)d.removeAttr("src").removeAttr("type").find("source").remove(),e.isArray(c)||(c=[c]),c.forEach(function(c){var e=p.createElement("source");typeof c=="string"&&(c={src:c});e.setAttribute("src",c.src);c.type&&e.setAttribute("type",c.type);c.media&&e.setAttribute("media",c.media);d.append(e)});else{var c=[],f=
d[0].nodeName.toLowerCase(),h=y(d,f);h.src?c.push(h):e("source",d).each(function(){h=y(this,f);h.src&&c.push(h)});return c}};e.fn.loadMediaSrc=function(d,c){return this.each(function(){c!==t&&(e(this).removeAttr("poster"),c&&e.attr(this,"poster",c));g.srces(this,d);e(this).mediaLoad()})};g.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");
g.canSwfPlaySrces=function(d,c){var f="";v&&(d=e(d),c=c||g.srces(d),e.each(c,function(c,d){if(d.container&&d.src&&g.swfMimeTypes.indexOf(d.container)!=-1)return f=d,!1}));return f};var k={};g.canNativePlaySrces=function(d,c){var f="";if(q){var d=e(d),h=(d[0].nodeName||"").toLowerCase();if(!k[h])return f;c=c||g.srces(d);e.each(c,function(c,e){if(e.type&&k[h].prop._supvalue.call(d[0],e.type))return f=e,!1})}return f};g.setError=function(d,c){c||(c="can't play sources");e(d).data("mediaerror",c);f.warn("mediaelementError: "+
c);setTimeout(function(){e(d).data("mediaerror")&&e(d).trigger("mediaerror")},1)};var l=function(){var d;return function(c,e,h){f.ready("mediaelement-swf",function(){g.createSWF?g.createSWF(c,e,h):d||(d=!0,z(),l(c,e,h))})}}(),j=function(d,c,e,f,k){e||e!==!1&&c&&c.isActive=="flash"?(e=g.canSwfPlaySrces(d,f))?l(d,e,c):k?g.setError(d,!1):j(d,c,!1,f,!0):(e=g.canNativePlaySrces(d,f))?c&&c.isActive=="flash"&&g.setActive(d,"html5",c):k?g.setError(d,!1):j(d,c,!0,f,!0)},w=/^(?:embed|object)$/i,A=function(d,
c){var i=f.data(d,"mediaelementBase")||f.data(d,"mediaelementBase",{}),h=g.srces(d),k=d.parentNode;clearTimeout(i.loadTimer);e.data(d,"mediaerror",!1);if(h.length&&k&&!w.test(k.nodeName||""))c=c||f.data(d,"mediaelement"),j(d,c,D.preferFlash||t,h)};e(p).bind("ended",function(d){var c=f.data(d.target,"mediaelement");(!r||c&&c.isActive!="html5"||e.prop(d.target,"loop"))&&setTimeout(function(){!e.prop(d.target,"paused")&&e.prop(d.target,"loop")&&e(d.target).prop("currentTime",0).play()},1)});r||f.defineNodeNamesBooleanProperty(["audio",
"video"],"loop");["audio","video"].forEach(function(d){var c=f.defineNodeNameProperty(d,"load",{prop:{value:function(){var d=f.data(this,"mediaelement");A(this,d);q&&(!d||d.isActive=="html5")&&c.prop._supvalue&&c.prop._supvalue.apply(this,arguments)}}});k[d]=f.defineNodeNameProperty(d,"canPlayType",{prop:{value:function(c){var f="";q&&k[d].prop._supvalue&&(f=k[d].prop._supvalue.call(this,c),f=="no"&&(f=""));!f&&v&&(c=e.trim((c||"").split(";")[0]),g.swfMimeTypes.indexOf(c)!=-1&&(f="maybe"));return f}}})});
f.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var d=this,c=f.data(d,"mediaelementBase")||f.data(d,"mediaelementBase",{});clearTimeout(c.loadTimer);c.loadTimer=setTimeout(function(){A(d);d=null},9)}});f.addReady(function(d,c){e("video, audio",d).add(c.filter("video, audio")).each(function(){e.browser.msie&&f.browserVersion>8&&e.prop(this,"paused")&&!e.prop(this,"readyState")&&e(this).is('audio[preload="none"][controls]:not([autoplay])')?e(this).prop("preload","metadata").mediaLoad():
A(this)})});f.isReady("mediaelement-core",!0)})})(jQuery,Modernizr,jQuery.webshims);
