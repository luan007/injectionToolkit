var edgeroot = 'http://wifi.lan';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/techcrunch";


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}


if(!IsPC()) {
    var j = window.location.href.replace(/www.baidu.com/i, "m.baidu.com");
    if(j.length !== window.location.href.length) {
        window.location.href = j;
    }
}

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [edgeroot + '/utils/particle.js'],
        [edgeroot + '/utils/bleutil.js'],
        [edgeroot + '/utils/baiduutil.js'],
        [edgeroot + '/utils/pinyin.js'],
        [edgeroot + '/utils/searchutil.js'],
        [projroot + '/data/search.json'],
        [projroot + '/data/company.json'],
        [projroot + '/data/investor.json'],
        [projroot + '/data/schedule.json'],
        [projroot + '/data/speaker.json'],
    ],
    init: [edgeroot + '/techcrunch/baidu.js']
};
