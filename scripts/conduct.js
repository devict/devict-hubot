// Description:
//   Remind members about our code of conduct
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bot conduct - Remind the current channel about the devICT code of conduct
//   bot conduct #hubot - Remind the #hubot channel about the devICT code of conduct (omit "bot" and this can be in a DM to bot)

module.exports = (robot) => {
    robot.respond(/(?:code(?: of)? )?conduct(?:\s?(#[\w-]+))?/i, (msg) => {
        let msgs = [
            "devICT is dedicated to a safe and harassment-free experience for " +
                "everyone. We do not tolerate harassment in any form. If you have any " +
                "questions or concerns please feel free to reach out to one of the devICT " +
                "organizers. Our anti-harassment policy can be found at: " +
                "https://devict.org/conduct",
            "Generally let's keep things PG."
        ]
        if (typeof msg.match[1] !== 'undefined') { // a channel was specified
            for (let i = 0; i < msgs.length; i++) {
                robot.messageRoom(msg.match[1], msgs[i])
            }
        } else {
            for (let i = 0; i < msgs.length; i++) {
                msg.send(msgs[i])
            }
        }
    })
}
