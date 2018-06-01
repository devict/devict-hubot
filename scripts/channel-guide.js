// Description:
//   Tell new members about all of our Slack channels.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot channels - starts explaining our channels
//   bot channels [number] - gives the next page of our channel guide

const fs = require("fs");

var pages = fs.readFileSync('scripts/channel-guide.txt').toString().split("<!--split-->");

module.exports = function(robot) {
  var send = function(person, page) {
    if (page < 0) {
      return
    }
    if (page >= pages.length) {
      robot.send({room: person}, "There are no more pages!");
      return
    }

    var text = pages[page].trim()
    text += "\n\n";
    if (page+1 < pages.length) {
      text += "_This is page "+(page+1)+" of "+(pages.length)+". Respond `channels "+(page+2)+"` in this DM for the next page._";
    } else {
      text += "_That's the end of the channel guide! We’re glad you joined us and feel free to reach out anytime with questions. Happy Slacking!_";
    }

    robot.send({room: person}, text);
  };

  // Give a page of the channel guide when someone asks for it. Default to page 1 (index 0).
  robot.respond(/channels? ?([0-9]+)?/i, function(msg) {
    var page = 0;
    if (msg.match[1] != undefined) {
      page = parseInt(msg.match[1]) - 1;
    }

    var room = robot.adapter.client.rtm.dataStore.getDMByName(msg.message.user.name);
    send(room.id, page);
  });

  robot.enter(function(msg) {
    // Give page 1 to new members when they join #general.
    var general = robot.adapter.client.rtm.dataStore.getChannelByName('#general');

    if (general.id !== msg.message.room) {
      return;
    }

    var page = 0;

    var room = robot.adapter.client.rtm.dataStore.getDMByName(msg.message.user.name);
    send(room.id, page);
  });
};
