(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},e=[].slice;!function(t,e){return"function"==typeof define&&define.amd?define("waypoints",["jquery"],function(n){return e(n,t)}):e(t.jQuery,t)}(window,function(n,r){var o,i,s,l,a,c,u,d,p,f,h,m,v,y,g,b;return o=n(r),d=t.call(r,"ontouchstart")>=0,l={horizontal:{},vertical:{}},a=1,u={},c="waypoints-context-id",h="resize.waypoints",m="scroll.waypoints",v=1,y="waypoints-waypoint-ids",g="waypoint",b="waypoints",i=function(){function t(t){var e=this;this.$element=t,this.element=t[0],this.didResize=!1,this.didScroll=!1,this.id="context"+a++,this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()},this.waypoints={horizontal:{},vertical:{}},this.element[c]=this.id,u[this.id]=this,t.bind(m,function(){var t;return e.didScroll||d?void 0:(e.didScroll=!0,t=function(){return e.doScroll(),e.didScroll=!1},r.setTimeout(t,n[b].settings.scrollThrottle))}),t.bind(h,function(){var t;return e.didResize?void 0:(e.didResize=!0,t=function(){return n[b]("refresh"),e.didResize=!1},r.setTimeout(t,n[b].settings.resizeThrottle))})}return t.prototype.doScroll=function(){var t,e=this;return t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},!d||t.vertical.oldScroll&&t.vertical.newScroll||n[b]("refresh"),n.each(t,function(t,r){var o,i,s;return s=[],i=r.newScroll>r.oldScroll,o=i?r.forward:r.backward,n.each(e.waypoints[t],function(t,e){var n,o;return r.oldScroll<(n=e.offset)&&n<=r.newScroll?s.push(e):r.newScroll<(o=e.offset)&&o<=r.oldScroll?s.push(e):void 0}),s.sort(function(t,e){return t.offset-e.offset}),i||s.reverse(),n.each(s,function(t,e){return e.options.continuous||t===s.length-1?e.trigger([o]):void 0})}),this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.refresh=function(){var t,e,r,o=this;return r=n.isWindow(this.element),e=this.$element.offset(),this.doScroll(),t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[b]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},n.each(t,function(t,e){return n.each(o.waypoints[t],function(t,r){var o,i,s,l,a;return o=r.options.offset,s=r.offset,i=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp],n.isFunction(o)?o=o.apply(r.element):"string"==typeof o&&(o=parseFloat(o),r.options.offset.indexOf("%")>-1&&(o=Math.ceil(e.contextDimension*o/100))),r.offset=i-e.contextOffset+e.contextScroll-o,r.options.onlyOnScroll&&null!=s||!r.enabled?void 0:null!==s&&s<(l=e.oldScroll)&&l<=r.offset?r.trigger([e.backward]):null!==s&&s>(a=e.oldScroll)&&a>=r.offset?r.trigger([e.forward]):null===s&&e.oldScroll>=r.offset?r.trigger([e.forward]):void 0})})},t.prototype.checkEmpty=function(){return n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)?(this.$element.unbind([h,m].join(" ")),delete u[this.id]):void 0},t}(),s=function(){function t(t,e,r){var o,i;"bottom-in-view"===r.offset&&(r.offset=function(){var t;return t=n[b]("viewportHeight"),n.isWindow(e.element)||(t=e.$element.height()),t-n(this).outerHeight()}),this.$element=t,this.element=t[0],this.axis=r.horizontal?"horizontal":"vertical",this.callback=r.handler,this.context=e,this.enabled=r.enabled,this.id="waypoints"+v++,this.offset=null,this.options=r,e.waypoints[this.axis][this.id]=this,l[this.axis][this.id]=this,o=null!=(i=this.element[y])?i:[],o.push(this.id),this.element[y]=o}return t.prototype.trigger=function(t){return this.enabled?(null!=this.callback&&this.callback.apply(this.element,t),this.options.triggerOnce?this.destroy():void 0):void 0},t.prototype.disable=function(){return this.enabled=!1},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},t.prototype.destroy=function(){return delete l[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},t.getWaypointsByElement=function(t){var e,r;return(r=t[y])?(e=n.extend({},l.horizontal,l.vertical),n.map(r,function(t){return e[t]})):[]},t}(),f={init:function(t,e){var r;return e=n.extend({},n.fn[g].defaults,e),null==(r=e.handler)&&(e.handler=t),this.each(function(){var t,r,o,l;return t=n(this),o=null!=(l=e.context)?l:n.fn[g].defaults.context,n.isWindow(o)||(o=t.closest(o)),o=n(o),r=u[o[0][c]],r||(r=new i(o)),new s(t,r,e)}),n[b]("refresh"),this},disable:function(){return f._invoke.call(this,"disable")},enable:function(){return f._invoke.call(this,"enable")},destroy:function(){return f._invoke.call(this,"destroy")},prev:function(t,e){return f._traverse.call(this,t,e,function(t,e,n){return e>0?t.push(n[e-1]):void 0})},next:function(t,e){return f._traverse.call(this,t,e,function(t,e,n){return e<n.length-1?t.push(n[e+1]):void 0})},_traverse:function(t,e,o){var i,s;return null==t&&(t="vertical"),null==e&&(e=r),s=p.aggregate(e),i=[],this.each(function(){var e;return e=n.inArray(this,s[t]),o(i,e,s[t])}),this.pushStack(i)},_invoke:function(t){return this.each(function(){var e;return e=s.getWaypointsByElement(this),n.each(e,function(e,n){return n[t](),!0})}),this}},n.fn[g]=function(){var t,r;return r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],f[r]?f[r].apply(this,t):n.isFunction(r)?f.init.apply(this,arguments):n.isPlainObject(r)?f.init.apply(this,[null,r]):n.error(r?"The "+r+" method does not exist in jQuery Waypoints.":"jQuery Waypoints needs a callback function or handler option.")},n.fn[g].defaults={context:r,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},p={refresh:function(){return n.each(u,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return null!=(t=r.innerHeight)?t:o.height()},aggregate:function(t){var e,r,o;return e=l,t&&(e=null!=(o=u[n(t)[0][c]])?o.waypoints:void 0),e?(r={horizontal:[],vertical:[]},n.each(r,function(t,o){return n.each(e[t],function(t,e){return o.push(e)}),o.sort(function(t,e){return t.offset-e.offset}),r[t]=n.map(o,function(t){return t.element}),r[t]=n.unique(r[t])}),r):[]},above:function(t){return null==t&&(t=r),p._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){return null==t&&(t=r),p._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){return null==t&&(t=r),p._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){return null==t&&(t=r),p._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return p._invoke("enable")},disable:function(){return p._invoke("disable")},destroy:function(){return p._invoke("destroy")},extendFn:function(t,e){return f[t]=e},_invoke:function(t){var e;return e=n.extend({},l.vertical,l.horizontal),n.each(e,function(e,n){return n[t](),!0})},_filter:function(t,e,r){var o,i;return(o=u[n(t)[0][c]])?(i=[],n.each(o.waypoints[e],function(t,e){return r(o,e)?i.push(e):void 0}),i.sort(function(t,e){return t.offset-e.offset}),n.map(i,function(t){return t.element})):[]}},n[b]=function(){var t,n;return n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],p[n]?p[n].apply(null,t):p.aggregate.call(null,n)},n[b].settings={resizeThrottle:100,scrollThrottle:30},o.on("load.waypoints",function(){return n[b]("refresh")})})}).call(this),function(t){var e=!1,n=!1,r={isUrl:function(t){var e=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return e.test(t)?!0:!1},loadContent:function(t,e){t.html(e)},addPrefix:function(t){var e=t.attr("id"),n=t.attr("class");"string"==typeof e&&""!==e&&t.attr("id",e.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof n&&""!==n&&"sidr-inner"!==n&&t.attr("class",n.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),t.removeAttr("style")},execute:function(r,i,s){"function"==typeof i?(s=i,i="sidr"):i||(i="sidr");var l,a,c,u=t("#"+i),d=t(u.data("body")),p=t("html"),f=u.outerWidth(!0),h=u.data("speed"),m=u.data("side"),v=u.data("displace"),y=u.data("onOpen"),g=u.data("onClose"),b="sidr"===i?"sidr-open":"sidr-open "+i+"-open";if("open"===r||"toggle"===r&&!u.is(":visible")){if(u.is(":visible")||e)return;if(n!==!1)return void o.close(n,function(){o.open(i)});e=!0,"left"===m?(l={left:f+"px"},a={left:"0px"}):(l={right:f+"px"},a={right:"0px"}),d.is("body")&&(c=p.scrollTop(),p.css("overflow-x","hidden").scrollTop(c)),v?d.addClass("sidr-animating").css({width:d.width(),position:"absolute"}).animate(l,h,function(){t(this).addClass(b)}):setTimeout(function(){t(this).addClass(b)},h),u.css("display","block").animate(a,h,function(){e=!1,n=i,"function"==typeof s&&s(i),d.removeClass("sidr-animating")}),y()}else{if(!u.is(":visible")||e)return;e=!0,"left"===m?(l={left:0},a={left:"-"+f+"px"}):(l={right:0},a={right:"-"+f+"px"}),d.is("body")&&(c=p.scrollTop(),p.removeAttr("style").scrollTop(c)),d.addClass("sidr-animating").animate(l,h).removeClass(b),u.animate(a,h,function(){u.removeAttr("style").hide(),d.removeAttr("style"),t("html").removeAttr("style"),e=!1,n=!1,"function"==typeof s&&s(i),d.removeClass("sidr-animating")}),g()}}},o={open:function(t,e){r.execute("open",t,e)},close:function(t,e){r.execute("close",t,e)},toggle:function(t,e){r.execute("toggle",t,e)},toogle:function(t,e){r.execute("toggle",t,e)}};t.sidr=function(e){return o[e]?o[e].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof e&&"string"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.sidr"):o.toggle.apply(this,arguments)},t.fn.sidr=function(e){var n=t.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,onOpen:function(){},onClose:function(){}},e),i=n.name,s=t("#"+i);if(0===s.length&&(s=t("<div />").attr("id",i).appendTo(t("body"))),s.addClass("sidr").addClass(n.side).data({speed:n.speed,side:n.side,body:n.body,displace:n.displace,onOpen:n.onOpen,onClose:n.onClose}),"function"==typeof n.source){var l=n.source(i);r.loadContent(s,l)}else if("string"==typeof n.source&&r.isUrl(n.source))t.get(n.source,function(t){r.loadContent(s,t)});else if("string"==typeof n.source){var a="",c=n.source.split(",");if(t.each(c,function(e,n){a+='<div class="sidr-inner">'+t(n).html()+"</div>"}),n.renaming){var u=t("<div />").html(a);u.find("*").each(function(e,n){var o=t(n);r.addPrefix(o)}),a=u.html()}r.loadContent(s,a)}else null!==n.source&&t.error("Invalid Sidr Source");return this.each(function(){var e=t(this),n=e.data("sidr");n||(e.data("sidr",i),"ontouchstart"in document.documentElement?(e.bind("touchstart",function(t){t.originalEvent.touches[0],this.touched=t.timeStamp}),e.bind("touchend",function(t){var e=Math.abs(t.timeStamp-this.touched);200>e&&(t.preventDefault(),o.toggle(i))})):e.click(function(t){t.preventDefault(),o.toggle(i)}))})}}(jQuery),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}};t=function(){function t(t,n){var r,o,i,s;this.data=t,this.reportEvent=e(this.reportEvent,this),this.setUpOO=e(this.setUpOO,this),this.setUpVideo=e(this.setUpVideo,this),this.loadScripts=e(this.loadScripts,this),this.loadModal=e(this.loadModal,this),this.data instanceof jQuery&&(this.data=this.data.get(0)),s=this.data.attributes[n].value.split(","),s=s.map(function(t){return t.trim()}),s.length>3&&(i=s.splice(0,2),o=s.join(","),s=i.concat(o)),this._properties={_id:s[0],video:{element:this.data,klass:this.data.className,code:s[1]},params:function(){try{return JSON.parse(s[2])}catch(t){return r=t,{}}}(),scriptKeys:{ooyala:"//player.ooyala.com/v3/ZmJmNTVlNDk1NjcwYTVkMzAzODkyMjg0?tweaks=android-enable-hls"}},this._properties.params.template=this._properties.params.template||"videoPlayer",this._properties.params.type=this._properties.params.type||"ooyala",this._properties.params.playerId=this._properties.params.playerId||"player--ooyala",this._properties.params.autoPlay=this._properties.params.autoPlay||!1,this.loadScripts().loadModal().setUpVideo()}return t.prototype.loadModal=function(){var t,e;return t=core.plugins.Modal,null!=t&&(null!=core.modal?void 0===core.modal[this._properties.params.template]&&(e=this._properties.params.template,core.modal[e]=new t.model(e,"data-modal-open","preload")):(core.modal={},e=this._properties.params.template,core.modal[e]=new t.model(e,"data-modal-open","preload"))),this},t.prototype.loadScripts=function(){var t,e,n;return t=document.createElement("script"),null!=this._properties.scriptKeys[this._properties.params.type]?t.setAttribute("src",this._properties.scriptKeys[this._properties.params.type]):le.log("no script key found for "+this._properties.video.type),e=core.flatten(document.getElementsByTagName("script")),n=e.filter(function(t){return function(e){return null!=e.attributes.src&&null!=e.attributes.src.value?e.attributes.src.value===t._properties.scriptKeys[t._properties.params.type]:void 0}}(this)),n.length>0||document.head.appendChild(t),this},t.prototype.setUpVideo=function(){return"ooyala"===this._properties.params.type&&(this._properties.params.autoPlay?(this.setUpOO(),this._properties.video.element.addEventListener("click",this.setUpOO,!1)):this._properties.video.element.addEventListener("click",this.setUpOO,!1)),this},t.prototype.setUpOO=function(){var t;return"undefined"==typeof OO||null===OO?(t=function(t){return function(){return t.setUpOO()}}(this),setTimeout(t,250)):OO.ready(function(t){return function(){var e,n,r;return core.modal[t._properties.params.template].toggleModal(),t._properties.video.player=OO.Player.create(t._properties.params.playerId,t._properties.video.code,{autoplay:!0,onCreate:function(e){return t._properties.messages=e.mb}}),e=function(){return t.reportEvent("destroyed"),t._properties.video.player.destroy(t._properties.params.playerId)},r=function(n){return 27===n.keyCode||core.isElement(n)?(e(),27===n.keyCode&&core.modal[t._properties.params.template].toggleModal(),document.removeEventListener("keyup",r,!1)):32===n.keyCode?"paused"===t._properties.video.player.state?t._properties.video.player.play():t._properties.video.player.pause():void 0},document.addEventListener("keyup",r,!1),core.modal[t._properties.params.template].events.on("close",r),t._properties.messages.subscribe(OO.EVENTS.PLAYBACK_READY,"Video",function(e){return t.reportEvent(e)}),t._properties.messages.subscribe(OO.EVENTS.PLAYED,"Video",function(n){return e(),core.modal[t._properties.params.template].toggleModal(),t.reportEvent(n)}),t._properties.messages.subscribe(OO.EVENTS.PLAY_FAILED,"Video",function(e){return t.reportEvent(e)}),t._properties.messages.subscribe(OO.EVENTS.BUFFERED,"Video",function(e){return t.reportEvent(e)}),n=!1,t._properties.messages.subscribe(OO.EVENTS.FULLSCREEN_CHANGED,"Video",function(e){return n=!n,n?(e="Fullscreen",t.reportEvent(e)):void 0})}}(this)),this},t.prototype.reportEvent=function(t){return"undefined"!=typeof ga&&null!==ga&&ga("send","event","video",t,{page:window.location.pathname}),this},t}(),"undefined"!=typeof core&&null!==core&&core.addPlugin("Player",t,"[data-video]")}.call(this),function(){var t;t=function(){var t,e,n,r,o,i;if(r=window.location.pathname.split("/"),r.length>2){if(n=r.splice(2),"servicetimes"!==n[0]&&"aboutnewspring"!==n[0]){for(e=document.getElementsByClassName("modal"),o=0,i=e.length;i>o;o++)t=e[o],t.className=t.className.replace("opened","");return $("html, body").animate({scrollTop:$("#"+n[0]).offset().top},100)}return t=document.getElementById(n[0]),core.toggleModal(t)}},window.onpopstate=function(){return t()},$("section.story").waypoint(function(t){var e,n,r,o;return"up"===t?(n=$.waypoints("above"),r=n[n.length-2],o=r.id):o=this.id,e=$("a[href='#"+o+"']").parent(),$(".nav--secondary li").not(e).removeClass("active"),e.addClass("active"),"trailer"!==o?history.replaceState(null,null,"/easter/"+o):void 0},{offset:"40%"}),$(".scroll-down").click(function(t){var e;return t.preventDefault(),e=t.target.parentElement.hash,$("html, body").animate({scrollTop:$(""+e).offset().top},1e3)}),$(".nav__items a").click(function(t){return t.preventDefault(),$("html, body").animate({scrollTop:$(t.target.hash).offset().top},1600)}),window.matchMedia("(max-width: 769px)").matches&&$("#servicetimes h3").click(function(){var t;return t=$(this),t.next().slideToggle()}),$(".icon--mobile-nav").sidr({side:"right",onOpen:function(){return $(".icon--mobile-nav").addClass("icon--close")},onClose:function(){return $(".icon--mobile-nav").removeClass("icon--close")}})}.call(this);