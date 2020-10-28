function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  // modal.classList.toggle("show");//втрой вариант реализации
  document.body.style.overflow = ""; //восстанавливаем скроллинг страницы
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  // modal.classList.toggle("show");//втрой вариант реализации.
  document.body.style.overflow = "hidden"; //чтобы при открытом окне не скролилась страница сайта
  if (modalTimerId) {
    console.log(modalTimerId);
    clearInterval(modalTimerId); //чтобы окно не появлялось по таймеру, если пользователь сам открыл окно
  }  
}

function modal (triggerSelector, modalSelector, modalTimerId) {
//Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);
// modalCloseBtn = document.querySelector("[data-close]"); удаляем, т.к. не будет работать с динамически создаваемыми объектами, т.е. с крестиком, который создаем в благодарственном модальном окне.

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));//здесь нужна стрелочная ф-я, т.к. в обработчиках нельзя сразу вызывать функцию. Она должна вызваться только после клика. Это правило было бы наружено, если бы мы просто написали openModal(modalSelector).
});

// modalCloseBtn.addEventListener("click", closeModal); убираем эту строку и добавляем у условие ниже, чтобы работало с динамически создаваемыми объектами

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    //т.е. пользователь кликнул на подложку, а не на модальное окно(modal-dialog) или на элемент с атрибутом data-close (использовали делегирование событий, т.е. обработчик повесили на modal, а событие происходит на дочернем элементе с атрибутом data-close. Такой способ будет работать и на вновь создаваемых объектах с таким атрибуто внутри modal)
    closeModal(modalSelector);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    //второе условие нужно для того, чтобы функция вызывалась только тогда, когда модальное окно открыто, а не всегда при нажатии клавиши Esc
    closeModal(modalSelector);
  }
});

// const modalTimerId = setTimeout(openModal, 50000); //модальное окно открывается после 50 секунд. После создания модульной структуры переносим это выражение в script.js

function showModalByScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal(modalSelector, modalTimerId); // модальное окно открывается после прокрутки страницы до конца
    window.removeEventListener("scroll", showModalByScroll); //особенность обработчика событий в том, что чтобы его удалить нужно делать ссылку на функцию, котороая выполнялась этим обработчиком
  }
}
window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export{openModal};
export{closeModal};