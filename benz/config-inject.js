var edgeroot = 'http://wifi.lan/';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/benz";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js']
    ],
    init: [projroot + '/menu.js']
};