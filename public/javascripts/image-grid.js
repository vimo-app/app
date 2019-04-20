// (function(){
//   let links = document.querySelectorAll('.normal-content__image-grid a');
//   const maxWidth = 400;
//   const rowHeightVH = 20;
//   let img, ratio, width, height, originalRatio;
//   for(let link of links){
//     img = link.querySelector('img');
//     originalRatio = img.height/img.width;
//     width = img.width >= maxWidth ? maxWidth : img.width;
//     height = width*originalRatio;
//     ratio = width/height;
//     link.style = `flex-grow:${ratio*100};flex-basis:${ratio*rowHeightVH}vh;`;
//   }
// })();
/*
  --ratio: calc(var(--w) / var(--h));
  flex-grow: calc(var(--ratio) * 100);
  flex-basis: calc(var(--ratio) * var(--row-height));

--row-height: 20vh;
  */