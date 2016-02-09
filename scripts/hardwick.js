// Description:
//   Every n times someone gets points, post a pic of Chris Hardwick giving out points
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot hardwick count: Echoes the hardwick count to the channel (how many times points have been awarded since the last Hardwick)
//	 bot hardwick interval: Echoes hardwick_n - the frequency with which Hardwick appears (every n times points are awarded)
//	 bot hardwick reset: resets the hardwick count to 0
//	 bot hardwick show every n: changes hardwick_n interval as specified

module.exports = function(robot) {
	robot.on("plus-one", function(plusone) {
		// check brain for n, initialize to 25 if not present (we don't want to see TOO much Hardwick)
		if (robot.brain.get('hardwick_n') === null) {
			hardwick_n = 25;
			robot.brain.set('hardwick_n', hardwick_n);
		} else {
			hardwick_n = robot.brain.get('hardwick_n');
		}

		// only do this if the direction is "++"
		if (plusone.direction == "++") {
			if (robot.brain.get('hardwick') !== null) {
				hardwick = robot.brain.get('hardwick');
				hardwick++;
				if (hardwick > 0 && hardwick % hardwick_n === 0) {
					// only do this every n times
					// number of times points have been assigned IS divisible by n; output an image
					pointses = [
						"https://cldup.com/53iPKQdOk3.jpg",
						"https://cldup.com/aToe7eLq0w.gif",
						"https://cldup.com/FrFTwyDzSe.gif",
						"https://cldup.com/mww1lkRcIs.gif",
						"https://cldup.com/AgLwGKH25W.gif",
						"https://cldup.com/cz0jDXA5q_-2000x2000.jpeg",
						"https://cldup.com/mJQwSu6hrJ.gif"
					];
					var rand = pointses[Math.floor(Math.random() * pointses.length)];
					robot.messageRoom(plusone.room, rand);

					// reset the count to 0
					robot.brain.set('hardwick', 0);
				} else {
					// not divisible by n. set to new incremented value and move on
					robot.brain.set('hardwick', hardwick);
				}
			} else {
				// initialize hardwick to 1
				robot.brain.set('hardwick', 1);
			}
		}
	});

	// request hardwick count from bot
	robot.respond(/hardwick count/i, function(res) {
		hardwick = robot.brain.get('hardwick');
		res.send("Hardwick count is " + hardwick + ".");
	});

	// request hardwick interval from bot
	robot.respond(/hardwick interval/i, function(res) {
		hardwick = robot.brain.get('hardwick_n');
		res.send("Hardwick will announce points every " + hardwick_n + " time(s) points are awarded.");
	});

	// allow manual reset of n to 0
	robot.respond(/hardwick reset/i, function(res) {
		robot.brain.set('hardwick', 0);
		res.send("Hardwick reset to 0. Hardwick sad. :-(");
	});

	// tell hardwick only to show up every n times points are awarded
	robot.respond(/hardwick show every (\d+)/i, function(res) {
		new_n = res.match[1];
		if (new_n > 1) {
			robot.brain.set('hardwick_n', new_n);
			res.send("Hardwick will now announce points every " + new_n + " time(s) points are awarded.");
		} else {
			res.reply("That's a ridiculous number. Try again.");
		}
	});
};