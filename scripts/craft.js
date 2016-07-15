// Description:
//   Search for minecraft crafting recipes
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   craft <item> - look for recipes for <item>

var Promise = require('es6-promise').Promise
var url = "https://www.minecraftcraftingguide.net/search/?s=";
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

module.exports = function(robot) {

  robot.respond(/craft (.*)/i, function(msg) {

    new Promise(function(resolve, reject) {
      var req = msg.http(url + encodeURIComponent(msg.match[1]));
      req.get()(function(err, res, body) {
        if (err) { return reject('Error making request: ' + err) }
        if (200 != res.statusCode) { return reject('Request returned status code: ' + res.statusCode) }

        resolve(body.replace(/[\n\t]/g, ""))
      })
    })
    .then(function(data) {
      var rows = xpath.select("//tbody/tr", new dom().parseFromString(data));

      if (rows.length === 0) {
        msg.send("No results found for " + msg.match[1]);
        return;
      }

      for (var i = 0; i < rows.length; i += 2) {
        var firstRow = rows[i];
        var secondRow = rows[i+1];

        // tr[0] td[0] span NAME
        var name = firstRow.childNodes[0].firstChild.firstChild;
        // tr[1] td[0] div img
        var img = secondRow.childNodes[0].firstChild.firstChild.attributes['3'].value; // TODO src is attribute 3... for now. This would be more resilient if we looked at the attribute name
        // tr[1] td[0] div span
        var desc = secondRow.childNodes[0].firstChild.childNodes[1].firstChild.data;
        // tr[1] td[1] div span
        var needs = secondRow.childNodes[1].firstChild;

        msg.send("Item: " + name + "\n" + desc + "\nNeeds: " + needs + "\nhttp:" + img);
      }
    })
    .catch(function(err) {
      msg.send(err);
    });

  });
};
