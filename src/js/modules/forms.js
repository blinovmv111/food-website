import{openModal, closeModal} from './modal';
import{postData} from '../services/services';

function forms (formSelector, modalTimerId) {
  //Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы скоро с вами свяжемся",
    failure: "Что-то пошло не так...",
  }; // этот объект является хранилищем сообщений, которые мы хотим показать пользователю

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let statusMessage = document.createElement("img");
      // statusMessage.classList.add("status");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `; // онлайн стили для простоты, правильнее будет застилизовать через класс
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage); //чтобы спиннер не сдвигал блоки верстки, а был внизу

      //есть 2 способа передачи данных на сервер. В формате Json или с помощью FormData. Это зависит от того какие требования будут от бэк-энд разработчика.
      // request.setRequestHeader("Content-type", "multipart/form-data");!!! когда используется связка XMLHttpRequest и FormData эту строку (заголовок) прописывать не нужно. Заголовок устанавливается автоматически! Иначе сервер выдаст ошибку.

      const formData = new FormData(form); // это объект, который быстро собирает все введенные в форму значения в формате ключ-значение, для отправки на сервер (не в формате JSON!).
      // //ВАЖНО!!! Чтобы FormData правильно отработал всегда проверяйте в верстке наличие в теге input (или другого тега для отправки данных, например textarea) наличие заполненного атрибута name, например name="name", name="phone" и др.
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // }); //объект FormData довольно специфический объект, поэтому мы не можем обычным способом преобразовать его формат JSON. Поэтому используется такой способ с пустым объектом.

      // const json = JSON.stringify(object); // и уже этот обычный объект мы переводим в формат JSON

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // этот метод позволяет получить из formData объект в формате json. Это более элегантный способ, чем перебор formData в пустой объект. Метод formData.entries() превращаем объект в массив массивов.

      // fetch("server.php", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json", // если данные не в формате json, то объект headers нужно закомменитровать
      //   },
      //   // body: formData,
      //   body: JSON.stringify(object),
      // })
      postData("http://localhost:3000/requests", json) // этой функцией мы заменили код fetch выше
        // .then((data) => data.text()) // эта строка нам больше не нужна, т.к. трансформация дынных происходит внутри postData (она там спрятана внутри)
        .then((data) => {
          console.log(data); // data это как раз те данные, которые возвращаются из промисов
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  }

  fetch(" http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));

  //Slider (вариант простой)

  // const slides = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   total = document.querySelector("#total"),
  //   current = document.querySelector("#current");

  // let slideIndex = 1;

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // } // это условие мы не помещаем внутрь функции showSlides(n), т.к. функция вызывается каждый раз когда мы нажимаем на стрелочку. И тогда эта цифра будет каждый раз мигать при нажатии на стрелку.

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   // slides.forEach((item) => (item.style.display = "none"));
  //   // slides[slideIndex - 1].style.display = "block";

  //   slides.forEach((item) => item.classList.add("hide"));
  //   slides[slideIndex - 1].classList.remove("hide");
  //   slides[slideIndex - 1].classList.add("show", "fade");

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });

}

export default forms;