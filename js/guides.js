function saveOs(os) {
  var expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 5);
  document.cookie = "os=" + os + ";expires=" + expirationDate.toUTCString() + ";path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

function loadOs() {
  var osFromCookie = getCookie("os");
  if(osFromCookie) {
    activateOsLink(osFromCookie);
  } else if(detectOs()) {
    activateOsLink(detectOs());
  } else {
    activateOsLink("win");
  }
}

function activateOsLink(os) {
  const osLinks = document.querySelectorAll(".os-specific ." + os + "-link");
  osLinks.forEach(link => link.click());
}

function detectOs() {
  try {
    var browserVersion = navigator.appVersion;
    if (browserVersion.match(/Win/i)) {
      return "win";
    } else if (browserVersion.match(/Macintosh/i)) {
      return "mac";
    } else {
      return "nix";
    }
  } catch(e) {
    return false;
  }
}

function addIcons() {
  document.querySelectorAll("code.language-sh, code.language-bat").forEach(el => {
    const highlight = el.closest('.highlight');
    if (highlight) {
      const icon = document.createElement('i');
      icon.className = 'icon-small-prompt';
      highlight.parentNode.insertBefore(icon, highlight);
    }
  });
  
  document.querySelectorAll("code.language-erb, code.language-html, code.language-ruby, code.language-css").forEach(el => {
    const highlight = el.closest('.highlight');
    if (highlight) {
      const icon = document.createElement('i');
      icon.className = 'icon-small-text-editor';
      highlight.parentNode.insertBefore(icon, highlight);
    }
  });
  
  document.querySelectorAll("code.language-browser").forEach(el => {
    const highlight = el.closest('.highlight');
    if (highlight) {
      const icon = document.createElement('i');
      icon.className = 'icon-small-browser';
      highlight.parentNode.insertBefore(icon, highlight);
    }
  });
}

function initializeOsSwitchers() {
  const osInstructions = document.querySelectorAll(".os-specific");
  
  osInstructions.forEach(osInstruction => {
    // ピッカーHTMLの作成と挿入
    const pickerHTML = `
      <span class='picker'>
        <span class='picker-label'>オペレーティングシステムを選択:</span>
        <span class='picker-options'>
          <span><a href='#' class='os-link win-link'>Windows</a></span>
          <span><a href='#' class='os-link mac-link'>Mac</a></span>
          <span><a href='#' class='os-link nix-link'>Linux</a></span>
        </span>
      </span>
    `;
    
    osInstruction.insertAdjacentHTML('afterbegin', pickerHTML);
    
    // Windowsリンクのイベントリスナー
    osInstruction.querySelector('.win-link').addEventListener('click', function(event) {
      event.preventDefault();
      saveOs("win");
      document.querySelectorAll(".os-specific .os-link").forEach(link => link.classList.remove("active"));
      document.querySelectorAll(".os-specific .win-link").forEach(link => link.classList.add("active"));
      document.querySelectorAll(".os-specific > div").forEach(div => {
        div.style.display = div.classList.contains("win") ? "block" : "none";
      });
    });
    
    // Macリンクのイベントリスナー
    osInstruction.querySelector('.mac-link').addEventListener('click', function(event) {
      event.preventDefault();
      saveOs("mac");
      document.querySelectorAll(".os-specific .os-link").forEach(link => link.classList.remove("active"));
      document.querySelectorAll(".os-specific .mac-link").forEach(link => link.classList.add("active"));
      document.querySelectorAll(".os-specific > div").forEach(div => {
        div.style.display = div.classList.contains("mac") ? "block" : "none";
      });
    });
    
    // Linuxリンクのイベントリスナー
    osInstruction.querySelector('.nix-link').addEventListener('click', function(event) {
      event.preventDefault();
      saveOs("nix");
      document.querySelectorAll(".os-specific .os-link").forEach(link => link.classList.remove("active"));
      document.querySelectorAll(".os-specific .nix-link").forEach(link => link.classList.add("active"));
      document.querySelectorAll(".os-specific > div").forEach(div => {
        div.style.display = div.classList.contains("nix") ? "block" : "none";
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  addIcons();
  initializeOsSwitchers();
  loadOs();
  
  const osLabelElement = document.querySelector(".js-detected-os-label");
  if (osLabelElement) {
    let osLabel;
    switch (detectOs()) {
      case "win":
        osLabel = "Windows";
        break;
      case "mac":
        osLabel = "Mac";
        break;
      case "nix":
        osLabel = "Linux";
        break;
      default:
        osLabel = "エラー: 未知のオペレーティングシステム"
    }
    osLabelElement.textContent = osLabel;
  }
});
