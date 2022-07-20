$(document).ready(function() {
  if( $.isFunction( $.fn.fancybox ) ) {
    $("#inline").fancybox({
      'hideOnContentClick': false,
      'height': 600,
      'width': 800
    });
  }
});
