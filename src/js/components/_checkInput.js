const checkInputValue = () => {
  const field = $('input, textarea');
  field.on('keyup', function() {
  	const that = $(this);
    const value = $(this).val();
    const classFilled = 'is-filled';
    if (value) {
      that.addClass(classFilled);
    } else {
      that.removeClass(classFilled);
    }
  });
};
