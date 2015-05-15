// Description:
//   Helpful explanations about the bot
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot explain [the] points [to] [<someone>] - explains the point system

module.exports = function(robot) {
  robot.respond(/explain(?: the)? points(?: to)?( .*)?/i, function(msg) {
    var url = 'https://cldup.com/gf-BpR6uhu.jpg';

    if (msg.match[1] != undefined) {
      msg.send(msg.match[1].trim() + ': ' + url)
    } else {
      msg.send(url);
    }
  });
};
