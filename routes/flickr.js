const express = require('express');
const router = express.Router();
const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_ID);

router.get('/home/photos', (req, res, next) => {
  flickr.photos.getRecent({
    per_page: 5
  })
  .then(photos => Promise.resolve(JSON.parse(photos.text).photos.photo))
  .then(recentPhotos => Promise.resolve(recentPhotos.map(obj => {
      let getInfo = flickr.photos.getInfo({
        photo_id: obj.id
      });
      let getImage = flickr.photos.getSizes({
        photo_id: obj.id
      });

      return Promise.all([getInfo, getImage])
        .then(promises => ({
          username: JSON.parse(promises[0].text).photo.owner.username,
          realname: JSON.parse(promises[0].text).photo.owner.realname,
          image: JSON.parse(promises[1].text).sizes.size.filter(obj => obj.label === 'Small 320')[0].source,
          url: JSON.parse(promises[1].text).sizes.size.filter(obj => obj.label === 'Small 320')[0].url
        }))
        .catch(err => console.error(err));
    })))
  .then(val => {
    Promise.all(val)
    .then(response => res.status(200).json({status: 200, response}))
    .catch(err => console.log(err));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error:err});
  });
});

module.exports = router;