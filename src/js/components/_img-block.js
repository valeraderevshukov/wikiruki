import Popper from 'popper.js';
import { OPEN } from '../constants';
const edit = 'is-edit';
const container = $('.js-img-block');

container.each((i,el) => {
  const that = $(el);
  const btnEdit = $('.js-edit-img', that);
  const btnRemove = $('.js-remove-img', that);
  const overlay = $('.js-img-block-overlay', that);

  // toggle edit
  btnEdit.on('click', () => that.toggleClass(edit));
  // unedit
  overlay.on('click', () => that.removeClass(edit));

  // remove img-block
  btnRemove.on('click', () => that.remove());

});


const getPosition = (el, arg) => {
  if (arg[0].placement === 'bottom-start' || arg[0].placement === 'bottom') {
    el.removeClass('is-top-pos').addClass('is-bottom-pos');
  } else {
    el.removeClass('is-bottom-pos').addClass('is-top-pos');
  }
};
const point = $('.js-point');
point.each((i,el) => {
  const that = $(el);
  const trigger = $('.js-point-trigger', that);
  const remove = $('.js-point-remove', that);
  const drop = $('.js-point-drop', that)[0];
  const position = that.data('drop-position') || 'bottom-start';
  const anotherPopper = new Popper(trigger[0], drop, {
	  placement: position,
	  onCreate: function() {
	    getPosition(that, arguments);
	  },
	  onUpdate: function() {
	    getPosition(that, arguments);
	  }
  });
  trigger.on('click', () => that.toggleClass(OPEN));
  remove.on('click', () => that.remove());
});


