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
  robot.hear(/look at (this|that|it)/i, function(msg) {
    var images = [
      'http://cl.ly/image/2S2Y3B36443T/Screen%20Shot%202014-09-12%20at%2010.01.24%20PM.png',
      'https://cldup.com/pI8HiONY_L.png',
      'https://cldup.com/0HtaPe3xLB.jpg',
      'https://cldup.com/N6CwJUnci1.png',
      'https://cldup.com/zEHrnpcqRm.jpg',
      'https://cldup.com/sGL_oezYfu.png',
      'https://cldup.com/RC1eGHtnR9.png',
      'https://cldup.com/nzwLw1PMJm.png',
      'https://cldup.com/krWEF4wyaa.png',
      'https://cldup.com/XeM2T-lfKr.png',
      'https://cldup.com/IUVog8P4AV.png'
    ];

    msg.send(images[Math.floor(Math.random() * images.length)]);
  });
};
