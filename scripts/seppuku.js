// Description:
//   Bot has failed us
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot you (fail|failed) - bot commits seppuku.. HARRRGGHHNNNNN

module.exports = function(robot) {
  robot.respond(/you (fail|failed)/i, function(msg) {
    msg.emot('commits seppuku.. HARRRGGHHNNNNN');
  });
};
