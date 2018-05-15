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
  robot.respond(/channels? ?([0-9]+)?/i, function(msg) {

    var page = 0;

    if (msg.match[1] != undefined) {
      page = parseInt(msg.match[1]) - 1;
    }

    if (page < 0) {
      return
    }

    var room = robot.adapter.client.rtm.dataStore.getDMByName(msg.message.user.name);

    if (page >= pages.length) {
      robot.send({room: room.id}, "There are no more pages!");
      return
    }

    var text = pages[page].trim()
    text += "\n\n";
    if (page+1 < pages.length) {
      text += "_This is page "+(page+1)+" of "+(pages.length)+". Respond `channels "+(page+2)+"` in this DM for the next page._";
    } else {
      text += "_That's the end of the channel guide! Happy Slacking!_";
    }

    robot.send({room: room.id}, text);
  });
};
