var edgeroot = 'http://localhost:9999';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/carat";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/ease.js'],
        [edgeroot + '/utils/common.js'],
    ],
    init: [edgeroot + '/carat/menu.js']
};