var edgeroot = 'http://router.network:9999';
window.edgeroot = edgeroot;
window.rise = edgeroot + "/rise";

window.$Edge = {
    deps: [
        [edgeroot + '/utils/common.js'],
        [edgeroot + '/rise/data/attendees.json'],
        [edgeroot + '/rise/data/investors.json'],
        [edgeroot + '/rise/data/speakers.json'],
        [edgeroot + '/rise/data/timeslots.json'],
        // [edgeroot + '/utils/particle.js'],
        [edgeroot + '/utils/googleutil.js'],
        // [edgeroot + '/utils/bleutil.js']
    ],
    init: [edgeroot + '/rise/google.js']
};