var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName){
      console.log(`Error occured - Please make sure the details are entered in following order: \n"node download_avatars.js <owner> <repo>"`);
      return;
    }

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

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err){})
         .on('response',function(response){})
         .on('end', function(){})
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  result.forEach(function (object){
    var filePath = 'avatars/' + object.login + '.jpg';
    downloadImageByURL(object.avatar_url, filePath);
  });
});

