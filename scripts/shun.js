// Description:
//   Shun implementation
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   shun <name> - shun jimrice

module.exports = function(robot) {
    var shunPeople = function(msg, name, reason) {
        msg.send('Commencing shunning of ' + name + ' for ' + reason + '...');
        setTimeout(function() {
            msg.send('3...');
        }, 250);
        setTimeout(function() {
            msg.send('2...');
        }, 500);
        setTimeout(function() {
            msg.send('1...');
        }, 750);
        setTimeout(function() {
            msg.send('shunning of ' + name + ' complete, please reboot to apply.');
        }, 1000);
    };
    robot.hear(/^(shun)(\s)([\w'@.-:]*)\s*(?:\s+(?:for|because|cause|cuz)\s+(.+))?$/i, function(msg) {
        var ref = msg.match;
        var name = ref[3];
        var reason = 'raisins';
        if (ref[5] !== undefined) {
            reason = ref[5];
        }
        shunPeople(msg, name, reason);
    });
};
