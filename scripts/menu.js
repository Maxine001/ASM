
const sideMenu = document.querySelector('aside');


document.querySelector('.js-menu-btn').addEventListener('click', () => {
  if(sideMenu.style.display === 'block') {
    sideMenu.style.display = 'none';
  }else{
    sideMenu.style.display = 'block';
  }
  
});

