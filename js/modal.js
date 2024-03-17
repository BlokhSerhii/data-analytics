// попап вибраного проекту
function showMessageIcon(src, content) {

  let modal = document.createElement('div');
  modal.classList.add('modal');
  
  let modalWin = document.createElement('div');
  modalWin.classList.add('modal__win');

  let modalInner = document.createElement('div');
  modalInner.classList.add('modal__inner');
  
  let modalImg = document.createElement('img');
  modalImg.classList.add('modal__img');
  modalImg.src = src.src;

  modalInner.appendChild(modalImg)

  let clothIcon = document.createElement('span');
  clothIcon.classList.add('modal__cloth-icon');
  clothIcon.innerHTML = '&#10006';

  modalWin.appendChild(clothIcon);
  modalWin.appendChild(modalInner);
  modal.appendChild(modalWin);
  document.body.appendChild(modal);
  
  modal.addEventListener('click', function(e) {

    if (!modalWin.contains(e.target)) {
      modal.remove();
    }
  });
  
  clothIcon.addEventListener('click', function() {
    modal.remove();
  });
}
// ------------------------------

// попап очікування 
function showSending() {

  let modal = document.createElement('div');
  modal.classList.add('modal');
  
  let modalWin = document.createElement('div');
  modalWin.classList.add('sending-win');
  
  let modalImg = document.createElement('img');
  modalImg.classList.add('sending-win__sending');
  modalImg.src = 'img/sending.gif';
  modalImg.alt = 'Image';
  
  modalWin.appendChild(modalImg);
  modal.appendChild(modalWin);
  
  document.body.appendChild(modal);
}

function removeSending() {

  let modal = document.querySelector('.modal');
  modal.remove();
};
// ------------------------------