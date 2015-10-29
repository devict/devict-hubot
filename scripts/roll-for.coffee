# Description:
#   D&D Style Rolls. Settle Arguments, defeat trolls. d20 for now, cuz I got shit to do.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   bot roll for <whatever>
#   bot roll <number of dice>d<sides> for <whatever> - e.g. roll 1d6 for coding

module.exports = (robot) ->
  robot.respond /roll for (.+)/i, (msg) ->
    number = roll_a_die(20)
    reason = msg.match[1]
    username = msg.message.user.name

    if number == 20
      msg.send("#{username} rolled a NAT 20 for #{reason}!!!")
    else
      msg.send("#{username} rolled a #{number} for #{reason}.")

  robot.respond /roll (.+)d(.+) for (.+)/i, (msg) ->
    total = 0
    number_of_dice = parseInt(msg.match[1])
    number_of_sides = parseInt(msg.match[2])
    reason = msg.match[3]
    username = msg.message.user.name

    while number_of_dice != 0
      the_roll = roll_a_die(number_of_sides)
      total += the_roll
      msg.send("#{username} rolls 1 d#{number_of_sides} for #{the_roll}")
      number_of_dice--

    msg.send("#{username} rolled a total of #{total} for #{reason}")



  roll_a_die = (number_of_sides) ->
    Math.floor(Math.random() * parseInt(number_of_sides))+1
