

const homePage = document.querySelector(".header");
const toggleLan = document.querySelector(".menubar__lang");

window.addEventListener("scroll", function() {
  const rect = homePage.getBoundingClientRect();

  if(
    rect.top <= window.innerHeight / 2 &&
    rect.bottom >= window.innerHeight / 2
  ){
    toggleLan.classList.remove('hidden-lan');
  }
});

// обробник додавання класу active копкам menubar
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".page");
  const menubarLinks = document.querySelectorAll(".menubar__link");
  let currentSectionIndex = 0;

  window.addEventListener("scroll", function() {

    sections.forEach(function(section, index) {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSectionIndex = index;
      }
    });

    menubarLinks.forEach(function(link, index) {
      link.classList.remove("menubar-active");
      if (index === currentSectionIndex) {
        link.classList.add("menubar-active");
      }
    });
  });

  // Обробка переходу по пунктах меню menubar
  menubarLinks.forEach(function(link, index) {
    link.addEventListener("click", function(event) {

      // Прокручуємо до відповідньої секції
      sections[index].scrollIntoView({ behavior: "smooth" });

      menubarLinks.forEach(function(menuLink) {
        menuLink.classList.remove("menubar-active");
      });

      link.classList.add("menubar-active");
    });
  });
});
// ------------------------------

// обробник перемикача мови
const toggleLang = document.querySelector('.toggle-lang');
const langList = document.querySelector('.select-lang__list');

toggleLang.addEventListener('click', function (event) {

  event.stopPropagation();
  langList.classList.toggle('lang-list-open');
});

document.addEventListener('click', function () {

  langList.classList.remove('lang-list-open');
});
// ------------------------------

// обробник перемикача бургера
const toggleButton = document.querySelector('.toggle-burger');
const overlay = document.querySelector('.overlay');

toggleButton.addEventListener('click', function() {

  toggleButton.classList.toggle('burger-active');
  overlay.classList.toggle('overlay-open');
});


overlay.addEventListener('click', function(event) {

  if (overlay.contains(event.target)) {

    toggleButton.classList.toggle('burger-active');
    overlay.classList.toggle('overlay-open');
  }
});
// ------------------------------

// обробник виведення модального вікна портфоліо  
const certificateBtns = document.querySelectorAll('.certificateBtn');

certificateBtns.forEach(btn => {

  btn.addEventListener('click', function() {

    const src = btn.querySelector('.certificateImg');
    
    showMessageIcon(src);
  });
});

// ------------------------------

// оббробка відправки повідомленяя
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');

  form.addEventListener('submit', formSend);

  async function formSend(event) {

    event.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('file', formFile.files[0]);

    if (error === 0 ) {
      showSending();

      let response = await fetch ('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        let result = await response.json();

        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        removeSending();
      }
        else {
          alert.apply('Error sending email!');
        };
    }
      else {
        alert('Fill in the required fields!');
      };
  }


  function formValidate(form) {

    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++) {

      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('email')) {

        if (emailTest(input)) {
          formAddError(input);
          error++;
        };
      }
        else {
          if (input.value === '') {
            formAddError(input);
            error++;
          };
        }
    }

    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const formFile = document.getElementById('file');
  const formPreview = document.getElementById('preview');

  formFile.addEventListener('change', function () {

    var reader = new FileReader();

    reader.onload = function (event) {
      formPreview.textContent = formFile.files[0].name;
    };

    reader.onerror = function (event) {
      alert ("Error upload file!");
    };

    reader.readAsDataURL(formFile.files[0]);
  })
})
// ------------------------------