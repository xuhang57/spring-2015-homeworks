Element.NativeEvents.message=2;Element.Events.message={base:"message",condition:function(a){if(!a.$message_extended){a.data=a.event.data;a.source=a.event.source;a.origin=a.event.origin;a.$message_extended=true}return true}};(function(a){a.ChooseRoomFlyoutUtil={logCommerceClickError:function(f,d,g,c,b){ta.util.error.record(f,d,null,{servlet:window.pageServlet,url:g,area:c},b)},updateLoadingMessageFromIFrame:function(d,c){var e,b;if(!d){return}if(c==="loading_msg_long"){b=ta.retrieve("ib.loading_text_long")}else{if(c==="loading_msg_verylong"){b=ta.retrieve("ib.loading_text_very_long")}}if(!b){return}e=d.getElement(".ibLoadingText");if(e){e.set("html",b);e.addClass("wideText")}},toggleBookingLinkAlwaysHover:function(c,b){if(!ta.retrieve("ibex_performance_usability")){return}if(!c){return}if(b){c.addClass("hovered")}else{c.removeClass("hovered")}},addCloseButton:function(b,c){var e,d;if(!b){return}e='<img class="triangle_fold" src="'+CDNHOST+'/img2/booking/flyout/triangle_fold.png">';e+='<img class="close_white_x" src="'+CDNHOST+'/img2/booking/flyout/close_x.png">';d=new Element("a",{"class":"roomFlyoutCloseBtn",href:"#",html:e,onclick:"return false;",events:{click:c}});d.hide();b.adopt(d)},fiddleFlyoutHeight:function(e){var d,b,c;if(e!=null){d=e.getStyle("height");b=parseInt(d,10);if(b){c=b+1;e.setStyle("height",c+"px");setTimeout(function(){e.setStyle("height",d)},1)}}}}})(ta.widgets);ta.widgets.SingleFlyout=(function(){var g="metaPriceInfo";var k="&iframe=true&flyout=h";function q(t,r,s){this.commerceUrl=t;this.metaContainer=r;this.parentListing=r.getParent(".listing");this.locationId=s;this.scrollFx=new Fx.Scroll(window,{duration:"normal"});window.addEvent("message",this.postMessageHandler.bind(this));if(!this.metaContainer){ta.util.error.record(null,"Cannot find container '"+g+"' for IB flyout.")}if(!this.parentListing){ta.util.error.record(null,"Cannot find parentlisting for IB flyout.")}}function b(){return this.metaContainer}function p(){if(!this.unavailable&&this.loaded){this.getFlyout().getElement(".ibLoadingPane").hide();this.hideUnavailable();this.getIBFrame().show()}}function f(){this.getIBFrame().hide();if(!this.unavailable){this.getFlyout().getElement(".ibLoadingPane").show()}}function j(){var s;var r=false;this.getMetaContainer().getElements(".offer.premium").each(function(t){if(t.hasClass("bookableOffer")||t.hasClass("hidden")||t.hasClass("tripConnectDemo")){return}r=true});if(!this.unavailContainer){this.unavailContainer=new Element("div",{"class":"ibUnavailable",html:ta.retrieve("ib.sorry_offer_unavail")});if(r){this.unavailContainer.adopt(new Element("div",{"class":"unavailableSubtext",html:ta.retrieve("ib.still_want_to_stay")}));this.unavailContainer.adopt(new Element("div",{"class":"alternateProviders"}))}this.unavailContainer.hide();this.getFlyout().adopt(this.unavailContainer)}if(r){s=this.unavailContainer.getElement(".alternateProviders");s.empty();this.getMetaContainer().getElements(".offer.premium").each(function(u){if(u.hasClass("bookableOffer")||u.hasClass("hidden")||u.hasClass("tripConnectDemo")){return}var t=u.getElement(".providerLogo img");if(t){s.adopt(new Element("img",{"class":"providerLogo",src:t.get("src"),events:{click:function(v){ta.meta.link.click(v,u)},mouseover:function(){u.addClass("hovered")},mouseout:function(){u.removeClass("hovered")}}}))}})}if(this.showUnavailableHandler){this.showUnavailableHandler(this.unavailContainer)}this.unavailable=true;this.getFlyout().getElement(".ibLoadingPane").hide();this.getMetaContainer().addClass("bookingUnavailable");this.unavailContainer.show()}function m(){if(!this.unavailContainer){return}this.unavailable=false;this.getMetaContainer().removeClass("bookingUnavailable");this.unavailContainer.hide()}function a(){var s=this.getRoomOptionsUrl(),t=/(impression_key|comm_args|ik|ca)=.*?\&/g,r=this.getMetaPricePerNight();if(!r){return}if(!s||(this.frameUrl&&this.frameUrl.replace(t,"")===s.replace(t,""))){this.showFrame();return}this.loaded=false;this.unavailable=false;this.getIBFrame().set("src",s+this.getMetaPricePerNight()+k+this.getPlacementTrackingParam());this.frameUrl=s}function e(w){var v;if(w.origin!=="https://"+window.location.hostname){return}if(typeof(w.data)!=="string"){return}try{v=JSON.decode(w.data,true)}catch(y){return}if(!v){return}if(v.id&&v.id!==-1&&parseInt(v.id,10)!==parseInt(this.locationId,10)){return}switch(v.type){case"unavailable":this.hideFrame();this.showUnavailable();break;case"listStatus":this.addCloseButtonIfNecessary();if(v.val==="ready"){this.loaded=true;this.showFrame();if(ta.retrieve("ib_flyout_more_rooms")){ta.widgets.ChooseRoomFlyoutUtil.fiddleFlyoutHeight(this.flyoutContainer)}}break;case"url":window.location=v.val;break;case"setHeight":if(v.val){var r=this.getFlyout();var t=this.getFlyout().getParent();var u=this.getIBFrame();var x=parseInt(v.val,10)-parseInt(r.getStyle("height"),10);if(x<=0){return}var s=parseInt(t.getStyle("height"),10)+x+"px";r.setStyle("height",v.val);u.setStyle("height",v.val);t.setStyle("height",s)}else{this.getFlyout().setStyle("height","");this.getIBFrame().setStyle("height","");this.getFlyout().getParent().setStyle("height","")}break}if(v.type!==null&&v.type.indexOf("loading_msg")===0){ta.widgets.ChooseRoomFlyoutUtil.updateLoadingMessageFromIFrame(this.getFlyout(),v.type);this.addCloseButtonIfNecessary()}if(this.extraPostMessageHandler){this.extraPostMessageHandler(v)}}function i(s,t){var u=this.getIBFrame(),r=false;if(!u){return}r=u.contentWindow;if(r&&r.postMessage){r.postMessage(JSON.encode({type:s,val:t}),"https://"+window.location.hostname)}}function o(){if(!this.ibFrame){this.ibFrame=new IFrame({"class":"ibFrame",frameBorder:0,allowTransparency:true});if(!ta.retrieve("ib_flyout_more_rooms")){this.ibFrame.scrolling="no"}this.ibFrame.hide=function(){this.setStyles({visibility:"hidden",position:"absolute",top:"0",right:0})};this.ibFrame.show=function(){this.setStyles({visibility:"",position:"",top:"",right:""})};this.ibFrame.hide();this.getFlyout().adopt(this.ibFrame)}return this.ibFrame}function n(){var s=["Webkit","Moz","O","ms","Khtml"];var t=document.createElement("div");if(t.style.animationName!==undefined){return true}for(var r=0;r<s.length;r++){if(t.style[s[r]+"AnimationName"]!==undefined){return true}}}function d(){var r=this.getMetaContainer().getElement(".meta_listings .bookableOffer");if(r&&ta.meta&&ta.meta.link){var s=ta.meta.link.getUrlFromClickElem(r);if(s){return s}}return false}function l(){var r=this.getMetaContainer().getElement(".meta_listings .bookableOffer");if(r&&r.getAttribute("data-perNight")){return"&mp="+r.getAttribute("data-perNight")}return false}function h(){var s=this.getMetaContainer().getElement(".bookableOffer");if(s){var t=ta.analytics.getCommentTrackingPath(s);if(t&&t.length>0){var r=t.getLast();if(r&&r.indexOf(":")===-1){return"&tp="+encodeURIComponent(r)}else{ta.widgets.ChooseRoomFlyoutUtil.logCommerceClickError(null,"ibdm_cc: no placement found","","HotelsChooseRoomFlyout.js","WARN")}}else{ta.widgets.ChooseRoomFlyoutUtil.logCommerceClickError(null,"ibdm_cc: no tracking path found","","HotelsChooseRoomFlyout.js","WARN")}}return""}function c(s){var r=this.getMetaContainer();if(!r){return}ta.widgets.ChooseRoomFlyoutUtil.toggleBookingLinkAlwaysHover(r.getElement(".meta_listings .bookableOffer"),s)}Object.merge(q.prototype,{getMetaContainer:b,showFrame:p,hideFrame:f,showUnavailable:j,hideUnavailable:m,updateFrame:a,postMessageHandler:e,getIBFrame:o,postMessageToIFrame:i,isAnimationSupported:n,getRoomOptionsUrl:d,getMetaPricePerNight:l,getPlacementTrackingParam:h,toggleBookingLinkAlwaysHover:c});return q})();(function(){var c=300;var n=621;var j=315;var l="<div></div><div></div><div></div><div></div><div></div>";var e="IB_FLYOUT";var o="ollie_solo_opacity.svg";var m="/img2/generic/site/loading_anim_gry_large.gif";var k=259;if(ta.has("hotels_right_commerce")){if(ta.has("wide_listing_info")){j=343}k+=j}function b(){var q=ta.retrieve("ib.loading_text"),p=window.CDNHOST+"/img2/branding/"+o,s="ibLoadingLogo",r=this.getMetaContainer().getElement(".meta_listings .bookableOffer");if(!this.flyoutContainer){this.flyoutContainer=new Element("div",{"class":e});var t=new Element("div",{"class":"ibLoadingPane"});if(r){if(r.getAttribute("data-flyoutlogo")){p=window.CDNHOST+r.getAttribute("data-flyoutlogo");if(r.getAttribute("data-offer-author")){s+=(" "+r.getAttribute("data-offer-author"))}}if(r.getAttribute("data-ibpartner")){q="We are checking with "+r.getAttribute("data-ibpartner")+" to get you the best deals"}}t.adopt(new Element("img",{"class":s,src:p}));t.adopt(new Element("div",{"class":"ibLoadingText",html:q}));if(this.isAnimationSupported()){t.adopt(new Element("div",{"class":"ibLoadingAnimation",html:l}))}else{t.adopt(new Element("img",{"class":"ibLoadingAnimationGif",src:window.CDNHOST+m}))}this.flyoutContainer.adopt(t);this.getMetaContainer().adopt(this.flyoutContainer);this.addCloseButton(this.getMetaContainer().getParent(".property_details"),this)}return this.flyoutContainer}function d(){if(this.expanded){if(ta.retrieve("ibex_performance_usability")){this.collapseFlyout(true,"FLYOUT_CLOSE_FROM_META_LINK")}return}var p=this.getMetaContainer();setTimeout(this.updateFrame.bind(this),c);p.setStyle("display","block");this.animateExpand();this.boundedUpdateFrame=this.updateFrame.bind(this);this.boundedHideFrame=function(){this.loaded=false;this.hideUnavailable();this.hideFrame()}.bind(this);window.addEvent("postAjaxMetaUpdate",this.boundedUpdateFrame);window.addEvent("newInlinePageDates",this.boundedHideFrame);p.addClass("bookingOpen");if(ta.retrieve("ibex_performance_usability")){p.addClass("usabilityOpts")}this.toggleBookingLinkAlwaysHover(true);p.getParent(".property_details").addClass("childBookingOpen");this.getFlyout().removeClass("hidden");this.expanded=true}function a(p,q){if(!this.expanded){return}setTimeout(this.hideFrame.bind(this),c);this.flyoutAnimation=new Fx.Tween(this.getFlyout(),{property:"width",duration:c}).start(0);this.flyoutAnimation=new Fx.Tween(this.getMetaContainer(),{property:"margin-left",duration:c}).start(-k,0);window.removeEvent("postAjaxMetaUpdate",this.boundedUpdateFrame);window.removeEvent("newInlinePageDates",this.boundedHideFrame);setTimeout(function(){this.getMetaContainer().removeClass("bookingOpen")}.bind(this),c);this.toggleBookingLinkAlwaysHover(false);this.getMetaContainer().getParent(".property_details").removeClass("childBookingOpen");setTimeout(function(){this.getFlyout().addClass("hidden")}.bind(this),c);this.expanded=false;ta.widgets.HotelsChooseRoomFlyout.checkToResumeHac();if(ta.retrieve("ibex_performance_usability")){var r=this.getMetaContainer().getParent(".property_details").getElement(".roomFlyoutCloseBtn");if(r){r.hide()}}if(ta.has("ib_full_description_lightbox_on_flyout")){this.postMessageToIFrame("mask","off")}if(q){ta.trackEventOnPage("HOTELS_CHOOSE_ROOM_FLYOUT",q,null,null,!p)}return false}function i(){var r="hotel_"+this.locationId;var p=document.id(r).getElement(".meta_listing .metaLocationInfo .property_details .metaPriceInfo");if(!p||!p.getElement(".bookableOffer")){return}this.metaContainer=p;var q=this.getMetaContainer();q.adopt(this.getFlyout());if(!this.expanded){return}q.setStyle("display","block");this.boundedUpdateFrame=this.updateFrame.bind(this);this.boundedHideFrame=function(){this.loaded=false;this.hideUnavailable();this.hideFrame()}.bind(this);window.addEvent("postAjaxMetaUpdate",this.boundedUpdateFrame);window.addEvent("newInlinePageDates",this.boundedHideFrame);q.addClass("bookingOpen");if(ta.retrieve("ibex_performance_usability")){q.addClass("usabilityOpts");this.addCloseButtonIfNecessary()}this.toggleBookingLinkAlwaysHover(true);q.getParent(".property_details").addClass("childBookingOpen");q.setStyle("margin-left",-k);this.getFlyout().removeClass("hidden")}function h(q,p){if(!q){return}if(ta.retrieve("ibex_performance_usability")){ta.widgets.ChooseRoomFlyoutUtil.addCloseButton(q,function(){p.collapseFlyout(true,"FLYOUT_CLOSE_FROM_X")})}else{this.flyoutContainer.adopt(new Element("div",{"class":"ibFlyoutHandle","data-placementHolderId":this.locationId,html:"&laquo;",events:{click:function(){p.collapseFlyout(true,"FLYOUT_CLOSE_FROM_HANDLE")}}}))}}function g(){if(!ta.retrieve("ibex_performance_usability")){return}var r=this.getMetaContainer();if(!r){return}if(!this.expanded){return}var p=r.getParent(".property_details");if(!p){return}var q=p.getElement(".roomFlyoutCloseBtn");if(q){return}this.addCloseButton(p,this);q=p.getElement(".roomFlyoutCloseBtn");if(q){q.show()}}function f(){this.flyoutAnimation=new Fx.Tween(this.getMetaContainer(),{property:"margin-left",duration:c}).start(0,-k);this.flyoutAnimation=new Fx.Tween(this.getFlyout(),{property:"width",duration:c}).start(0,n);if(ta.retrieve("ibex_performance_usability")){var p=this.getMetaContainer().getParent(".property_details");if(p){var q=p.getElement(".roomFlyoutCloseBtn");if(q){(function(){q.show()}).delay(c)}}}}Object.merge(ta.widgets.SingleFlyout.prototype,{getFlyout:b,expandFlyout:d,collapseFlyout:a,refindHotel:i,addCloseButton:h,addCloseButtonIfNecessary:g,animateExpand:f})})();(function(e){var c={};function b(){for(var i in c){if(c.hasOwnProperty(i)){c[i].collapseFlyout(false)}}c={}}function d(){for(var i in c){if(c.hasOwnProperty(i)){c[i].refindHotel()}}}function a(l,k){var j=k.getParent(".miniMetaRedesign");if(!j){ta.util.error.record(null,"Cannot find container placement for IB flyout.");return}var i=k.getProperty("data-locationid");if(!c[i]){c[i]=new ta.widgets.SingleFlyout(l,j,i)}c[i].expandFlyout()}function h(l,i,j){l=l||window.event;var k=l.target||l.srcElement;if(k.nodeType==3){k=k.getParent()}if(k&&c[k.getProperty("data-placementholderid")]){c[k.getProperty("data-placementholderid")].collapseFlyout(i,j)}}function g(){for(var i in c){if(c.hasOwnProperty(i)&&c[i].expanded){return true}}return false}function f(){if(!g()&&ta.hac&&ta.hac.filters&&(ta.retrieve("hac.update.complete")<ta.retrieve("hac.update.total"))){ta.hac.filters.updateResults();c={}}}window.addEvent("hotels.datesUpdate",b);window.addEvent("hotels.hacUpdate",b);window.addEvent("hotels.domUpdate",d);e.HotelsChooseRoomFlyout={expand:a,collapse:h,anyOpen:g,checkToResumeHac:f}})(ta.widgets);