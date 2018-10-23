
const checkValue = (elem) => {
  const that = elem.parents('.form-control');
  const value = elem.val();
  const classFilled = 'is-filled';
  console.log(that);
  if (value) {
    that.addClass(classFilled);
  } else {
    that.removeClass(classFilled);
  }
};

const checkInputValue = (field, event) => {
  const currentEvent = event || 'keyup';
  field.on(currentEvent, function() {
    if (!field.hasClass('no-remove')) {
  	const that = $(this).parents('.form-control');
      const value = $(this).val();
      const classFilled = 'is-filled';
      if (value) {
        that.addClass(classFilled);
      } else {
        that.removeClass(classFilled);
      }
    }
  });
};
const field = $('input, textarea');
$(field).each((i, el) => {checkValue($(el));});
checkInputValue(field);
