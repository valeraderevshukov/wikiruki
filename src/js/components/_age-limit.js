import { SHOW } from '../constants';

const select = '.js-age-limit-select';
const input = $('.js-age-limit');
const showSelect = el => {
  const targetSelect = el.parent().siblings(select);
  if (targetSelect.length) {
    if (el.is(':checked')) {
    // $(this).parents('.checkbox').addClass('checked');
      targetSelect.addClass(SHOW);
    }
    else {
    // $(this).parents('.checkbox').removeClass('checked');
      targetSelect.removeClass(SHOW);
    }
  }
  else {
    console.error("There is no neighbor element '.js-age-limit-select' ");
  }
};
showSelect(input);
input.on('change', function() {
  showSelect($(this));
});
