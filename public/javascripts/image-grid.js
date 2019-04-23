(function(){
  let imageGrid = document.querySelector('#image-grid');
  let spinner = document.querySelector('#spinner');
  let anchor,img,div;
  let pageCounter = 1;
  
  function loadImages(page = 1){
    axios.get(`${window.location.origin}/flickr/home/photos/${page}`)
    .then(response => {
      let images = response.data.response;
      images.forEach(image => {
        anchor = document.createElement('a');
        img = document.createElement('img');
        div = document.createElement('div');
        anchor.setAttribute('href', image.url);
        anchor.setAttribute('target', '_blank');
        img.setAttribute('src', image.image);
        div.setAttribute('class', 'normal-content__image-grid-author');
        div.innerHTML = `<span>${image.realname !== '' ? image.realname : image.username}</span>`;
        anchor.appendChild(img);
        anchor.appendChild(div);
        imageGrid.appendChild(anchor);
      });
      spinner.onclick = loadImages.bind(null, pageCounter++);
      if(pageCounter < 5){ loadImages(pageCounter);}
    });
  }
  loadImages(pageCounter)
  
})();
