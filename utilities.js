Modules.Utilities = (function($) {
  return function() {

    this.stopWebsite = function() {
      window.stop();
    }

    this.clearBody = function(siteData, textJq) {
      siteData.find('body')
        .children().remove();
      siteData.find('body')
        .append('<div>');

      let container = siteData.find('body div');
 
      container
        .addClass('container')
        .append(textJq);
    }

    this.resetStylesheets = function(siteData) {
      siteData.find('head').children().remove();
    }

  }
})(jQuery);