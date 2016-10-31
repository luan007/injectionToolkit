var edgeroot = 'http://localhost:8080';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/techcrunch";

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
