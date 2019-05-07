var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  //If the user does not specify both arguments, the program terminate with an error message letting the user know about the problem.
  if(!repoOwner || !repoName){
      console.log(`Error occured - Please make sure the details are entered in following order: \n"node download_avatars.js <owner> <repo>"`);
      return;
    }

  //It first create a file named 'avatars' in the current directory when the function invoked.
  fs.mkdir('./avatars',function(){});

  //import github token from another module
  var token = require('./secrets').GITHUB_TOKEN;

  //concatenate repoOwner and repoName into url
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  //request the list of contributors in an array and pass it as an parameters to cb function
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

//download an image and save it to the local path by passing the image's URL and a local path as the parameters
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err){})
         .on('response',function(response){})
         .on('end', function(){})
         .pipe(fs.createWriteStream(filePath));
}

//support command line arguments when function is called
//callback function: create filePath for each contributors using their 'login' name, then pass it into downloadImageByURL
getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  result.forEach(function (object){
    var filePath = 'avatars/' + object.login + '.jpg';
    downloadImageByURL(object.avatar_url, filePath);
  });
});

