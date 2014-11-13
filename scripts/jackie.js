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
  robot.hear(/.+/i, function(msg) {
    if (msg.message.user.name.toLowerCase() === 'jackiesummervill') {
      msg.send('Simmer down now, Jax. --> http://devict.org/conduct');
    }
  });
};
