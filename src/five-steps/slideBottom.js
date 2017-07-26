/**
   * Slide bottom instantiation and action.
   */
var slideBottom = new Menu({
  wrapper: '#o-wrapper',
  type: 'slide-bottom',
  menuOpenerClass: '.c-button',
  maskId: '#c-mask'
});

var slideBottomBtn = document.querySelector('#c-button--slide-bottom');

slideBottomBtn.addEventListener('click', function(e) {
  e.preventDefault;
  slideBottom.open();
});
