Modules.TextExtractor = (function($) {
  return function() {
    var _self = this;


    this.extractLongestText = function() {

      let mainSection = jQuery('body *').map((x, y) => {
        return {
          element$: jQuery(y),
          tagName: jQuery(y).prop('tagName'),
          textElementsAmount: jQuery(y)
            .find('p, h1, h2, h3, h4, h5, h6')
            .length,
          length: jQuery(y).text().length
        }
      })
      .sort((prev, next) => {
        return isPreviousLongerThenNext(prev, next)
      })
      .toArray()
      .pop()
      .element$;

      let articleText = $(mainSection)
        .find('p, h1, h2, h3, h4, h5, h6')
        .map((x, y) => {

          var textArea = $(y);
          let areaLength = textArea.text().length;
          if (areaLength > 30) {
            $(y).prop('class', '').remove();
            $(y).prop('style', '').remove();
            $(y).css('backgroundColor', _self.syncedStyle);
            return y;
          }

        });
      return articleText;
    }

    function isPreviousLongerThenNext(previous, next) {
      return previous.textElementsAmount > next.textElementsAmount ? 
                1 : -1;
    }
  }
})(jQuery);
