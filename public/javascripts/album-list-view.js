(function(){
  let imageList = document.querySelector('#image-list');
  let sliderContent = document.querySelector('#slider-content')
  let next = document.querySelector('#next');
  let prev = document.querySelector('#prev');

  next.onclick = function(e){
    e.preventDefault();
    let firstImage = sliderContent.children[1];
    next.insertAdjacentElement('beforebegin', firstImage);
  };

  prev.onclick = function(e){
    e.preventDefault();
    let imageNumber = sliderContent.children.length;
    let lastImage = sliderContent.children[imageNumber-2];
    prev.insertAdjacentElement('afterend', lastImage);
  };

  function getImageData(){

  }
})();