// Description:
//   Some automatic responses to common / semi-common sayings.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   look at (this|that|it) - "look at that" guy
//   so good - bot agrees

// optOutUsers is a list of users who do not find value in hubot's
// helpful responses.
var optOutUsers = [
  'tyrosinase',
];

var shouldAbort = function(msg) {
  return optOutUsers.indexOf(msg.message.user.name) > -1;
};

module.exports = function(robot) {
  robot.hear(/\bso good\b/i, function(msg) {
    if (shouldAbort(msg)) { return; }

    robot.emit('slack.reaction', {
        message: msg.message,
        name: "so-good"
    });
  });

  robot.hear(/look at (this|that|it)/i, function(msg) {
    if (shouldAbort(msg)) { return; }

    robot.emit('slack.reaction', {
        message: msg.message,
        name: "look-at-that"
    });
  });

  //regex curtesy of Michael Neth -> (yo)?u([^a-zA-Z0-9]| a)?re? welcome
  robot.hear(/\b(yo)?u([^a-zA-Z0-9]| a)?re? welcome\b/i, function(msg) {
    if (shouldAbort(msg)) { return; }

    robot.emit('slack.reaction', {
        message: msg.message,
        name: "you-are-welcome"
    });
  });
};
