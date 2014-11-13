// Description:
//   Would you just look at that
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   look at (this|that|it) - "look at that" guy

module.exports = function(robot) {
  robot.hear(/jackiesummervill/i, function(msg) {
    msg.send('Simmer down now, Jax.');
  });
};
