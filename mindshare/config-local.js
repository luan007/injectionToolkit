var edgeroot = 'http://192.168.35.1:8080';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/mindshare";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [edgeroot + '/mindshare/wechat.js'],
    ],
    init: [edgeroot + '/mindshare/bing.js']
};
