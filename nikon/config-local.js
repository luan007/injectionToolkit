var edgeroot = 'http://localhost:9999';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/nikon";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
    ],
    // init: [edgeroot + '/mindshare/bing.js']
    init: [edgeroot + '/nikon/scale.js']
};