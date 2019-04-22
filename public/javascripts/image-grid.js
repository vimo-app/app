window.onload = function(){
  let imageGrid = document.querySelector('#image-grid');
  let anchor,img,div;
  axios.get(`${window.location.origin}/flickr/home/photos`)
    .then(response => {
      let images = response.data.response;
      images.forEach(image => {
        anchor = document.createElement('a');
        img = document.createElement('img');
        div = document.createElement('div');
        anchor.setAttribute('href', image.url);
        img.setAttribute('src', image.image);
        div.setAttribute('class', 'normal-content__image-grid-author');
        div.innerHTML = `<span>${image.realname !== '' ? image.realname : image.username}</span>`;
        anchor.appendChild(img);
        anchor.appendChild(div);
        imageGrid.appendChild(anchor);
      });
    });
};