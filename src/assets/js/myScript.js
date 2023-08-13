const btn = document.getElementById('navbar-burger1');
const menu = document.querySelectorAll('.navbar-menu');

const close = document.querySelectorAll('.navbar-close');
const backdrop = document.querySelectorAll('.navbar-backdrop');

//console.log(btn); // null

// ✅ Check if element exists before calling addEventListener()

// Not called
btn?.addEventListener('click', () => {
    for (var j = 0; j < menu.length; j++) {
      menu[j].classList.toggle('hidden');
  }
});

if (close.length) {
  for (var i = 0; i < close.length; i++) {
      close[i].addEventListener('click', function() {
          for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
          }
      });
  }
}

if (backdrop.length) {
  for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener('click', function() {
          for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
          }
      });
  }
}

jQuery(function($){

  const chatbox = jQuery.noConflict();
  chatbox(() => {
    chatbox(".chatbox-open").click(() =>
      chatbox(".chatbox-popup, .chatbox-close").fadeIn()
    );

    chatbox(".chatbox-close").click(() =>
      chatbox(".chatbox-popup, .chatbox-close").fadeOut()
    );

    chatbox(".chatbox-maximize").click(() => {
      chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
      chatbox(".chatbox-panel").fadeIn();
      chatbox(".chatbox-panel").css({ display: "flex" });
    });

    chatbox(".chatbox-minimize").click(() => {
      chatbox(".chatbox-panel").fadeOut();
      chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
    });

    chatbox(".chatbox-panel-close").click(() => {
      chatbox(".chatbox-panel").fadeOut();
      chatbox(".chatbox-open").fadeIn();
    });
  });
});

