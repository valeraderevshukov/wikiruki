import tagsinput from 'bootstrap-tagsinput';
import 'typeahead.js';
import {buildIcon} from '../utils';

// const htmlEncodeContainer = $('<div />');
// const htmlEncode = value => {
//   if (value) {
//     return htmlEncodeContainer.text(value).html();
//   } else {
//     return '';
//   }
// };
var icon = '<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14 14" style="enable-background:new 0 0 14 14;" xml:space="preserve"><path d="M14,1.4L12.6,0L7,5.6L1.4,0L0,1.4L5.6,7L0,12.6L1.4,14L7,8.4l5.6,5.6l1.4-1.4L8.4,7L14,1.4z"/></svg>';

var htmlEncodeContainer = $('<div />');
function htmlEncode(value) {
  if (value) {
    return htmlEncodeContainer.text(value).html();
  } else {
    return '';
  }
}
$.fn.tagsinput.Constructor.prototype.add = function(item, dontPushVal, options) {
  var self = this;

  if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
    return;

  // Ignore falsey values, except false
  if (item !== false && !item)
    return;

  // Trim value
  if (typeof item === 'string' && self.options.trimValue) {
    item = $.trim(item);
  }

  // Throw an error when trying to add an object while the itemValue option was not set
  if (typeof item === 'object' && !self.objectItems)
    throw("Can't add objects when itemValue option is not set");

  // Ignore strings only containg whitespace
  if (item.toString().match(/^\s*$/))
    return;

  // If SELECT but not multiple, remove current tag
  if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
    self.remove(self.itemsArray[0]);

  if (typeof item === 'string' && this.$element[0].tagName === 'INPUT') {
    var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
    var items = item.split(delimiter);
    if (items.length > 1) {
      for (var i = 0; i < items.length; i++) {
        this.add(items[i], true);
      }

      if (!dontPushVal)
        self.pushVal();
      return;
    }
  }

  var itemValue = self.options.itemValue(item),
    itemText = self.options.itemText(item),
    tagClass = self.options.tagClass(item),
    itemTitle = self.options.itemTitle(item);

  // Ignore items allready added
  var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];
  if (existing && !self.options.allowDuplicates) {
    // Invoke onTagExists
    if (self.options.onTagExists) {
      var $existingTag = $('.tag', self.$container).filter(function() { return $(this).data('item') === existing; });
      self.options.onTagExists(item, $existingTag);
    }
    return;
  }

  // if length greater than limit
  if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
    return;

  // raise beforeItemAdd arg
  var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options});
  self.$element.trigger(beforeItemAddEvent);
  if (beforeItemAddEvent.cancel)
    return;

  // register item in internal array and map
  self.itemsArray.push(item);

  // add a tag element

  var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove">' + buildIcon('close') + '</span><span><label class="overlay"><span class="overlay-img"></span><span class="overlay-svg">' + buildIcon('photo') + '</span><span class="overlay-bg"></span><input type="file" pakeUpload></label></span></span>');
  $tag.data('item', item);
  self.findInputWrapper().before($tag);
  $tag.after(' ');

  // Check to see if the tag exists in its raw or uri-encoded form
  var optionExists = (
    $('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element).length ||
    $('option[value="' + htmlEncode(itemValue) + '"]', self.$element).length
  );

  // add <option /> if item represents a value not present in one of the <select />'s options
  if (self.isSelect && !optionExists) {
    var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
    $option.data('item', item);
    $option.attr('value', itemValue);
    self.$element.append($option);
  }

  if (!dontPushVal)
    self.pushVal();

  // Add class when reached maxTags
  if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
    self.$container.addClass('bootstrap-tagsinput-max');

  // If using typeahead, once the tag has been added, clear the typeahead value so it does not stick around in the input.
  if ($('.typeahead, .twitter-typeahead', self.$container).length) {
    self.$input.typeahead('val', '');
  }

  if (this.isInit) {
    self.$element.trigger($.Event('itemAddedOnInit', { item: item, options: options }));
  } else {
    self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
  }
};
  
const citynames = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: '/json/citynames.json',
    filter: function(list) {
      return $.map(list, function(cityname) {
        return { name: cityname }; });
    }
  }
});
$('[data-role="tagsinput"]').on('itemAddedOnInit', function(event) {
  const parent = $(this).parent();
  let tags = parent.find('.tag');
  if (tags.length) {
    parent.find('.bootstrap-tagsinput').addClass('is-filled');
  };
});
$('[data-role="tagsinput-img"]').on('itemAddedOnInit', function(event) {
  const parent = $(this).parent();
  let tags = parent.find('.tag');
  if (tags.length) {
    parent.find('.bootstrap-tagsinput').addClass('is-filled');
  };
});
citynames.initialize();
$('[data-role="tagsinput"]').tagsinput({
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
});
$('[data-role="tagsinput-img"]').tagsinput({
  tagClass: 'tag_img',
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
});
$('[data-role="tagsinput"]').on('itemAdded', function(event) {
  $(this).parent().find('.bootstrap-tagsinput').addClass('is-filled');
});
$('[data-role="tagsinput-img"]').on('itemAdded', function(event) {
  $(this).parent().find('.bootstrap-tagsinput').addClass('is-filled');
});
$('[data-role="tagsinput"]').on('itemRemoved', function(event) {
  const parent = $(this).parent();
  let tags = parent.find('.tag');
  if (!tags.length) {
    parent.find('.bootstrap-tagsinput').removeClass('is-filled');
  };
});


$('[data-role="tagsinput-img"]').on('itemRemoved', function(event) {
  const parent = $(this).parent();
  let tags = parent.find('.tag');
  if (!tags.length) {
    parent.find('.bootstrap-tagsinput').removeClass('is-filled');
  };
});
