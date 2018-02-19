const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  title: String,
  url: String,
  creator: String,
  forksCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (gitResponse) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  console.log(gitResponse);
  console.log("in Save function of db index.js");

  gitResponse.forEach(function(repo){
    let newRepo = new Repo({
      title: repo.name,
      url: repo.url,
      creator: repo.owner.login,
      forksCount: repo.forks
    });
    console.log('newRepo ', newRepo);
    Repos.findOneAndUpdate(
      {url: repo.url},
      newRepo,
      {upsert: true, new: true},
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    )

  })
}

module.exports.save = save;
