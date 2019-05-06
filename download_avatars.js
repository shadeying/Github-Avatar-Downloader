var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var info = '';

  request.get('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors')
         .on('error', function (err){
          console.log(err.statusCode + " " + err.statusMessage);
         })
         .on('data', function(data){
          info += data;
         })
         .on('end', function (){
          if(!err){
            var err = null;
          }
          cb(err, info);
         })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
