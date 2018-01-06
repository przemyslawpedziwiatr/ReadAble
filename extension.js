
(function () {

  addScriptExecution();
  listenForMessages();

  function addScriptExecution() {
    chrome.browserAction.onClicked.addListener(function (tab) {
      chrome.tabs.executeScript(null, { file: "readable.js" });

      chrome.tabs.insertCSS({
        file: 'styles.css'
      });
    });
  }


  function listenForMessages() {
    chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        if (request.option === "textSize") {
          switch (request.value) {
            case "+": {
              let current = Number(request.current.slice(0, 2));
              if (current < 28) current += 4;
              setDataInStorage({ fontSize: `${current}px` });
              sendResponse(true);
              break;
            }
            case "-": {
              let current = Number(request.current.slice(0, 2));
              if (current > 12) current -= 4;
              setDataInStorage({ fontSize: `${current}px` });
              sendResponse(true);
              break;
            }
          }
        }
        else if (request.option === "style") {
          let bckgColors = [
            "#093145",
            "#1287A8",
            "#829356",
            "#BCA136"
          ];
          let selectedColour = "";

          if(request.current ) {
            for(let i = 0; i < bckgColors.length; i++ ){
              if(bckgColors[i] == request.current) {
                selectedColour = 
                  bckgColors[ i === bckgColors.length - 1 ? 0 : i + 1];
              }
            }              
          } else {
            selectedColour = bckgColors[0];
          }

          setDataInStorage({
            style: selectedColour
          });
          sendResponse(true);
        }
        else if (request.option === "font") {
          let fonts = [
            'monospace',
            'sans-serif',
            'serif'
          ];

          let selectedFont = "";

          if(request.current ) {
            for(let i = 0; i < fonts.length; i++ ){
              if(fonts[i] == request.current) {
                selectedFont = 
                fonts[ i === fonts.length - 1 ? 0 : i + 1];
              }
            }              
          } else {
            selectedFont = fonts[0];
          }

          setDataInStorage({
            font: selectedFont
          });
          sendResponse(true);
        }
      });
  }

  function setDataInStorage(object) {
    chrome.storage.sync.set(object, function () {
      console.log('Settings saved');
    });
  }
})();

