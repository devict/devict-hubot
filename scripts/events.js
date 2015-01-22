// Description:
//   Get a list of upcoming devICT events
//
// Dependencies:
//   None
//
// Configuration:
//   The API method is using a signed request from Meetup so it's safe to
//   share/reuse. If this API key ever becomes invalid we will have to
//   regenerate it through
//   https://secure.meetup.com/meetup_api/console/?path=/2/events
//
// Commands:
//   hubot events - Print a list of upcoming devICT events

module.exports = function(robot) {
  robot.respond(/events/i, function(msg) {
    var url = 'http://api.meetup.com/2/events?status=upcoming' +
      '&order=time&limited_events=False&group_urlname=devict' +
      '&desc=false&offset=0&photo-host=public&format=json&page=20' +
      '&fields=&sig_id=73273692&sig=9cdd3af6b5a26eb664fe5abab6e5cf7bfaaf090e';

    msg.http(url).get()(function(err, res, body) {
      if (err) {
        msg.send('Error making request: ' + err);
        return;
      }
      if (200 != res.statusCode) {
        msg.send('Request returned status code: ' + res.statusCode);
        return;
      }

      var response = JSON.parse(body);
      var eventStr = '';
      response.results.forEach(function(event) {
        var dateStr = moment(event.time).tz('America/Chicago').format('dddd, MMM D, YYYY @ h:mm a');
        eventStr +=  dateStr + ' :: ' + event.name + ' @ ' + event.venue.name + '\n';
      });
      msg.send(eventStr.trim())
    });
  });
};
