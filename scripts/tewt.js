// Description:
//   Gassy humor
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot (tewt|fart|toot|vrrt)

module.exports = function(robot) {
  robot.respond(/\b(tewt|fart|toot|vrrt)\b/i, function(msg) {

    var faces = [
        ':anguished:',
        ':fearful:',
        ':hushed:',
        ':astonished:',
        ':yum:'
    ];

    var shart = Math.random() >= 0.5 ? '' : ':poop:';
    var faceIndex = Math.floor(Math.random() * faces.length); 

    msg.send(faces[faceIndex] + ':fart:' + shart);
  });
};
