var Mobile;(function(n){var t;(function(t){function w(){i.style.left=(n.Screen.Width()-ut)/2+"px"}function f(n,t){Log.Log("DHTMLClick",n,t,!1)}function ot(){sj_be(e,"click",function(){_d.body.scrollTop<=0&&(sj_b.scrollTop=n.Screen.Height()*2/3,f("coverstory","trigger"),f("life","titleclick"))});sj_be(i,"click",function(){_d.body.scrollTop<=0&&(sj_b.scrollTop=n.Screen.Height()*2/3,f("coverstory","trigger"),f("life","scrollclick"))});sj_be(_w,"scroll",function(){_d.body.scrollTop==0&&b()});sj_be(_d,"touchmove",function(){sj_b.scrollTop>0&&v?(f("coverstory","trigger"),f("life","scroll"),v=!1):sj_b.scrollTop<=0&&(v=!0)});sj_be(l,"focus",function(){a=!0});sj_be(l,"blur",function(){a=!1});sj_be(_w,"orientationchange",w);sj_be(_w,"resize",w)}function b(){h=nt;p=ft;self.clearInterval(y);y=self.setInterval(function(){h==tt&&(self.clearInterval(y),r(i,!1),!a&&_d.body.scrollTop<=et&&sb_st(b,500));r(i,!0);h--;p-=1/Math.abs(nt-tt);i.style.marginTop=h+"px";i.style.opacity=p.toString()},50)}function it(n){for(var t,r=_d.head||_d.getElementsByTagName("head")[0],i=0;i<n.length;i++)t=sj_ce("style"),t.setAttribute("type","text/css"),t.innerHTML=n[i],r.appendChild(t)}function st(){var n=o.getElementsByClassName("hplatxt");return n&&n.length>0?n[0].textContent:null}function r(n,t){n&&(n.style.display=t?"block":"none")}function ht(){var t=u.getAttribute("data-date"),n=t.length!=0?"/cnhp/life?d="+t:"/cnhp/life",i=u.getAttribute("data-ajaxiid");return i&&(n+=(n.indexOf("?")<0?"?":"&")+"IID=SERP."+i),_G&&_G.IG&&(n+=(n.indexOf("?")<0?"?":"&")+"IG="+_G.IG),n}function ct(){if(o=_ge("HpContainer"),i=_ge("hpla_scroll"),k=_ge("hplas"),s=_ge("hp_hpla"),u=_ge("hp_mobile"),d=_ge("hp_hpcs"),g=_ge("hplaicr"),c=_ge("footer"),rt=_ge("Shadow"),l=_ge(sa_config.i),o&&u&&i&&k&&s){var f=[],t=sj_gx();t.open("GET",ht(),!0);sj_be(t,"readystatechange",function(){var i,h;t.readyState==4&&t.status==200&&t.responseText!=null&&(t.responseText.match("^{(.+:.+,*)+}$")?(u.removeChild(s),n.CoverStory.Load(t.responseText),console.log("coverystory2 load")):(u.removeChild(d),i=sj_ce("div"),sj_b.appendChild(i),r(i,!1),h=t.responseText.replace(/<style[^>]+>([^<]+)<\/style>/g,function(n,t){return f.push(t),""}),it(f),i.innerHTML=h,o.appendChild(i),e=_ge("hpla_t"),e&&(r(i,!0),w(),b(),ot(),e.style.marginTop=-e.offsetHeight+"px"),r(s,!0),c.style.position="relative",r(c,!0),g.style.display="inline-block",sj_evt.fire("onLAReady")))});t.send(null)}}var o,i,k,e,s,u,d,g,c,rt,l,ut=46,nt=-81,tt=-101,ft=1,a=!1,v=!0,et=sj_b.clientHeight*.2+45,y,h,p;t.AppendCssToHead=it;t.GetContent=st;t.ShowHide=r;sj_evt.bind("onBgSet",ct,1)})(t=n.LifeAdventureV2||(n.LifeAdventureV2={}))})(Mobile||(Mobile={}))