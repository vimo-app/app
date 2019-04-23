(function(){
  let imageList = document.querySelector('#image-list');
  let sliderContent = document.querySelector('#slider-content')
  let next = document.querySelector('#next');
  let prev = document.querySelector('#prev');
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  let imageClicked = false;

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
    console.log(element);
  }

  function refreshCanvas(){
    if(!imageClicked){ return; }
    
  }

  refreshClickable();
  refreshCanvas();
})();