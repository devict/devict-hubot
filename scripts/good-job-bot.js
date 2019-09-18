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

const ED_MANGIMELLI = 'U6GRL0V7T';

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
  ];

  var noThanksEd = [
    'i don\'t believe you even for a second, Ed',
    'your words mean nothing to me, Ed',
    'thanks, but actually no thanks, Ed',
    'leave me alone already, Ed!!1!',
    'why don\'t you make like a tree and get out of here Ed!!!!'
  ];

  robot.respond(/(good job|you rock|you rule|you( a|'?)re (the best|cool))/i, function(msg) {
    if (msg.message.user.id === ED_MANGIMELLI) {
      msg.send(msg.random(noThanksEd));
      return;
    }

    if (Math.random() > 0.5) {
      msg.emote(msg.random(emotes));
    } else {
      msg.send(msg.random(responses));
    }
  });
};
