export function fadeIn(element, duration = 300) {
  element.removeClass("hidden");
  element.css({ opacity: 0 }).animate({ opacity: 1 }, duration);
}

export function fadeOut(element, duration = 300) {
  element.animate({ opacity: 0 }, duration, () => {
    element.addClass("hidden").css({ opacity: 1 });
  });
}
