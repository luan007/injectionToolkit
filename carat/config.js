var edgeroot = 'http://wifi.lan';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/carat";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/ease.js'],
        [edgeroot + '/utils/common.js'],
    ],
    init: [edgeroot + '/carat/menu.js']
};