import svg4everybody from 'svg4everybody';

svg4everybody();

const body = document.body;
const promo = document.querySelector('.promo');
const tabs = promo.querySelector('.tabs');
const tabsLinks = [].slice.call(tabs.querySelectorAll('.tabs__link'));
const tabsSections = [].slice.call(tabs.querySelectorAll('.tabs__section'));
const gamburg = document.querySelector('.gamburg');

function tabsSwitch(e) {
  e.preventDefault();

  const targetSection = this.hash.substr(1);
  const promoClass = this.dataset.tabClass;

  tabsSections.forEach(tabSection => tabSection.classList.remove('is-active'));
  tabsLinks.forEach(tabLink => tabLink.classList.remove('is-active'));
  promo.classList.remove('promo--problem', '.promo--solution');
  promo.classList.add(promoClass);

  this.classList.add('is-active');
  document.getElementById(targetSection).classList.add('is-active');

}

tabsLinks.forEach(tabLink => {
  tabLink.addEventListener('click', tabsSwitch);
});



gamburg.addEventListener('click', function(e) {
  e.preventDefault();
  body.classList.toggle('nav-open');
})
