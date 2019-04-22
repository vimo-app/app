const express = require('express');
const router = express.Router();
const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_ID);

router.get('/search/:query', (req, res, next) => {
  flickr.photos.search({
    text: req.params.query,
    page: Math.ceil(Math.random()*10)
  })
  .then(photos => {
    res.status(200).json({status: 200, response: JSON.parse(photos.text).photos.photo});
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error:err});
  });
});

router.get('/photos/:id', (req, res, next) => {
  flickr.photos.getInfo({
    photo_id: req.params.id
  })
  .then(photo => res.status(200).json({status: 200, response: JSON.parse(photo.text)}))
  .catch(err => {
    console.error(err);
    res.status(500).json({error:err});
  });
});
router.get('/photos/sizes/:id', (req, res, next) => {
  flickr.photos.getSizes({
    photo_id: req.params.id
  })
  .then(photo => res.status(200).json({status: 200, response: JSON.parse(photo.text).sizes.size}))
  .catch(err => {
    console.error(err);
    res.status(500).json({error:err});
  });
});

module.exports = router;