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
      msg.send("#{username} rolled a NAT 20 for #{reason}. Critial Success!!!")
    else if number == 1
      msg.send("#{username} rolled a NAT 1 for #{reason}. Critical Fail!")
    else
      msg.send("#{username} rolled a #{number} for #{reason}.")

  robot.respond /roll (\d+)d(\d+)( for .+)?/i, (msg) ->
    total = 0
    descriptor = "total of"
    number_of_dice = parseInt(msg.match[1])
    number_of_sides = parseInt(msg.match[2])
    username = msg.message.user.name
    roll_log = []
    is_only_one_die = (number_of_dice == 1)    

    if number_of_dice > 0 
      while number_of_dice != 0
        the_roll = roll_a_die(number_of_sides)
        total += the_roll
        roll_log.push(the_roll)
        number_of_dice--

    roll_summary = ""
    if roll_log.length > 1
      roll_summary = "[ "
      i = 0

      if roll_log.length > number_of_sides
        num_rolls_hash = { } 
        while i < roll_log.length
          k = roll_log[i++]
          if !num_rolls_hash[k]?
            num_rolls_hash[k] = 0
          num_rolls_hash[k]++     
        for k,v of num_rolls_hash
          roll_summary += k + ": " + v + ", " 
      else
        while i < roll_log.length
          roll_summary += roll_log[i++] + ", "

      roll_summary = roll_summary.substring(0, roll_summary.length - 2) + " ]"

    reason = ""

    if msg.match[3]?
      reason = msg.match[3]
    
    reason += "."

    if is_only_one_die && (total == 1 || (number_of_sides == 20 && total == 20))
        descriptor = "NAT"
        if total == 1
            roll_summary = "Critical Fail!"
        else
            roll_summary = "Critical Success!!!"

    msg.send("#{username} rolled a #{descriptor} #{total}#{reason} #{roll_summary}")

  roll_a_die = (number_of_sides) ->
    if !isNaN(number_of_sides)
      return Math.floor(Math.random() * parseInt(number_of_sides))+1

    return 0
    
