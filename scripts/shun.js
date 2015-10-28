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
//   shun <name> (for|because|cause|cuz) <reason>

module.exports = function(robot) {
    var shunPeople = function(msg, name, conjunctionWord, reason) {
        msg.send('Commencing shunning of ' + name + ' ' + conjunctionWord + ' ' + reason + '...');
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
    robot.hear(/^shun\s((?:(?!for|because|cause|cuz).)*)(?:\s+(for|because|cause|cuz)\s+(.+))?$/i, function(msg) {
        var ref = msg.match;
        var name = ref[1];
        var conjunctionWord = 'for';
        if (ref[2] !== undefined) {
            conjunctionWord = ref[2];
        }
        var reason = 'raisins';
        if (ref[3] !== undefined) {
            reason = ref[3];
        }
        shunPeople(msg, name, conjunctionWord, reason);
    });
};
