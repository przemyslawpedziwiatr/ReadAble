console.log('trying to load');

(function() {
  var test1 = document.getElementById("t1");

  test1.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id,{action: "strip"}, function(response) {
        
      });
    });

  });

  var test2 = document.getElementById("t2");
  test2.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id,{action: "removeClasses"}, function(response) {
        
      });
    });

  });

})();

console.log('loaded');