import { BODY, OPEN } from './../constants';

const parent = $('.js-cabin');
const trigger = $('.js-cabin-trigger');

trigger.on('click', () => {
  (!parent.hasClass(OPEN)) 
    ? parent.addClass(OPEN)
    : parent.removeClass(OPEN);
});

BODY.on('click', e => {
  if ($(e.target).closest(trigger).length) return;
  parent.removeClass(OPEN);
});
