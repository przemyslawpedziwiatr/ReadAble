var Readable = (function($, Modules) {
  return function() {
    let textExtractor = new Modules.TextExtractor(),
      settings = new Modules.Settings(),
      utilities = new Modules.Utilities(),
      
      siteData = $(document),
      articleText = [];


    this.stripPage = function() {
      utilities.stopWebsite();
      articleText = textExtractor.extractLongestText();
      utilities.clearBody(siteData, articleText);
      utilities.resetStylesheets(siteData);
      settings.setDefaultStyles();
      settings.addSettingsButtons();
    }

    this.run = function() {
      this.stripPage();
    }
  }

})(jQuery, Modules);

readable = new Readable();
readable.run();