var edgeroot = 'http://router.network:9999';
window.edgeroot = edgeroot;
window.kc = edgeroot + "/kc";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [edgeroot + '/kc/keydata.js'],
        // [edgeroot + '/utils/particle.js'],
        [edgeroot + '/utils/googleutil.js'],
        // [edgeroot + '/utils/bleutil.js']
    ],
    init: [edgeroot + '/kc/google.js']
};