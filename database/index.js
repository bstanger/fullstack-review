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
    Repo.findOne({ "url": repo.url }, function(err, doc){
      if(!doc){
        let newRepo = new Repo({
          title: repo.name,
          url: repo.url,
          creator: repo.owner.login,
          forksCount: repo.forks
        });
        newRepo.save(function(err){
          if(err) console.log(err);
        });
      }
    });
    // Repo.find({ "url": repo.url }).upsert().updateOne({
    //   "$setOnInsert": {"title": repo.name, "url": repo.url, "creator": repo.owner.login, "forksCount": repo.forks}
    // });
    // Repo.findOneAndUpdate(
    //   {url: repo.url},
    //   newRepo,
    //   {upsert: true, new: true},
    //   function (err, doc) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log(doc);
    //     }
    //   }
    // )
  })
}

module.exports.save = save;
