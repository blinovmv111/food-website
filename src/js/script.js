"use strict";
require('es6-promise').polyfill();//это ручная установка полифила с помощью синтаксиса common.js на случай если в каких-то браузерах не работаю промисы. Прежде через терминал устанавливаем пакет npm install es6-promise.
import 'nodelist-foreach-polyfill';//хотя такого файла у нас нет в проекте, он при установке появился в папке node_modules и подтянется оттуда. Таки же способом можно подключать и другие скрипты, например слик слайдер import 'slick-sleder';

//переведем наш проект на модульную структуру ES6-стандарта. Нужно все импорты перенести перед обработчиком DOMContentLoaded.
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import slider from './modules/slider';
import forms from './modules/forms';
import {openModal} from './modules/modal'

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); //модальное окно открывается после 50 секунд.
  // const tabs = require('./modules/tabs'),
  //       modal = require('./modules/modal'),
  //       timer = require('./modules/timer'),
  //       cards = require('./modules/cards'),
  //       calc = require('./modules/calc'),
  //       slider = require('./modules/slider'),
  //       forms = require('./modules/forms');
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", "January 01, 2021");//если дату написать как '2020-08-16', то часовой пояс будет равен UTC.
  cards();
  calc();
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCaunter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  forms('form', modalTimerId);
});
