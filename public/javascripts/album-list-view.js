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

  let stage = new createjs.Stage('canvas');
  

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
    stage.clear();
    let element = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    if(selectedImage !== element){
      stage.removeAllChildren();
      
      selectedImage = element;
      img = new createjs.Bitmap(element.src);
      if(img.image.width > img.image.height){
        img.scale = canvas.width/img.image.width;
      }else if(img.image.height > img.image.width){
        img.scale = canvas.height/img.image.height; 
      }else{
        img.scale = canvas.height / img.image.height;
      }

      img.x = (stage.canvas.width - img.image.width * img.scaleX) / 2;
      img.y = (stage.canvas.height - img.image.height * img.scaleY) / 2;

      stage.addChild(img);
      imageClicked = true;
    }else{
      imageClicked = false;
      selectedImage = null;
      reloadCanvas();
    }
    stage.update();
    reloadCanvas();
  }

  function reloadCanvas(){
    if(!imageClicked){
      stage.removeAllChildren();
      stage.update();
    }
  }

  function resizeCanvas(){
    stage.canvas.width = canvas.parentNode.clientWidth;
    stage.canvas.height = stage.canvas.width*9/16;
  }

  window.onresize = resizeCanvas;

  refreshClickable();
  resizeCanvas();
})();