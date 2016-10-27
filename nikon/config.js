var edgeroot = 'http://wifi.lan';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/nikon";


window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
    ],
    // init: [edgeroot + '/mindshare/bing.js']
    init: [edgeroot + '/nikon/scale.js']
};