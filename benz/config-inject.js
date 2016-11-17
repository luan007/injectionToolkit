var edgeroot = 'http://localhost:9999';
window.edgeroot = edgeroot;
window.projroot = edgeroot + "/benz";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js']
    ],
    init: [projroot + '/menu.js']
};