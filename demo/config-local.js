var edgeroot = 'http://localhost:9999';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/demo";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
    ],
    // init: [edgeroot + '/mindshare/bing.js']
    init: [edgeroot + '/demo/scale.js']
};