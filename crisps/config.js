var edgeroot = 'http://wifi.lan';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/crisps";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [projroot + '/box2d.js'],
        [projroot + '/drow-canvas.js'],
    ],
    // init: [edgeroot + '/mindshare/bing.js']
    init: [projroot + '/init.js']
};