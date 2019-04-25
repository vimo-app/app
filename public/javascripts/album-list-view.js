(function(){
  let imageList = document.querySelector('#image-list');
  let sliderContent = document.querySelector('#slider__content');
  let widget = document.querySelector('#widget');
  let widgetShow = document.querySelector('#widget-show');
  let widgetHide = document.querySelector('#widget-hide');
  let widgetTools = document.querySelector('#widget-tools');
  let next = document.querySelector('#next');
  let prev = document.querySelector('#prev');
  let canvas = document.querySelector('#canvas');
  let filters = {
    brightness: {
      label: document.querySelector('#brightness-label'),
      input: document.querySelector('#brightness'),
    },
    contrast: {
      label: document.querySelector('#contrast-label'),
      input: document.querySelector('#contrast'),
    },
    hue: {
      label: document.querySelector('#hue-label'),
      input: document.querySelector('#hue'),
    },
    saturation: {
      label: document.querySelector('#saturation-label'),
      input: document.querySelector('#saturation'),
    },
    blurX: {
      label: document.querySelector('#blur-x-label'),
      input: document.querySelector('#blur-x'),
    },
    blurY: {
      label: document.querySelector('#blur-y-label'),
      input: document.querySelector('#blur-y'),
    },
    blurQuality: {
      label: document.querySelector('#blur-quality-label'),
      input: document.querySelector('#blur-quality'),
    },
  };
  let imageClicked = false;
  let selectedImage;
  let img, bmp;

  filters.brightness.input.oninput = changeLabelValue;
  filters.contrast.input.oninput = changeLabelValue;
  filters.hue.input.oninput = changeLabelValue;
  filters.saturation.input.oninput = changeLabelValue;
  filters.blurX.input.oninput = changeLabelValue;
  filters.blurY.input.oninput = changeLabelValue;
  filters.blurQuality.input.oninput = changeLabelValue;

  let stage = new createjs.Stage('canvas');
  createjs.Ticker.addEventListener("tick", stage);
  let containerMeasures = canvas.parentNode.getBoundingClientRect();
  stage.canvas.width = containerMeasures.width;
  stage.canvas.height = containerMeasures.width*9/16;

  let slideNext = function(e){
      e.preventDefault();
      let firstImage = sliderContent.children[1];
      next.insertAdjacentElement('beforebegin', firstImage);
      refreshClickable();
  };

  let slidePrev = function(e){
    e.preventDefault();
    let imageNumber = sliderContent.children.length;
    let lastImage = sliderContent.children[imageNumber-2];
    prev.insertAdjacentElement('afterend', lastImage);
    refreshClickable();
  };

  next.onclick = slideNext;
  prev.onclick = slidePrev;

  function refreshClickable(){
    for(let i = 1, max = sliderContent.children.length - 2; i < max; i += 1){
      sliderContent.children[i].onclick = getImageInfo;
    }
  }

  function getImageInfo(e){
    stage.clear();
    let element = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    if(selectedImage !== element){
      resetFilters();
      if(sliderContent.children[2].children[0] === element){ slidePrev(e);}
      if(sliderContent.children[4].children[0] === element){ slideNext(e);}
      if(sliderContent.children[1].children[0] === element){ slidePrev(e); slidePrev(e);}
      if(sliderContent.children[5].children[0] === element){ slideNext(e); slideNext(e);}
      stage.removeAllChildren();

      canvas.style.display = 'block';
      showWidget();
      setTimeout(() => {
        canvas.style.opacity = 1;
      }, 300);
      
      selectedImage = element;
      img = document.createElement('img');
      img.crossOrigin = "Anonymous";
      img.src = element.src;
      bmp = new createjs.Bitmap(img);
      if(bmp.image.width > bmp.image.height){
        bmp.scale = canvas.width/bmp.image.width;
      }else if(bmp.image.height > bmp.image.width){
        bmp.scale = canvas.height/bmp.image.height; 
      }else{
        bmp.scale = canvas.height / bmp.image.height;
      }

      bmp.x = (stage.canvas.width - bmp.image.width * bmp.scaleX) / 2;
      bmp.y = (stage.canvas.height - bmp.image.height * bmp.scaleY) / 2;

      stage.addChild(bmp);
      imageClicked = true;
    }else{
      imageClicked = false;
      selectedImage = null;
      canvas.style.opacity = 0;
      widget.style.transform = 'translateX(50rem)';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 300);
      setTimeout(() => {
        hideWidget();
        widget.style.transform = 'translateX(50rem)';
      }, 1500);
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

  widgetShow.onclick = showWidget;
  widgetHide.onclick = hideWidget;

  function showWidget(){
    widget.style.transform = `translateX(0)`;
    widgetShow.style.display = 'none';
    widgetHide.style.display = 'inline-block';
    widgetTools.style.opacity = 1;
  }
  function hideWidget(){
    widget.style.transform = `translateX(25rem)`;
    widgetHide.style.display = 'none';
    widgetShow.style.display = 'inline-block';
    widgetTools.style.opacity = 0;
  }

  function changeLabelValue(e){
    let element = e.target.id;
    switch(element){
      case 'brightness':
        filters.brightness.label.innerText = +e.target.value >= 100 ? `+${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `+0${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 0 ? `+00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -10 ? `-00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -100 ? `-0${Math.abs(parseInt(e.target.value)).toFixed(1)}` : `${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'contrast':
        filters.contrast.label.innerText = +e.target.value >= 100 ? `+${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `+0${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 0 ? `+00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -10 ? `-00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -100 ? `-0${Math.abs(parseInt(e.target.value)).toFixed(1)}` : `${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'hue':
        filters.hue.label.innerText = +e.target.value >= 100 ? `+${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `+0${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 0 ? `+00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -10 ? `-00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -100 ? `-0${Math.abs(parseInt(e.target.value)).toFixed(1)}` : `${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'saturation':
        filters.saturation.label.innerText = +e.target.value >= 100 ? `+${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `+0${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 0 ? `+00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -10 ? `-00${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= -100 ? `-0${Math.abs(parseInt(e.target.value)).toFixed(1)}` : `${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'blur-x':
        filters.blurX.label.innerText = +e.target.value >= 100 ? `${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `0${parseInt(e.target.value).toFixed(1)}` : `00${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'blur-y':
        filters.blurY.label.innerText = +e.target.value >= 100 ? `${parseInt(e.target.value).toFixed(1)}` : +e.target.value >= 10 ? `0${parseInt(e.target.value).toFixed(1)}` : `00${parseInt(e.target.value).toFixed(1)}`;
      break;
      case 'blur-quality':
        filters.blurQuality.label.innerText = +e.target.value < 10 ? `0${e.target.value}` : e.target.value;
      break;
    }
    applyFilters();
  }

  function applyFilters(){
    if(bmp){
      var color = new createjs.ColorMatrix()
            .adjustBrightness(+filters.brightness.input.value)
            .adjustContrast(+filters.contrast.input.value)
            .adjustHue(+filters.hue.input.value)
            .adjustSaturation(+filters.saturation.input.value);
      var blur = new createjs.BlurFilter(+filters.blurX.input.value, +filters.blurY.input.value, +filters.blurQuality.input.value);

      bmp.filters = [
        new createjs.ColorMatrixFilter(color),
        blur
      ];
      var bounds = bmp.getBounds();
      bmp.cache(0, 0, canvas.width*2, canvas.height*2);
      stage.update();
    }
  }

  function resetFilters(){
    filters.brightness.input.value = 0;
    filters.contrast.input.value = 0;
    filters.hue.input.value = 0;
    filters.saturation.input.value = 0;
    filters.blurX.input.value = 0;
    filters.blurY.input.value = 0;
    filters.blurQuality.input.value = 1;

    filters.brightness.label.innerText = '+000.0';
    filters.contrast.label.innerText = '+000.0';
    filters.hue.label.innerText = '+000.0';
    filters.saturation.label.innerText = '+000.0';
    filters.blurX.label.innerText = '+000.0';
    filters.blurY.label.innerText = '+000.0';
    filters.blurQuality.label.innerText = '01';
  }

  refreshClickable();
  resizeCanvas();
})();