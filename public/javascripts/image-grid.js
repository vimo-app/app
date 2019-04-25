(function(){
  let imageGrid = document.querySelector('#image-grid');
  let spinner = document.querySelector('#spinner');
  let searchBtn = document.querySelector('#search');
  let query = document.querySelector('#search-query');
  let anchor,img,div;
  let pageCounter = 1;
  
  function loadImages(search ,page = 1){
    axios.get(`${window.location.origin}/flickr/home/photos/${search}/${page}`)
    .then(response => {
      console.log(response.data);
      let moreImages = true;
      let images = response.data.response;
      for(let image of images){
        if(!image){
          moreImages = false;
          break;
        }
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
      }
      if(!moreImages){
        spinner.style.visibility = 'hidden';
        spinner.onclick = null;
        return;
      }
      spinner.onclick = loadImages.bind(null, search, pageCounter++);
      if(pageCounter < 5){ loadImages(search, pageCounter);}
    });
  }

  function search(){
    let search = query.value === '' ? 'landscape' : query.value;
    spinner.style.visibility = 'visible';
    imageGrid.innerHTML = '';
    pageCounter = 1;
    loadImages(search, pageCounter);
  }

  searchBtn.onclick = search;

  loadImages('landscape',pageCounter++);
  
})();
