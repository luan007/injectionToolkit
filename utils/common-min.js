window.$$$wrap$$$=function(){function e(e){return/^(?:\/|[a-z]+:\/\/)/.test(e)}function t(e){e.attr("addClass")&&$(e.html()).addClass(e.attr("addClass")),e.attr("toggleClass")&&$(e.html()).toggleClass(e.attr("addClass")),e.attr("removeClass")&&$(e.html()).removeClass(e.attr("removeClass"))}function n(e){return e.attr("appendTo")?void e.children().appendTo(e.attr("appendTo")):e.attr("prependTo")?void e.children().prependTo(e.attr("prependTo")):e.attr("insertBefore")?void e.children().insertBefore(e.attr("insertBefore")):e.attr("insertAfter")?void e.children().insertAfter(e.attr("insertAfter")):void 0}function r(e){$(e.html()).remove()}function o(e){var t=e.attr("id");if(t&&""!=t.trim()){var n=e.html();window.$$$template$$$||(window.$$$template$$$={}),window.$$$template$$$[t]=n}}edge.has=function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)if(0==$(e[t]).length)return!1;return!0}return $(e).length>0},edge.root=function(t,n){return e(n)?n:(0!=n.indexOf("/")&&(n="/"+n),t+n)},edge.style=function(e,t){t=t||function(){},$("<div></div>").load(e,function(){$(this).children("style").appendTo($("body"))})},edge.iconset=function(e){$('<link href="'+e+'/utils/fonts/css/font-awesome.min.css" rel="stylesheet">').appendTo(document.head)},edge.deploy=function(e,t,n,r,o){if(n=n||function(){},!Array.isArray(t))return edge._deploy(e,t,n,r);if(void 0==o&&(o=0),o>=t.length)return _debug("<"+o+"> Seq Complete"),n();var i=function(){edge.deploy(e,t,n,r,o+1)};edge._deploy(e,t[o],i,r)},edge._deploy=function(e,i,a,d){a=a||function(){},d=d||100,console.log(e,i),i=edge.root(e,i),$("<div></div>").load(i,function(){var l=$(this).html();l=l.replace(/{{root}}/g,e);var s=$("<div>"+l+"</div>"),f=function(){for(var e=s.children("wait"),d=0;d<e.length;d++){if(!edge.has(e[d].innerHTML))return _debug("Document not ready > "+e[d].innerHTML),!1;e[d].remove()}for(var l=s.children(),d=0;d<l.length;d++)switch(console.log(l[d]),l[d].tagName){case"INJECT":n($(l[d]));break;case"INSERT":n($(l[d]));break;case"DEFINE":o($(l[d]));break;case"MOD":t($(l[d]));break;case"REMOVE":r($(l[d]))}return _debug("<*> "+i),a(),!0};tryUntil(f,d)})},window.$$$template=function(e,t){if(t=t||{},window.$$$template$$$&&window.$$$template$$$[e]){var n=window.$$$template$$$[e];for(var r in t)for(;n.indexOf("{{"+r+"}}")>=0;)n=n.replace("{{"+r+"}}",null!=t[r]&&void 0!=t[r]?t[r]:"");return $$$(n)}}};