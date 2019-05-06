var request = require('request');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err){
          console.log('Error: ', err.statusCode);
         })
         .on('response',function(response){
            console.log('Downloading image...');
         })
         .on('end', function(){
          console.log('Download complete.');
         })
         .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg')


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function (object){
      console.log(object.avatar_url);
    });
});
