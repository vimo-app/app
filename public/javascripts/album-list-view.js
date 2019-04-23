(function(){
  let imageList = document.querySelector('#image-list');
  let sliderContent = document.querySelector('#slider-content')
  let next = document.querySelector('#next');
  let prev = document.querySelector('#prev');
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  let imageClicked = false;
  let selectedImage;
  let img;

  next.onclick = function(e){
    e.preventDefault();
    let firstImage = sliderContent.children[1];
    next.insertAdjacentElement('beforebegin', firstImage);
    refreshClickable();
  };

  prev.onclick = function(e){
    e.preventDefault();
    let imageNumber = sliderContent.children.length;
    let lastImage = sliderContent.children[imageNumber-2];
    prev.insertAdjacentElement('afterend', lastImage);
    refreshClickable();
  };

  function refreshClickable(){
    for(let i = 1, max = sliderContent.children.length - 2; i < max; i += 1){
      sliderContent.children[i].onclick = getImageInfo;
    }
  }

  function getImageInfo(e){
    let element = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    if(selectedImage !== element){ 
      let originalRatio = element.width/element.height;
      img = document.createElement('img');
      img.src = element.src;
      if(originalRatio >= 1){
        img.width = canvas.width;
        img.height = img.width/originalRatio;
      }else{
        img.height = canvas.height;
        img.width = img.height/originalRatio;
      }
      imageClicked = true;
      selectedImage = element; 
    }else{
      imageClicked = false;
      selectedImage = null;
    }
    refreshCanvas(img);
  }

  function refreshCanvas(img){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!imageClicked){ 
      return; 
    }

    ctx.drawImage(img, canvas.width/2 - img.width/2, canvas.height/2 - img.height/2, img.width, img.height);
    
  }

  refreshClickable();
  refreshCanvas();
})();