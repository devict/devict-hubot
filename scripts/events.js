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

var processTitle = function(title) {
  if (title === "Code & Coffee") {
    title = "☕ " + title
  } else if (title === "Study Hall") {
    title = "⇪ " + title
  } else if (title.startsWith(".NET Night")) {
    title = "♯ " + title
  } else if (title.startsWith("devICT Presents: ")) {
    title = "☆ " + title.substring(17)
  }

  return title
}

var eventMgr = {events: []}

eventMgr.add = function(group, title, time, url, location) {
  if (moment.tz(time, 'America/Chicago') > moment().add(2, 'months')) return

  if (location.length > 22) location = location.substr(0, 20) + '..'

  this.events.push({
    group: group,
    hosts: [group],
    title: processTitle(title),
    time: time,
    url: url,
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
  this.events = this.events.slice(0, n)
}

eventMgr.removeDuplicates = function() {

  // Filter this.events into this new array.
  var events = []

  // Keep a map of the event event titles we have seen. Ignore dupe events by
  // title but append dupe group names. i.e. Study Hall is WWC/devICT
  var seen = {}

  for (var i = 0; i < this.events.length; i++) {
    var e = this.events[i]

    // Is this a dupe?
    if (seen.hasOwnProperty(e.title)) {
      var idx = seen[e.title] // `events` index of first event in this series

      if (events[idx].hosts.indexOf(e.group) === -1) {
        events[idx].hosts.push(e.group)
      }

      continue
    }

    // push `e` into `events` and store its index in `seen`
    seen[e.title] = events.push(e) - 1
  }

  this.events = events
}

eventMgr.formatted = function() {
  var resp = '*Upcoming Events!* _(Recurring events only shown once)_'

  this.events.forEach(function(event) {
    var dateStr = moment.tz(event.time, 'America/Chicago').format('ddd MM/DD hh:mma')
    var hosts = event.hosts.join(' & ')
    var location = event.location ? event.location : '_Undefined_'
    resp += `
<${event.url}|${event.title}>
>*When:* ${dateStr} *Hosted by:* ${hosts} *Where:* ${location}.
`
  })

  return resp
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
            // TODO pass in better venue information so we can make it a map link
            var venue = (event.venue === undefined) ? '' : event.venue.name
            eventMgr.add(group, event.name, event.time, event.event_url, venue)
          })

          resolve()
        })
      })
    }

    Promise.all([
      meetupRequest('Women Who Code', wwcURL),
      meetupRequest('devICT', devictURL),
    ])
    .then(function(results) {
      eventMgr.sortTimeAscending()
      eventMgr.removeDuplicates()
      eventMgr.limitTo(25)
      msg.send({
        text: eventMgr.formatted(),
        unfurl_links: false,
      })
      eventMgr.reset()
    })
    .catch(function(err) {
      msg.send(err)
    })
  })
}
