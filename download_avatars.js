var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var token = require('./secrets').GITHUB_TOKEN;

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function (object){
      console.log(object.avatar_url);
    });
});
