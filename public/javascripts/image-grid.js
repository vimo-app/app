window.onload = function(){
  axios.get(`${window.location.origin}/flickr/home/photos`)
    .then(response => {
      let images = response.data.response;
    });
};