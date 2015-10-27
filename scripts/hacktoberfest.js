// Description:
//   Bot teases us with hacktoberfest shirt
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   git pull - bot shows us the goods

module.exports = function(robot) {
  robot.hear(/git pull/i, function(msg) {
    msg.send('https://www.digitalocean.com/company/blog/hacktoberfest-is-back/hero-e82f3f9e.png');
  });
};
