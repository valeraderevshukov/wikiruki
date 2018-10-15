import { BODY } from './../constants';

const header = $('.js-header');
const btnMenu = $('.js-btn-menu');
const navSearch = $('.js-nav-search');
const openMenu = 'is-open-menu';

btnMenu.on('click', () => {
  (!header.hasClass(openMenu)) 
    ? header.addClass(openMenu)
    : header.removeClass(openMenu);
});

BODY.on('click', e => {
  if ($(e.target).closest(btnMenu).length || $(e.target).closest(navSearch).length) return;
  header.removeClass(openMenu);
});
