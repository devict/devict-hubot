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
#   bot roll <number of dice>d<sides> - e.g. roll 1d6

module.exports = (robot) ->
  robot.respond /roll for (.+)/i, (msg) ->
    number = roll_a_die(20)
    reason = msg.match[1]
    username = msg.message.user.name

    if number == 20
      msg.send("#{username} rolled a NAT 20 for #{reason}!!!")
    else
      msg.send("#{username} rolled a #{number} for #{reason}.")

  robot.respond /roll (\d+)d(\d+)/i, (msg) ->
    total = 0
    number_of_dice = parseInt(msg.match[1])
    number_of_sides = parseInt(msg.match[2])
    username = msg.message.user.name

    roll_summary = "[ "

    if number_of_dice > 0 
      while number_of_dice != 0
        the_roll = roll_a_die(number_of_sides)
        total += the_roll
        roll_summary += the_roll + ", "
        number_of_dice--

      roll_summary = roll_summary.substring(0, roll_summary.length-1)

    roll_summary += " ]"

    msg.send("#{username} rolled a total of #{total} " + roll_summary)

  robot.respond /roll (\d+)d(\d+) for (.+)/i, (msg) ->
    total = 0
    number_of_dice = parseInt(msg.match[1])
    number_of_sides = parseInt(msg.match[2])
    reason = msg.match[3]
    username = msg.message.user.name
    roll_summary = "[ "

    if number_of_dice > 0 
      while number_of_dice != 0
        the_roll = roll_a_die(number_of_sides)
        total += the_roll
        roll_summary += the_roll + ", "
        number_of_dice--

      roll_summary = roll_summar.substring(0, roll_summary.length-1)

    roll_summary += " ]"
    msg.send("#{username} rolled a total of #{total} for #{reason} " + roll_summary)

  roll_a_die = (number_of_sides) ->
    if !number_of_sides.isNaN() && number_of_sides < Infinity
      return Math.floor(Math.random() * parseInt(number_of_sides))+1

    return 0
    
