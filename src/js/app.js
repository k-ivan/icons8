import svg4everybody from 'svg4everybody';
import './polyfills/DOMpolyfill';
import VideoModal from './components/videomodal';

svg4everybody();

// Tabs
const promo = document.querySelector('.promo');
const tabs = promo.querySelector('.tabs');
const tabsLinks = [].slice.call(tabs.querySelectorAll('.tabs__link'));
const tabsSections = [].slice.call(tabs.querySelectorAll('.tabs__section'));

function tabsSwitch(e) {
  e.preventDefault();

  const targetSection = this.hash.substr(1);
  const promoClass = this.dataset.tabClass;

  tabsSections.forEach(tabSection => tabSection.classList.remove('is-active'));
  tabsLinks.forEach(tabLink => tabLink.classList.remove('is-active'));
  promo.classList.remove('promo--problem', 'promo--solution');
  promo.classList.add(promoClass);

  this.classList.add('is-active');
  document.getElementById(targetSection).classList.add('is-active');

}

tabsLinks.forEach(tabLink => {
  tabLink.addEventListener('click', tabsSwitch);
});

// Gamburg
const body = document.body;
const gamburg = document.querySelector('.gamburg');
const gamburgTrigger = gamburg.querySelector('.gamburg__btn');
const gamburgOverlay = gamburg.querySelector('.gamburg__overlay');

gamburgTrigger.addEventListener('click', function(e) {
  e.preventDefault();
  body.classList.toggle('nav-open');
});
gamburgOverlay.addEventListener('click', function(e) {
  e.preventDefault();
  body.classList.remove('nav-open');
});

// video modal
const triggerVideo = document.getElementById('videoTrigger');
const video = new VideoModal('https://www.youtube.com/embed/C4TcBmdaa-Q?autoplay=1');
triggerVideo.addEventListener('click', function() {
  video.open();
});

// Downloads Popup
const dlPopupTrigger = document.querySelector('.nav__link--popup');
const dlPopupParent = dlPopupTrigger.closest('.nav__item--has-popup');
let dlPopupState = false;

dlPopupTrigger.addEventListener('click', function(e) {
  e.preventDefault();
  dlPopupParent.classList.toggle('popup-open');
  dlPopupState = !dlPopupState;
});

document.addEventListener('click', function(e) {
  if (dlPopupState && !dlPopupParent.contains(e.target)) {
    dlPopupParent.classList.remove('popup-open');
    dlPopupState = false;
  }
})
