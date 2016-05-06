backToTop = function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 1000) {
        $('.back-to-top').addClass('show');
    } else {
        $('.back-to-top').removeClass('show');
    }
};

$(window).on('scroll', function () {
    backToTop();
});

$('.back-to-top').on('click', function (e) {
    e.preventDefault();
    $.smoothScroll({
      scrollTarget: $('.book-title'),
      offset: -100
    });
});
