(function(){
  let login = document.querySelector('#login-button');
  let form = document.querySelector('#form');
  login.onclick = expandForm;
  
  function expandForm(){
    form.style.maxHeight = '500rem';
    form.style.opacity = 1;
    login.onclick = shrinkForm;
  }

  function shrinkForm(){
    form.style.maxHeight = 0;
    form.style.opacity = 0;
    login.onclick = expandForm;
  }
})();