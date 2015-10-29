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

module.exports = (robot) ->
  robot.respond /roll for (.+)/i, (msg) ->
    number = Math.floor(Math.random() * 20)+1
    rolled_for = msg.match[1]
    username = msg.message.user.name

    if number == 20
      msg.send(username + " rolled a NAT 20 for " + rolled_for + "!!!")
    else
      msg.send(username + " rolled a " + number + " for " + rolled_for + ".")
