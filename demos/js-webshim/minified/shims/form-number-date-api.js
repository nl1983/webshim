jQuery.webshims.register("form-number-date-api",function(g,e){e.getStep=function(a,b){var c=g.attr(a,"step");if(c==="any")return c;b=b||i(a);if(!d[b]||!d[b].step)return c;c=h.number.asNumber(c);return(!isNaN(c)&&c>0?c:d[b].step)*d[b].stepScaleFactor};e.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=d[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in d[c.type]&&(c[a+"AsNumber"]=d[c.type][a+"Default"]))};var l=parseInt("NaN",10),d=e.inputTypes,j=function(a){return typeof a==
"number"||a&&a==a*1},m=function(a){return Modernizr.input.valueAsNumber&&g('<input type="'+a+'" />').prop("type")===a},i=function(a){return(a.getAttribute("type")||"").toLowerCase()},p=e.addMinMaxNumberToCache,k=function(a,b){a=""+a;b-=a.length;for(var c=0;c<b;c++)a="0"+a;return a};e.addValidityRule("stepMismatch",function(a,b,c,f){if(b==="")return!1;if(!("type"in c))c.type=i(a[0]);if(c.type=="date")return!1;f=(f||{}).stepMismatch;if(d[c.type]&&d[c.type].step){if(!("step"in c))c.step=e.getStep(a[0],
c.type);if(c.step=="any")return!1;if(!("valueAsNumber"in c))c.valueAsNumber=d[c.type].asNumber(b);if(isNaN(c.valueAsNumber))return!1;p("min",a,c);a=c.minAsNumber;isNaN(a)&&(a=d[c.type].stepBase||0);f=Math.abs((c.valueAsNumber-a)%c.step);f=!(f<=1.0E-7||Math.abs(f-c.step)<=1.0E-7)}return f});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){e.addValidityRule(a.name,function(b,c,f,e){e=(e||{})[a.name]||!1;if(c==="")return e;if(!("type"in f))f.type=
i(b[0]);if(d[f.type]&&d[f.type].asNumber){if(!("valueAsNumber"in f))f.valueAsNumber=d[f.type].asNumber(c);if(isNaN(f.valueAsNumber))return!1;p(a.attr,b,f);if(isNaN(f[a.attr+"AsNumber"]))return e;e=f[a.attr+"AsNumber"]*a.factor<f.valueAsNumber*a.factor-1.0E-7}return e})});e.reflectProperties(["input"],["max","min","step"]);var n=e.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=i(this),a=d[a]&&d[a].asNumber?d[a].asNumber(g.prop(this,"value")):n.prop._supget&&n.prop._supget.apply(this,
arguments);a==null&&(a=l);return a},set:function(a){var b=i(this);d[b]&&d[b].numberToString?isNaN(a)?g.prop(this,"value",""):(b=d[b].numberToString(a),b!==!1?g.prop(this,"value",b):e.warn("INVALID_STATE_ERR: DOM Exception 11")):n.prop._supset&&n.prop._supset.apply(this,arguments)}}}),o=e.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=i(this);return d[a]&&d[a].asDate&&!d[a].noAsDate?d[a].asDate(g.prop(this,"value")):o.prop._supget&&o.prop._supget.call(this)||null},set:function(a){var b=
i(this);if(d[b]&&d[b].dateToString&&!d[b].noAsDate){if(a===null)return g.prop(this,"value",""),"";b=d[b].dateToString(a);if(b!==!1)return g.prop(this,"value",b),b;else e.warn("INVALID_STATE_ERR: DOM Exception 11")}else return o.prop._supset&&o.prop._supset.apply(this,arguments)||null}}}),h={number:{mismatch:function(a){return!j(a)},step:1,stepScaleFactor:1,asNumber:function(a){return j(a)?a*1:l},numberToString:function(a){return j(a)?a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||
!a.split||!/\d$/.test(a))return!0;var b=a.split(/\u002D/);if(b.length!==3)return!0;var c=!1;g.each(b,function(a,b){if(!(j(b)||b&&b=="0"+b*1))return c=!0,!1});if(c)return c;if(b[0].length!==4||b[1].length!=2||b[1]>12||b[2].length!=2||b[2]>33)c=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,b){var c=l;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-
1,a[2]);return c},numberToString:function(a){return j(a)?this.dateToString(new Date(a*1)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+k(a.getUTCMonth()+1,2)+"-"+k(a.getUTCDate(),2):!1}},time:{mismatch:function(a,b){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(a.length<2||a.length>3)return!0;var c=!1,d;a[2]&&(a[2]=a[2].split(/\u002E/),d=parseInt(a[2][1],10),a[2]=a[2][0]);g.each(a,function(a,b){if(!(j(b)||b&&b=="0"+b*1)||b.length!==2)return c=!0,!1});
if(c)return!0;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return!0;if(a[2]&&(a[2]>59||a[2]<0))return!0;if(d&&isNaN(d))return!0;d&&(d<100?d*=100:d<10&&(d*=10));return b===!0?[a,d]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=l,a=this.mismatch(a,!0);a!==!0&&(b=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(b+=a[1]));return b},dateToString:function(a){if(a&&a.getUTCHours){var b=k(a.getUTCHours(),2)+":"+k(a.getUTCMinutes(),
2),c=a.getSeconds();c!="0"&&(b+=":"+k(c,2));c=a.getUTCMilliseconds();c!="0"&&(b+="."+k(c,3));return b}else return!1}},"datetime-local":{mismatch:function(a,b){if(!a||!a.split||(a+"special").split(/\u0054/).length!==2)return!0;a=a.split(/\u0054/);return d.date.mismatch(a[0])||d.time.mismatch(a[1],b)},noAsDate:!0,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=l,c=this.mismatch(a,!0);c!==!0&&(a=a.split(/\u0054/)[0].split(/\u002D/),b=Date.UTC(a[0],a[1]-
1,a[2],c[0][0],c[0][1],c[0][2]||0),c[1]&&(b+=c[1]));return b},dateToString:function(a,b){return d.date.dateToString(a)+"T"+d.time.dateToString(a,b)}}};(e.bugs.valueAsNumberSet||!m("number"))&&e.addInputType("number",h.number);(e.bugs.valueAsNumberSet||!m("range"))&&e.addInputType("range",g.extend({},h.number,h.range));(e.bugs.valueAsNumberSet||!m("date"))&&e.addInputType("date",h.date);(e.bugs.valueAsNumberSet||!m("time"))&&e.addInputType("time",g.extend({},h.date,h.time));(e.bugs.valueAsNumberSet||
!m("datetime-local"))&&e.addInputType("datetime-local",g.extend({},h.date,h.time,h["datetime-local"]))});
