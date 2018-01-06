Modules.Settings = (function($) {
  return function() {
    var _self = this;

    _self.fontSize = '20px';
    _self.syncedStyle = '';
    _self.syncedFont = '';

    let settingsContainer = function() {
      return `
              <div class="settings">
              </div>
             `;
    }

    let settingsButton = function(actionName, actionText) {
      return `
              <button class="settings-button" data-action="` + actionName + `">
                <p>` + actionText + `</p>
              </button>
             `;
    }

    this.setDefaultStyles = function() {
      let body = $('body, html');
      body.css('margin', '0');
      body.css('fontFamily', 'serif');
      body.css('fontSize', '20px');
      body.css('backgroundColor', '#093145');
      body.prepend($('<i class="fas fa-arrow-circle-down"></i>'));
      setFontSizeFromStorage();
      setStyleFromStorage();
      setFontFromStorage();
    }

    function setStyleFromStorage() {
      chrome.storage.sync.get('style', syncedStyle => {
        if (syncedStyle) {
          _self.syncedStyle = syncedStyle.style;
          $('body').css('backgroundColor', syncedStyle.style);
        }
      });
    }

    function setFontSizeFromStorage() {
      chrome.storage.sync.get('fontSize', item => {
        if (item && item.fontSize.length > 2) {
          _self.fontSize = item.fontSize;
          $('body').css('fontSize', item.fontSize);
        }
      });
    }

    function setFontFromStorage() {
      chrome.storage.sync.get('font', syncedFont => {
        if (syncedFont) {
          _self.syncedFont = syncedFont.font;
          $('body').css('fontFamily', syncedFont.font);
        }
      });
    }

    this.addSettingsButtons = function() {
      function enlarge() {
        chrome.runtime.sendMessage({
          option: "textSize",
          value: '+',
          current: _self.fontSize
        }, response => {
          setFontSizeFromStorage();
        });
      }

      function smaller() {
        chrome.runtime.sendMessage({
          option: "textSize",
          value: '-',
          current: _self.fontSize
        }, response => {
          setFontSizeFromStorage();
        });
      }

      function style() {
        chrome.runtime.sendMessage({
          option: 'style',
          current: _self.syncedStyle
        }, response => {
          setStyleFromStorage();
        });
      }

      function font() {
        chrome.runtime.sendMessage({
          option: 'font',
          current: _self.syncedFont
        }, response => {
          setFontFromStorage();
        });
      }

      let enlargeButton = $(settingsButton('text-large', '+'));
      enlargeButton.on('click', enlarge);

      let smallerButton = $(settingsButton('text-smaller', '-'));
      smallerButton.on('click', smaller);

      let styleButton = $(settingsButton('overall-style', '!'));
      styleButton.on('click', style);

      let fontButton = $(settingsButton('text-font', 'A'));
      fontButton.on('click', font);

      let settingsContainer$ = $(settingsContainer());
      settingsContainer$
        .append(enlargeButton)
        .append(smallerButton)
        .append(styleButton)
        .append(fontButton);

      $('.container')
        .prepend(settingsContainer$);
    }
  }
})(jQuery);