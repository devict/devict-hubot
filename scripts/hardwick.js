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
//   bot hardwick odds: Shows the odds of Hardwick appearing on points awarded
//	 bot hardwick set odds: Set Hardwick's odds of appearing

module.exports = function(robot) {
	hardwick_odds_default = 100;
	hardwick_odds_minimum = 25;

	robot.on("plus-one", function(plusone) {
		// check brain for hardwick_odds, initialize to hardwick_odds_default if not present (we don't want to see TOO much Hardwick)
		if (robot.brain.get('hardwick_odds') === null) {
			hardwick_odds = hardwick_odds_default;
			robot.brain.set('hardwick_odds', hardwick_odds);
		} else {
			hardwick_odds = robot.brain.get('hardwick_odds');
		}

		// only do this if the direction is "++"
		if (plusone.direction == "++") {
			var this_instance = Math.floor(Math.random() * hardwick_odds + 1);
			if (this_instance === 1) {
				pointses = [
					"https://cldup.com/53iPKQdOk3.jpg",
					"https://cldup.com/aToe7eLq0w.gif",
					"https://cldup.com/FrFTwyDzSe.gif",
					"https://cldup.com/mww1lkRcIs.gif",
					"https://cldup.com/AgLwGKH25W.gif",
					"https://cldup.com/cz0jDXA5q_-2000x2000.jpeg",
					"https://cldup.com/mJQwSu6hrJ.gif"
				];
				var rand_img = pointses[Math.floor(Math.random() * pointses.length) - 1];
				robot.messageRoom(plusone.room, rand_img);
			}
		}
	});

	// request hardwick odds from bot
	robot.respond(/hardwick odds/i, function(res) {
		hardwick_odds = robot.brain.get('hardwick_odds');
		res.send("Hardwick will announce points randomly 1/" + hardwick_odds + " chance of appearing.");
	});

	// tell hardwick only to show up every n times points are awarded
	robot.respond(/hardwick set odds (\d+)/i, function(res) {
		new_n = res.match[1];
		switch (true) {
			case (new_n < 1):
				res.reply("That's a ridiculous number. Try again.");
				break;
			case (new_n == 1):
				res.reply("You want Hardwick to show up every single time someone earns points? No.");
				break;
			case (new_n > 1 && new_n < hardwick_odds_minimum):
				res.reply("Hardwick chooses to appear with probablility of no more than 1/" + hardwick_odds_minimum + ".");
				break;
			default:
				robot.brain.set('hardwick_odds', new_n);
				res.send("New Hardwick odds: 1/" + new_n + ".");
				break;
		}
	});
};