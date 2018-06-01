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

var _ = require('lodash')
var moment = require('moment-timezone')
var Promise = require('es6-promise').Promise
var AsciiTable = require('ascii-table')

var processTitle = function(title) {
  if (title === "Code & Coffee") {
    title = "☕ " + title
  } else if (title === "Study Hall") {
    title = "⇪ " + title
  } else if (title.startsWith(".NET Night")) {
    title = "♯ " + title
  } else if (title.startsWith("devICT Presents: ")) {
    title = "☆ " + title.substring(17)
  } else {
    title = "  " + title
  }

  if (title.length > 22) {
    title = title.substr(0, 20) + '..'
  }

  return title
}

var eventMgr = {events: []}

eventMgr.add = function(group, title, time, location) {
  if (moment.tz(time, 'America/Chicago') > moment().add(2, 'months')) return;

  if (location.length > 22) location = location.substr(0, 20) + '..';

  this.events.push({
    group: group,
    title: processTitle(title),
    time: time,
    location: location,
  })
}

// Sorts events by time with the next upcoming event first. In case of a tie we
// sort by group name putting devICT last.
eventMgr.sortTimeAscending = function() {
  this.events.sort(function(a, b) {
    var d = a.time - b.time
    if (d === 0) {
      return a == "devICT" ? (b == "devICT" ? 0 : -1) : 1
    }
    return d
  })
}

eventMgr.limitTo = function(n) {
  this.events = this.events.slice(0, n);
}

eventMgr.combineDuplicates = function() {
  // Group events by event name, time, and location, then drop the keys
  // since we don't need them.
  var groupedEvents = _.values(_.groupBy(this.events, function (e) {
    return [e.title, e.time, e.location].join(' | ');
  }))

  // Process the groups, combining any that have more than a single event
  var eventsCombined = _.map(groupedEvents, function (eGroup) {
    if (eGroup.length === 1) return eGroup[0];

    var event = eGroup[0];
    event.group = eGroup.map(function (e) { return e.group }).join('/')
    return event
  });

  // Set the combined events back to our main state
  this.events = eventsCombined;
}

eventMgr.asTableString = function() {
  var table = new AsciiTable('Upcoming Events')
  table.setHeading('When', 'Who', 'What', 'Where')

  this.events.forEach(function(event) {
    var dateStr = moment.tz(event.time, 'America/Chicago').format('ddd MM/DD hh:mma')
    table.addRow(dateStr, event.group, event.title, event.location)
  })

  var legend = "WWC = Women Who Code, OW = Open Wichita"
  return '```\n' + legend + '\n' + table.toString() + '\n```\nlots of our events happen at the same places\nThe Labor Party: http://bit.ly/2yLNw7T \nMakeICT: http://bit.ly/2zMRwmT'
}

eventMgr.reset = function() {
  this.events = []
}

module.exports = function(robot) {
  robot.respond(/events/i, function(msg) {
    var devictURL = 'https://api.meetup.com/2/events?offset=0&format=json' +
      '&limited_events=False&group_urlname=devICT&photo-host=public&page=20' +
      '&fields=&order=time&status=upcoming&desc=false&sig_id=73273692' +
      '&sig=8f90c3aff1c3055274bc6dffca9225f51754a928'

    var wwcURL = 'https://api.meetup.com/2/events?offset=0&format=json' +
      '&limited_events=False&group_urlname=WWCWichita&photo-host=public' +
      '&page=20&fields=&order=time&status=upcoming&desc=false' +
      '&sig_id=73273692&sig=4111c5adf6695f954bd7ae7dfd86896970b451f6'

    var makeictURL = 'https://api.meetup.com/2/events?offset=0&format=json&' +
      'limited_events=False&group_urlname=MakeICT&photo-host=public' +
      '&page=20&fields=&order=time&desc=false&status=upcoming&' +
      'sig_id=15434981&sig=5da76a33f42c53199e5d7f97a3ed5340f3cc2e61'

    var openwichitaURL = 'https://api.meetup.com/2/events?offset=0&format=json&' +
      'limited_events=False&group_urlname=openwichita&photo-host=public&' +
      'page=20&fields=&order=time&desc=false&status=upcoming' +
      '&sig_id=15434981&sig=25dca881d2d1fc821fe708f3687c83f451c1b683';

    var meetupRequest = function(group, url) {
      return new Promise(function(resolve, reject) {
        msg.http(url).get()(function(err, res, body) {
          if (err) {
            return reject('Error making request: ' + err)
          }
          if (200 != res.statusCode) {
            return reject(group + ': Request returned status code: ' + res.statusCode)
          }

          JSON.parse(body).results.forEach(function(event) {
            var venue = (event.venue === undefined) ? '' : event.venue.name
            eventMgr.add(group, event.name, event.time, venue)
          })

          resolve()
        })
      })
    }

    Promise.all([
      meetupRequest('WWC', wwcURL),
      meetupRequest('devICT', devictURL),
      meetupRequest('MakeICT', makeictURL),
      meetupRequest('OW', openwichitaURL)
    ])
    .then(function(results) {
      eventMgr.sortTimeAscending()
      eventMgr.combineDuplicates()
      eventMgr.limitTo(25)
      msg.send(eventMgr.asTableString())
      eventMgr.reset()
    })
    .catch(function(err) {
      msg.send(err)
    })
  })
}
