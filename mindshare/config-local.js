var edgeroot = 'http://localhost:9999';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/mindshare";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [edgeroot + '/mindshare/wechat.js'],
    ],
    init: [edgeroot + '/mindshare/bing.js']
};