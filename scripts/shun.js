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
    robot.hear(/^shun\s((?:(?!for|because|cause|cuz).)*)(?:\s+(?:for|because|cause|cuz)\s+(.+))?$/i, function(msg) {
        var ref = msg.match;
        console.log(ref);
        var name = ref[1];
        var reason = 'raisins';
        if (ref[2] !== undefined) {
            reason = ref[2];
        }
        shunPeople(msg, name, reason);
    });
};
