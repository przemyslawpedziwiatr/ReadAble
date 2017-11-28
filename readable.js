var Site = (function ($) {

  return function () {
    var siteData = $(document),
        articleText = "";

    function extractLongestText() {
      
    }

    function stripPage() {
      siteData.find('body').children().remove();
    }

    function removeClassesFromBody(){
      siteData.find('body').prop('class','');
    }


  
    return {
      stripPage: stripPage,
      removeClassesFromBody: removeClassesFromBody
    }
  
  }
})(jQuery);

(function initialize() {
  var site = new Site();

  chrome.extension.onRequest.addListener(function(method, sender, sendResponse) {
    if(method.action === "strip") {
     site.stripPage();      
    }
    if(method.action === "removeClasses"){
      site.removeClassesFromBody();
    }
  });

})();

