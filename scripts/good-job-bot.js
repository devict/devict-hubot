// Description:
//   Bot did good
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot good job - bot thanks you
//   bot you are the best - bot blushes

module.exports = function(robot) {
  var responses = [
    'thanks',
    'you make me blush',
    'oh stop',
    'you are too kind'
  ];
  var emotes = [
    'tips hat',
    'bows',
    'curtsies',
    'blushes'
  ]
  robot.respond(/(good job|you rock|you rule|you( a|'?)re the best)/i, function(msg) {
    if (Math.random() > 0.5) {
      msg.emote(emotes[Math.floor(Math.random()*emotes.length)]);
    } else {
      msg.send(responses[Math.floor(Math.random()*responses.length)]);
    }
  });
};
