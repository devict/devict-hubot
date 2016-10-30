# Description:
#   Remind members about our code of conduct
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot conduct - Remind the channel about the devICT code of conduct
#   hubot remind <username> of COC - Sends a DM to user with code of conduct

module.exports = (robot) ->
  robot.respond /(code( of)? )?conduct/i, (msg) ->
    msg.send("devICT is dedicated to a safe and harassment-free experience for " +
      "everyone. We do not tolerate harassment in any form. If you have any " +
      "questions or concerns please feel free to reach out to one of the devICT " +
      "organizers. Our anti-harassment policy can be found at: " +
      "https://devict.org/conduct")
    msg.send("Generally let's keep things PG.")

  robot.respond /remind (.*) of COC/i, (msg) ->
    reason = msg.match[1]
    msg.send("/dm #{reason} devICT is dedicated to a safe and harassment-free experience for " +
      "everyone. We do not tolerate harassment in any form. If you have any " +
      "questions or concerns please feel free to reach out to one of the devICT " +
      "organizers. Our anti-harassment policy can be found at: " +
      "https://devict.org/conduct")
    msg.send("/dm #{reason} Generally let's keep things PG.")