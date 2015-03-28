// Description:
//   Get a list of upcoming devICT events
//
// Dependencies:
//   None
//
// Configuration:
//   The API methods are using signed requests from Meetup so they're safe to
//   share/reuse. If an API key ever becomes invalid we can regenerate it at
//   https://secure.meetup.com/meetup_api/console/?path=/2/events
//
// Commands:
//   hubot events - Print a list of upcoming devICT events

var moment = require('moment-timezone')
var Promise = require('es6-promise').Promise
var AsciiTable = require('ascii-table')

var eventMgr = {events: []}
eventMgr.add = function(group, title, time, location) {
  this.events.push({
    group: group,
    title: title,
    time: time,
    location: location,
  })
}

eventMgr.sortTimeAscending = function() {
  this.events.sort(function(a, b) { return a.time - b.time })
}

eventMgr.asTableString = function() {
  var table = new AsciiTable('Upcoming Events')
  table.setHeading('When', 'Who', 'What', 'Where')

  this.events.forEach(function(event) {
    var dateStr = moment.tz(event.time, 'America/Chicago').format('ddd, MMM DD @ hh:mm a')
    table.addRow(dateStr, event.group, event.title, event.location)
  })

  return '```\n' + table.toString() + '\n```'
}

eventMgr.reset = function() {
  this.events = []
}

module.exports = function(robot) {
  robot.respond(/events/i, function(msg) {
    var devictURL = 'http://api.meetup.com/2/events?status=upcoming' +
      '&order=time&limited_events=False&group_urlname=devict' +
      '&desc=false&offset=0&photo-host=public&format=json&page=20' +
      '&fields=&sig_id=73273692&sig=9cdd3af6b5a26eb664fe5abab6e5cf7bfaaf090e'

    var wwcURL = 'https://api.meetup.com/2/events?offset=0&format=json' +
      '&limited_events=False&group_urlname=WWCWichita&photo-host=public' +
      '&page=20&fields=&order=time&status=upcoming&desc=false' +
      '&sig_id=73273692&sig=4111c5adf6695f954bd7ae7dfd86896970b451f6'

    var meetupRequest = function(group, url) {
      return new Promise(function(resolve, reject) {
        msg.http(url).get()(function(err, res, body) {
          if (err) {
            return reject('Error making request: ' + err)
          }
          if (200 != res.statusCode) {
            return reject('Request returned status code: ' + res.statusCode)
          }

          JSON.parse(body).results.forEach(function(event) {
            eventMgr.add(group, event.name, event.time, event.venue.name)
          })

          resolve()
        })
      })
    }

    Promise.all([
      meetupRequest('WWC', wwcURL),
      meetupRequest('devICT', devictURL)
    ])
    .then(function(results) {
      eventMgr.sortTimeAscending()
      msg.send(eventMgr.asTableString())
      eventMgr.reset()
    })
    .catch(function(err) {
      msg.send(err)
    })
  })
}
